---
name: jrg-update-ticket
description: Record progress on the current jrg ticket, mark it blocked, or close it — then regenerate docs/tickets/STATUS.md
---

# Update the current ticket

Most calls are a mid-ticket update, often at the end of a session. Closing is one possible outcome, not the purpose. Rules: `docs/tickets/workflow.md` — Working a ticket, Sessions.

## 1. Name the ticket

State which ticket is being updated before writing anything, so a wrong guess can be corrected. It is the session's current ticket unless the user says otherwise.

## 2. Update its working state

- **Acceptance criteria:** check a box only with evidence from this or an earlier session — a command and its result, a reviewed file, a recorded decision. Say what the evidence is.
- **`Notes and blockers`:** rewrite `Next:` to the concrete next step. Delete what is no longer true. Do not append a session log.
- **Knowledge:** if this session changed how something works or settled a decision, update the owning doc in `docs/knowledge/` (or the plan's `decisions.md`) now.
- **Extra work discovered:** required by this ticket → `/jrg-cut-sub-ticket`. Uncertain → `/jrg-defer`. Wanted but not required → `/jrg-backlog`. Propose each; write only what is confirmed.

## 3. Status changes

Only if the status actually changed. Edit the ticket's `Status` line — nowhere else.

- **Blocked:** record the precise blocker, who or what resolves it, and progress so far. `Status: blocked`; keep `Next:` (what to do once unblocked).
- **Unblocked:** update the note. `Status: in_progress`.
- **Done:** every acceptance box checked and no sub-ticket open. Write `Completion evidence` (date, changed files or commit, verification results, decision references, accepted limitations). Anything worth knowing later must also be in `docs/knowledge/`. Remove the `Next:` line. `Status: done`.
  - A sub-ticket: set the parent's `Next:` to the next open sub-ticket, or back to the parent's own work.
  - The last ticket of a milestone: check its exit criteria, record outcome evidence in the milestone index, and propose grooming deferred.
- **Cancelled:** record the reason and the replacement or scope decision. `Status: cancelled`.

## 4. Regenerate and report

Run `python3 docs/tickets/status.py`. Report any problems it lists, and what changed, file by file.
