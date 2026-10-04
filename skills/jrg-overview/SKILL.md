---
name: jrg-overview
description: Where things stand, for one project or all of them
when_to_use: Use when the user wants an overview or summary of open work — for the current project, a named project, or all projects in their jrg hub — without picking a ticket to work on, or wants the hub's public stats page updated.
argument-hint: "[all | project name | stats]"
---

# Overview

Hub: `${user_config.hub_path}` · Plugin: `${CLAUDE_PLUGIN_ROOT}`

$ARGUMENTS

Read-only: this skill changes nothing except regenerating `STATUS.md` files (and, with `stats`, the hub's stats page). To pick work, that's `/jrg-start`.

## Which overview

- **`all`**, or run in the hub or a folder that isn't a project → **all projects**.
- **A project name**, or run inside a project → **that project**. Find its root with `${CLAUDE_PLUGIN_ROOT}/skills/jrg-start/root.md` (for a named project, resolve with `--cwd` set to its path from `jrg-hub list`).

## One project

Run its status command, then from `<root>/tickets/STATUS.md` and the plans' `decisions.md`, in this order, briefly:

1. **Initiatives** — each with its milestone progress, e.g. "Hosted dashboard — 4/7 closed".
2. **In progress** and **blocked** — ticket titles with their `Next:` lines.
3. **Next ready** — the ticket.
4. **Open plan questions** — per plan, how many open and parked.
5. **Holding lists** — entry counts, and when each was last groomed.
6. **Recently closed** — tickets done in the last 7 days (from their `Completion evidence` dates).

## All projects

`jrg-hub list` gives each active project's in-progress, blocked and next-ready tickets and last-worked date. Show one line per project, sorted by last worked, then a totals line:

```
metronome          1 in progress · next: Accent editor                today
football-cards     1 blocked · next: Rework the proof page             last week
kanban 🔒           nothing open                                        2 weeks ago

Totals: 1 in progress · 1 blocked
```

🔒 marks private projects (this view is local, so they're shown in full). Archived projects are left out; mention how many there are, if any.

## Stats page (`stats`, hub only)

Run `jrg-hub stats --hub <hub> --write`. It writes `<hub>/stats/index.md` — the version of these numbers that is safe to push: public projects by name; private projects by their stats setting (hidden: left out entirely, including from the totals; aggregated: folded into one "Private work" line; anonymous: a stable alias like "Private project 1"). Never ticket titles, project names, paths or remotes for private projects. Report the table, then finish with root.md's **Hub sync** (After writing).
