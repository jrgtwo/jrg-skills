---
name: jrg-start
description: "Start here: see what's in progress, or set up this repo"
when_to_use: Use at the beginning of a work session in a repo, to see current work and pick what to do next. On first use in a repo it sets up the ticket workflow, or migrates existing notes and task docs into it.
---

# Start a session

Bootstraps and routes. Writes no feature code, runs no project tests, starts no servers: the branch is not guaranteed clean or related to what comes next.

## 0. Is this repo set up?

Look for `docs/tickets/workflow.md`.

- **Present** → compare its `<!-- jrg-scaffold: N -->` marker with this skill's `scaffold/docs/tickets/workflow.md`. If the repo's is older, say so in one line (do not update it unprompted). Go to step 1.
- **Missing** → the repo is not set up. First explain in three short lines what is about to happen: this workflow keeps work as tickets in `docs/tickets/` and project knowledge in `docs/knowledge/`, all plain files in the repo, so any session can pick up where the last one stopped; Claude keeps them current; `/jrg-help` explains more. Then look for existing workflow or planning docs: a `.claude/` folder with docs or commands, `docs/`, `HANDOFF.md`, `STATUS.md`, `TODO*`, `ROADMAP*`, task or ticket folders, plan or spec files, and any `CLAUDE.md` / `AGENTS.md` / `DEVELOPMENT.md` beyond a few lines.
  - **Nothing found** → follow [setup.md](setup.md), then step 1.
  - **Found** → report what was found (paths and line counts, one line each) and say this repo needs a migration. On the user's go-ahead, follow [migration/migrate.md](migration/migrate.md). That sets up the workflow and creates the migration as tickets; then continue at step 1, where the first migration ticket is the recommended pick.

## 1. Regenerate and read the status

Run `python3 docs/tickets/status.py`, then read `docs/tickets/STATUS.md`. **That is the whole bootstrap read.** Do not read initiative indexes, milestone indexes or ticket files to find out where things stand.

If the script reports problems, list them. Do not fix them here; a fix is its own change once the user agrees. If the script rewrote `STATUS.md` or a ledger, someone changed a ticket without regenerating — say so.

## 2. Present the state

In plain prose, from `STATUS.md`, and briefly:

- **In progress:** each ticket by title, its milestone, and its `Next:` line; for a sub-ticket, its parent.
- **Blocked:** each ticket by title and its `Next:` line.
- **Open plan questions:** which plans have open or parked questions, and how many. Offer to pick them up; never start asking unprompted.
- **Next ready:** the ticket `STATUS.md` names. Read its milestone's entry conditions before recommending it.
- **Holding lists:** mention any with entries that have not been groomed recently; mention pre-migration if it exists.

## 3. Pick the current ticket

Ask which ticket to work on. Resuming an `in_progress` ticket is the default recommendation.

Once picked:

- Read the ticket in full, its milestone index and the sources it links.
- If it was `todo`: confirm its dependencies are done, set `Status: in_progress`, write the `Next:` line at the top of `Notes and blockers`, and run `python3 docs/tickets/status.py`.
- State the ticket's outcome and acceptance criteria back in two or three lines, so a misunderstanding surfaces before work starts.

The session now has one current ticket. The user can switch at any time by saying so.

If the user names work that has no ticket: large or unclear → `/jrg-plan`; one clear piece of work → `/jrg-ticket`; required by the current ticket → `/jrg-split`.
