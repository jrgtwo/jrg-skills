# Setup — a repo with no existing workflow docs

Only when `jrg/tickets/workflow.md` is missing and nothing needs migrating. Setup creates `jrg/` and touches nothing else in the repo.

1. **Copy the scaffold.** Copy this skill's `scaffold/jrg/` into the repo root as `jrg/`. Do not create empty knowledge docs; `jrg/knowledge/README.md` lists them and each is written when there is something true to put in it.
2. **Generate the views.** Run `python3 jrg/tickets/status.py`.
3. **Report**, in exactly this form and nothing more:
   - Created: `jrg/`.
   - Status: the script's ticket and problem counts.
   - Not tracked: only if `git check-ignore -q jrg` says `jrg/` is gitignored — one line saying so. Otherwise omit this line.
   - Next: ask what the first piece of work is. Large or unclear → `/jrg-plan`; one clear change → `/jrg-ticket`. An empty board is a valid state.
