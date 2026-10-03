---
name: jrg-defer
description: Record something uncertain noticed during a jrg ticket, to look into later
argument-hint: "[optional — what to defer; inferred from the conversation if omitted]"
---

# Add a deferred entry

$ARGUMENTS

For something noticed while working a ticket that is **uncertain** — it may be nothing. Definitely wanted → `/jrg-backlog`. Required for the current ticket or milestone → a ticket or sub-ticket, never deferred.

1. With no argument, take it from what was just discussed. Do not ask the user to retype it.
2. Append an entry under `## Entries` in `docs/tickets/deferred/index.md` (replace `None yet.` if present), in the format in that file's header. `Found during` links the current ticket.
3. Show the entry written, so a misreading can be corrected.

One observation per entry. Write straight to the list.
