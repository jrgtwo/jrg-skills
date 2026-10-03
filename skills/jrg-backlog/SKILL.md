---
name: jrg-backlog
description: Note work you want but haven't scheduled
when_to_use: Use when the user wants something added to the backlog, or names work they definitely want that is not part of the current ticket and has no ticket yet.
argument-hint: "[what to add]"
---

# Add a backlog entry

$ARGUMENTS

For work that is **definitely wanted** but not yet placed. Uncertain → `/jrg-defer`. Blocks the current milestone → a ticket now, never backlog. Its milestone is already obvious → propose `/jrg-ticket` instead.

1. With no argument, take it from what was just discussed. Do not ask the user to retype it.
2. Append an entry under `## Entries` in `docs/tickets/backlog/index.md` (replace `None yet.` if present), in the format in that file's header.
3. Show the entry written, so a misreading can be corrected.

One piece of work per entry. If the list grows long, group entries under `###` headings by type.
