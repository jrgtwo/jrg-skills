---
name: jrg-new-ticket
description: Create one jrg ticket for a clear piece of work, in an existing or new initiative and milestone
argument-hint: "[optional — the work; inferred from the conversation if omitted]"
---

# Create a ticket

$ARGUMENTS

For **one clear piece of work**. If it is large, unclear, or needs several decisions first, that is `/jrg-plan`. If it is required by the current ticket, that is `/jrg-cut-sub-ticket`. Rules: `docs/tickets/workflow.md` — Adding and changing work.

1. **Agree the ticket.** Propose in prose, in one short message: the title (the user's own words where they gave them), the one reviewable outcome, the type, acceptance criteria, and where it goes — which initiative and milestone, and where in working order. Recommend a placement; for a one-off with no home, propose a new initiative or milestone and say why. Wait for agreement.
2. **Create what is missing.** A new initiative: folder, `index.md` from the template with a unique prefix and ledger markers, and a row in `docs/tickets/index.md`. A new milestone: next numbered folder with `index.md` from the template.
3. **Write the ticket.** ID = highest ID ever allocated in the initiative + 1. File `<id>-<slug>.md` from `docs/tickets/templates/ticket.md`. `Sources:` link the knowledge docs it relies on — never `docs/legacy/`. `Status: todo` unless work starts now. List it in the milestone index at the agreed place.
4. **If it came from a holding list,** remove that entry in the same change.
5. **Regenerate and report.** Run `python3 docs/tickets/status.py`; report the ticket by title and its place in working order.
