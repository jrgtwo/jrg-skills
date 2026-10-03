---
name: jrg-ticket
description: Add a ticket, or update the one you're working on
when_to_use: Use to create a ticket for one clear piece of work, or to record progress on the current ticket, mark it blocked, close it as done, or cancel it. Also use at the end or pause of a work session to save where things stand.
argument-hint: "[new | done | blocked | what the work is]"
---

# Ticket

$ARGUMENTS

Rules: `jrg/tickets/workflow.md`. If `jrg/tickets/` does not exist, say the repo is not set up and suggest `/jrg-start`.

**Which mode:** creating when the argument is `new`, describes work that has no ticket, or there is no current ticket; otherwise updating the session's current ticket. Say which mode and which ticket before writing anything, so a wrong guess can be corrected.

## Create a ticket

For **one clear piece of work**. Large, unclear, or needing several decisions first → `/jrg-plan`. Required by the current ticket → `/jrg-split`.

1. **Agree the ticket.** Propose in one short message: the title (the user's own words where they gave them), the one reviewable outcome, the type, acceptance criteria, and where it goes — which initiative and milestone, and where in working order. Recommend a placement; for a one-off with no home, propose a new initiative or milestone and say why. Wait for agreement.
2. **Create what is missing.** A new initiative: folder, `index.md` from the template with a unique prefix and ledger markers, and a row in `jrg/tickets/index.md`. A new milestone: next numbered folder with `index.md` from the template.
3. **Write the ticket.** ID = highest ID ever allocated in the initiative + 1. File `<id>-<slug>.md` from `jrg/tickets/templates/ticket.md`. `Sources:` link the knowledge docs it relies on — never `jrg/legacy/`. `Status: todo` unless work starts now. List it in the milestone index at the agreed place.
4. **If it came from a holding list,** remove that entry in the same change.
5. Run `python3 jrg/tickets/status.py`; report the ticket and its place in working order.

## Update the current ticket

Most updates are mid-ticket, often at the end of a session. Closing is one possible outcome, not the purpose.

1. **Working state.**
   - **Acceptance criteria:** check a box when there is evidence — a command and its result, a reviewed file, a recorded decision, or the user's word. Say what the evidence is.
   - **`Notes and blockers`:** rewrite `Next:` to the concrete next step. Delete what is no longer true. Do not append a session log.
   - **Knowledge:** if this session changed how something works or settled a decision, update the owning doc in `jrg/knowledge/` (or the plan's `decisions.md`) now.
   - **Extra work found:** ask once, listing each item with a recommendation — split it out (required for this ticket → `/jrg-split`), defer it (uncertain → `/jrg-defer`), or backlog it (wanted, not required → `/jrg-backlog`). Write only what the user confirms.
2. **Status**, only if it actually changed. Edit the ticket's `Status` line — nowhere else.
   - **Blocked:** the precise blocker, who or what resolves it, progress so far. `Status: blocked`; keep `Next:` (what to do once unblocked).
   - **Unblocked:** update the note. `Status: in_progress`.
   - **Done:** when the user says it is done or committed, that is their confirmation — do not ask them to confirm each acceptance item. Run any remaining checks you can run yourself (tests, typecheck, build) and record the results; ask only about an item you cannot check, such as how something looks in the browser. A failing check is reported, not silently closed. With every box checked and no sub-ticket open, write `Completion evidence` (date, changed files or commit, verification results, decision references, accepted limitations). Anything worth knowing later must also be in `jrg/knowledge/`. Remove the `Next:` line. `Status: done`.
     - A sub-ticket: set the parent's `Next:` to the next open sub-ticket, or back to the parent's own work.
     - The last ticket of a milestone: check its exit criteria, record outcome evidence in the milestone index, and suggest `/jrg-groom deferred`.
   - **Cancelled:** the reason and the replacement or scope decision. `Status: cancelled`.
3. Run `python3 jrg/tickets/status.py`. Report any problems it lists, and what changed, file by file.
