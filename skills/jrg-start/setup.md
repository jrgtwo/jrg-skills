# Setup — a project with no existing workflow docs

Only when `<root>/tickets/index.md` is missing and nothing needs migrating. Setup creates the root's contents and touches nothing else in the repo.

1. **Copy the scaffold** from this skill's `scaffold/jrg/`:
   - **In this repo** (root `<repo>/jrg`): copy the whole folder to `<repo>/jrg/`.
   - **In the hub** (root `<hub>/projects/<name>` or `<hub>/private/<name>`): copy everything except `tickets/workflow.md`, `tickets/status.py` and `tickets/templates/` — the hub has one shared copy of each at its top level. In the copied files, point links to `workflow.md` at the hub's copy (a relative path, e.g. `../../../workflow.md` from `tickets/backlog/index.md`).
   Do not create empty knowledge docs; `knowledge/README.md` lists them and each is written when there is something true to put in it.
2. **Generate the views.** Run `jrg-hub resolve` again for the `status` command, then run it.
3. **Report**, in exactly this form and nothing more:
   - Created: the root, as a path.
   - Status: the script's ticket and problem counts.
   - Not tracked: in-repo only, and only if `git check-ignore -q jrg` says `jrg/` is gitignored — one line saying so. Otherwise omit this line.
   - Next: ask what the first piece of work is. Large or unclear → `/jrg-plan`; one clear change → `/jrg-ticket`. An empty board is a valid state.
