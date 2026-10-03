---
name: jrg-split
description: Split extra work the current ticket needs into its own ticket
when_to_use: Use when work on the current ticket turns up additional work that the ticket cannot be finished without — split it out as a sub-ticket rather than widening the ticket.
---

# Cut a sub-ticket

For work discovered while on a ticket that is **required for that ticket's acceptance**. Anything else is a later ticket (`/jrg-ticket`), backlog (`/jrg-backlog`) or deferred (`/jrg-defer`). Rules: `jrg/tickets/workflow.md` — Sub-tickets.

1. **Agree the scope.** Propose in prose: title, its one reviewable outcome, why the parent cannot be accepted without it, and its type. Wait for agreement. Several sub-tickets: agree them one at a time, including order.
2. **Allocate.** ID = highest ID ever allocated in the initiative + 1 (check filenames; cancelled IDs are never reused). File `<id>-<slug>.md` in the parent's milestone folder, from `jrg/tickets/templates/ticket.md`.
3. **Write it.** Header has `Parent:` linking the parent, `Milestone:`, its own `Depends on:`, and `Sources:` inherited from the parent where relevant. `Status: todo`, or `in_progress` if work moves to it now. `Next:` is its first step.
4. **Wire it in, in one change.** Parent: add the sub-ticket to `Depends on`; set the parent's `Next:` to name it. Milestone index: list it directly below the parent, after earlier sub-tickets of the same parent.
5. **Regenerate and report.** Run `python3 jrg/tickets/status.py`, fix anything it reports, and report the new ticket by title and where it sits in working order.
