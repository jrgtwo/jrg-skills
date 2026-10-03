---
name: jrg-plan-to-tickets
description: Turn a ready jrg plan into build milestones and tickets after its 00-plan milestone
argument-hint: "[optional — which plan]"
---

# Plan to tickets

$ARGUMENTS

Run when a plan's readiness pass is done. Rules: `docs/tickets/workflow.md` — Plans, Adding and changing work.

## 1. Check it is ready

Read `docs/knowledge/plans/<slug>/plan.md` and `decisions.md`. Every open or parked question must list the build work it blocks. If one does not, stop and say which — that is another question pass, not ticketing.

## 2. Propose the milestones

From the plan's Milestones section: one numbered milestone folder per deliverable, after `00-plan` (`01-…`, `02-…`). Propose the list in prose — name, deliverable, entry condition — and wait for agreement.

## 3. Propose each milestone's tickets — one milestone at a time

For the agreed milestone, propose its tickets in working order: title, one-line outcome, type, dependencies. Keep each ticket one reviewable outcome; a question still open becomes a `decision` ticket that the affected tickets depend on. Wait for agreement, then write them before moving to the next milestone. This keeps every review small and lets the user stop between milestones.

Each ticket:

- From `docs/tickets/templates/ticket.md`; next IDs in the initiative.
- `Sources:` link the plan sections and knowledge docs it executes.
- Acceptance criteria that are observable, taken from the plan — not invented.
- Listed in its milestone index in working order.

## 4. Close the plan milestone

Record outcome evidence in `00-plan/index.md` (date, plan link, ticket count). Update the initiative index's Milestones section. Run `python3 docs/tickets/status.py` and report the milestones and ticket counts, and the first ready ticket by title.

## Afterwards

When the build is finished, fold the plan's still-true content into the owning `docs/knowledge/` docs and move `docs/knowledge/plans/<slug>/` to `docs/legacy/`, with a row in `docs/legacy/README.md`. That is the last ticket of the initiative — add it now, in the final milestone, as "Fold the plan into the knowledge docs".
