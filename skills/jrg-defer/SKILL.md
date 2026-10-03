---
name: jrg-defer
description: Note something to look at later
when_to_use: Use when the user says to defer, park, or note something for later, or when something uncertain is noticed mid-ticket that may or may not matter.
argument-hint: "[what to note]"
---

# Add a deferred entry

$ARGUMENTS

For something noticed while working a ticket that is **uncertain** — it may be nothing. Definitely wanted → `/jrg-backlog`. Required for the current ticket or milestone → a ticket or sub-ticket, never deferred.

1. With no argument, take it from what was just discussed. Do not ask the user to retype it.
2. Append an entry under `## Entries` in `jrg/tickets/deferred/index.md` (replace `None yet.` if present), in the format in that file's header. `Found during` links the current ticket.
3. Show the entry written, so a misreading can be corrected.

One observation per entry. Write straight to the list.
