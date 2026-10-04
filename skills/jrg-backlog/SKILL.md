---
name: jrg-backlog
description: Note work you want but haven't scheduled
when_to_use: Use when the user wants something added to the backlog, or names work they definitely want that is not part of the current ticket and has no ticket yet.
argument-hint: "[what to add]"
---

# Add a backlog entry

Hub: `${user_config.hub_path}` · Plugin: `${CLAUDE_PLUGIN_ROOT}`

**First, find the project root:** follow `${CLAUDE_PLUGIN_ROOT}/skills/jrg-start/root.md`, and use the root, status command, templates folder and workflow file it gives. If you write to a hub, finish with its **Hub sync** step.

$ARGUMENTS

For work that is **definitely wanted** but not yet placed. Uncertain → `/jrg-defer`. Blocks the current milestone → a ticket now, never backlog. Its milestone is already obvious → propose `/jrg-ticket` instead.

1. With no argument, take it from what was just discussed. Do not ask the user to retype it.
2. Append an entry under `## Entries` in `<root>/tickets/backlog/index.md` (replace `None yet.` if present), in the format in that file's header.
3. Show the entry written, so a misreading can be corrected.

One piece of work per entry. If the list grows long, group entries under `###` headings by type.
