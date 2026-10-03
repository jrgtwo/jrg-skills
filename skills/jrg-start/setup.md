# Setup — a repo with no existing workflow docs

Only when `jrg/tickets/workflow.md` is missing and nothing needs migrating.

1. **Copy the scaffold.** Copy this skill's `scaffold/jrg/` into the repo root as `jrg/`. Do not create empty knowledge docs; `jrg/knowledge/README.md` lists them and each is written when there is something true to put in it.
2. **Check git will track it.** Run `git check-ignore -v jrg/tickets/workflow.md CLAUDE.md`. If either is ignored, show the `.gitignore` line and propose removing it. The workflow only travels between machines if these files are tracked. Edit `.gitignore` only on a yes.
3. **CLAUDE.md.** If there is none, create a short one. If there is one, add this section without rewriting the rest:

   ```markdown
   ## Workflow

   Work is tracked in `jrg/tickets/` (rules: `jrg/tickets/workflow.md`; state: generated `jrg/tickets/STATUS.md`). How the project works is in `jrg/knowledge/`. Start every session with `/jrg-start`. No work without a ticket.
   ```

4. **Generate the views.** Run `python3 jrg/tickets/status.py`.
5. **First work.** Ask what the first piece of work is. Large or unclear → `/jrg-plan`; one clear change → `/jrg-ticket`. Neither is required now — an empty board is a valid state.
6. **Report** the files created, one line each.
