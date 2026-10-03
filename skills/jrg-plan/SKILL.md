---
name: jrg-plan
description: Plan a big or unclear change before building it
when_to_use: Use for work that is large, unclear, or needs decisions before tickets can be written — a new project, a major feature, a redesign. Also use to continue a plan in progress, answer its open questions, or turn a finished plan into tickets.
argument-hint: "[what to plan | plan name | questions]"
---

# Plan

$ARGUMENTS

Rules: `docs/tickets/workflow.md` — Plans, Decision questions. A plan is tracked like any work: an initiative whose first milestone, `00-plan`, holds one ticket per pass. Any session can resume it from `STATUS.md`.

## Continue an existing plan

If a plan is named or one is in progress, it is just a ticket in its `00-plan` milestone: pick it up as `/jrg-start` step 3 does, and do that pass (below). If the user wants to answer questions, go to **Asking questions**.

## Start a new plan

1. **Name it.** The user's words; slug for folders. Agree an initiative prefix.
2. **Create the initiative** (`docs/tickets/<slug>/`, index from template with ledger markers, row in `docs/tickets/index.md`) and milestone `00-plan`.
3. **Create the plan folder** `docs/knowledge/plans/<slug>/` from this skill's `templates/`: `brief.md`, `plan.md`, `decisions.md`.
4. **Create the brief ticket only** (`<PREFIX>-001 — Write the brief`, type `plan`). Later passes are added as the plan's size becomes clear — do not pre-create six tickets for what may be a small change.
5. Regenerate the views and start the brief now if the user wants.

## The passes

Each pass is one ticket in `00-plan`; each can take several sessions. Add the next pass's ticket when the current one closes.

1. **Brief** — the user's intent in their words, sources they point to, constraints. For an existing app, survey the relevant code and record what exists today (use subagents for the survey; keep only conclusions). End the brief with a **size proposal** in one line with its reason — *small* (skip to `/jrg-ticket`), *medium* (one plan doc, brief → draft → review → ready), *large* (all passes, several docs). The user can correct it.
2. **Draft** — `plan.md`: the path forward, milestones in rough order, and every choice tagged *confirmed*, *proposed* or *open*. Every *open* choice becomes a question in `decisions.md`.
3. **Review** — independent subagents proof the draft against the brief and the code: gaps, contradictions, wrong assumptions, missing decisions. Their findings become fixes to the draft or new questions in `decisions.md`. Show the user a short summary, not the raw findings.
4. **Questions** — work through the open questions with the user (see below). Repeat draft → review → questions as many times as needed; each repeat is a new ticket.
5. **Consolidate** — a fresh session rewrites `plan.md` cleanly from the latest answers. Superseded drafts are not kept in the plan folder; the decisions register keeps the history of what was decided and why.
6. **Readiness** — check what is decided enough to build. Questions still open must each list the build tickets they block; anything else is ready. Then **Make the tickets** (below).

The size can change between passes: more open questions than expected means another review or question pass; an obvious single change means stop planning and cut tickets.

## Asking questions

From `decisions.md`, only entries with `Status: open` (and `parked` if the user asks for them).

- Say the count up front: "4 open questions; I'll go one at a time — stop whenever."
- Each question in **plain product terms first**: what is being decided, a concrete example, why it matters, a recommendation. No register IDs or jargon without saying what they mean.
- Settle technical or mechanical questions yourself with a stated default; record them as answered by you, with the default, so the user can overturn them later.
- **Write each answer the moment it is given**: `Status: answered`, the `Answer:` in the user's words plus your one-line reading of it, the date. The user can stop at any time; nothing is lost.
- "Not now" → `Status: parked`. Only the tickets in its `Blocks` line wait on it.
- A new question found mid-stream goes into the register as `open` for a later pass — do not add it to the current stream.
- If the user answers a question in a later session, record it the same way.

After a batch, update the owning sections of `plan.md` and run `python3 docs/tickets/status.py` so `STATUS.md` shows the remaining open count.

## Make the tickets

Run when the readiness pass is done, or when the user asks to turn a ready plan into tickets.

### 1. Check it is ready

Read `docs/knowledge/plans/<slug>/plan.md` and `decisions.md`. Every open or parked question must list the build work it blocks. If one does not, stop and say which — that is another question pass, not ticketing.

### 2. Propose the milestones

From the plan's Milestones section: one numbered milestone folder per deliverable, after `00-plan` (`01-…`, `02-…`). Propose the list in prose — name, deliverable, entry condition — and wait for agreement.

### 3. Propose each milestone's tickets — one milestone at a time

For the agreed milestone, propose its tickets in working order: title, one-line outcome, type, dependencies. Keep each ticket one reviewable outcome; a question still open becomes a `decision` ticket that the affected tickets depend on. Wait for agreement, then write them before moving to the next milestone. This keeps every review small and lets the user stop between milestones.

Each ticket:

- From `docs/tickets/templates/ticket.md`; next IDs in the initiative.
- `Sources:` link the plan sections and knowledge docs it executes.
- Acceptance criteria that are observable, taken from the plan — not invented.
- Listed in its milestone index in working order.

### 4. Close the plan milestone

Record outcome evidence in `00-plan/index.md` (date, plan link, ticket count). Update the initiative index's Milestones section. Run `python3 docs/tickets/status.py` and report the milestones and ticket counts, and the first ready ticket.

### Afterwards

When the build is finished, fold the plan's still-true content into the owning `docs/knowledge/` docs and move `docs/knowledge/plans/<slug>/` to `docs/legacy/`, with a row in `docs/legacy/README.md`. That is the last ticket of the initiative — add it now, in the final milestone, as "Fold the plan into the knowledge docs".
