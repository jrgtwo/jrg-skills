#!/usr/bin/env python3
"""SessionStart: warn when the jrg hub has unpushed work or is behind its remote.

The safety net for hub sync: it runs whether or not auto-sync is on, reads the hub path from the
plugin's hub_path option, and only reads git (plus a short fetch to see the remote). Silent when
there is no hub, no git, or nothing to report.
"""
import json
import os
import subprocess
from pathlib import Path


def git(hub, *args, timeout=5):
    try:
        r = subprocess.run(["git", "-C", str(hub), *args], capture_output=True, text=True, timeout=timeout)
    except subprocess.TimeoutExpired:
        return None
    return r.stdout.strip() if r.returncode == 0 else None


def main():
    raw = os.environ.get("CLAUDE_PLUGIN_OPTION_HUB_PATH", "")
    if not raw:
        return
    hub = Path(raw).expanduser()
    if not (hub / "projects.json").exists() or not (hub / ".git").exists():
        return
    git(hub, "fetch", "--quiet", timeout=8)
    notes = []
    if git(hub, "status", "--porcelain"):
        notes.append("has uncommitted changes")
    if git(hub, "rev-parse", "--abbrev-ref", "@{u}"):
        counts = git(hub, "rev-list", "--left-right", "--count", "HEAD...@{u}")
        if counts:
            ahead, behind = (int(x) for x in counts.split())
            if ahead:
                notes.append(f"has {ahead} unpushed commit{'s' if ahead > 1 else ''}")
            if behind:
                notes.append(f"is {behind} commit{'s' if behind > 1 else ''} behind its remote")
    if not notes:
        return
    msg = f"jrg hub ({hub}) " + " and ".join(notes) + " — notes from another machine or session may be missing."
    print(json.dumps({"systemMessage": msg,
                      "hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": msg}}))


if __name__ == "__main__":
    main()
