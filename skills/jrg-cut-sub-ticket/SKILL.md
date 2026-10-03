---
name: jrg-cut-sub-ticket
description: Split additional required work out of the current jrg ticket into a sub-ticket, placed in working order
---

# Cut a sub-ticket

For work discovered while on a ticket that is **required for that ticket's acceptance**. Anything else is a later ticket (`/jrg-new-ticket`), backlog (`/jrg-backlog`) or deferred (`/jrg-defer`). Rules: `docs/tickets/workflow.md` — Sub-tickets.

1. **Agree the scope.** Propose in prose: title, its one reviewable outcome, why the parent cannot be accepted without it, and its type. Wait for agreement. Several sub-tickets: agree them one at a time, including order.
2. **Allocate.** ID = highest ID ever allocated in the initiative + 1 (check filenames; cancelled IDs are never reused). File `<id>-<slug>.md` in the parent's milestone folder, from `docs/tickets/templates/ticket.md`.
3. **Write it.** Header has `Parent:` linking the parent, `Milestone:`, its own `Depends on:`, and `Sources:` inherited from the parent where relevant. `Status: todo`, or `in_progress` if work moves to it now. `Next:` is its first step.
4. **Wire it in, in one change.** Parent: add the sub-ticket to `Depends on`; set the parent's `Next:` to name it. Milestone index: list it directly below the parent, after earlier sub-tickets of the same parent.
5. **Regenerate and report.** Run `python3 docs/tickets/status.py`, fix anything it reports, and report the new ticket by title and where it sits in working order.
