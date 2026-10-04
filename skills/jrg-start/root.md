# Find the project root

Every jrg skill starts here. The **root** is the folder holding this project's `tickets/`, `knowledge/` and `legacy/`. Skills write `<root>/tickets/…` and so on; never assume `jrg/`.

1. Run the helper, passing the hub from the skill's header (omit `--hub` if the header shows no hub, or still shows a literal `${…}`):

   ```bash
   jrg-hub resolve --hub "<hub>"
   ```

   If `jrg-hub` is not on the PATH, run it as `python3 <plugin root>/bin/jrg-hub` — the plugin root is in the skill's header too.

2. Act on `mode`:

   | `mode` | Meaning | Do |
   | --- | --- | --- |
   | `in-place` | The repo has its own `jrg/` | `root` and `status` are in the output. Carry on |
   | `hub` / `private` | A project in the hub (`private` = its notes are in the hub's gitignored `private/` folder) | `root` and `status` are in the output. Carry on. If `newly_linked` is true, say this folder was just linked to the project |
   | `hub-root` | Running inside the hub | Ask which project (`projects` lists them); its root is `<hub>/projects/<name>` or `<hub>/private/<name>` — re-run `resolve --cwd` on the project's path from `jrg-hub list` to get its `status` command |
   | `not-a-project` | A folder that isn't a project | Same as `hub-root`: list the projects and ask which |
   | `name-match` | This folder has the same name as a hub project that has no repo yet | Only `/jrg-start` handles this (its step 0). Any other skill suggests `/jrg-start` |
   | `unregistered` | A git repo the hub doesn't know | Only `/jrg-start` handles this (its step 0). Any other skill says the repo isn't set up and suggests `/jrg-start` |
   | `no-hub` | No hub configured, and no in-repo `jrg/` | Only `/jrg-start` handles this. Any other skill says the repo isn't set up and suggests `/jrg-start` |

**Never pick a project by guessing** (open files, recent activity, scanning folders). If `resolve` doesn't name one, the user picks.

3. State the root in one line before doing anything else — "Working in **metronome** (hub)" or "(in this repo)" — so a wrong match is caught early.

**The status command** is the `status` value from the output. Wherever a skill says "run the status command", run exactly that.

**The templates folder** is the `templates` value, and **the workflow file** (the rules every skill follows) is the `workflow` value: in a repo both are inside `<root>/tickets/`; in a hub there is one of each at the hub's top level.

If `archived` is true, say the project is archived before continuing; `/jrg-projects unarchive <name>` brings it back.

## Hub sync (hub and private roots only)

`jrg-hub config --hub <hub>` shows this machine's choice; `auto_sync: true` means the user agreed that jrg commits and pushes the hub. Always write hub git as `git -C <hub> …` so the target is explicit — never git in the project repo, and never git through a script.

- **Before reading** (`/jrg-start` only): `git -C <hub> pull --rebase --autostash`.
- **After writing** to the hub (any skill, at its end): `git -C <hub> pull --rebase --autostash && git -C <hub> add -A && git -C <hub> commit -m "jrg: <project> — <what changed, a few words>" && git -C <hub> push`. `private/` and `.local/` are gitignored, so they are never committed.
- **If git fails** — a conflict, no network, no remote: stop syncing, say so in one line with the error, and never resolve a conflict yourself. The session-start check will remind the user.
- **If a hook blocks the command** (the user's own git guard): say it was blocked and that their guard needs an exception for `git -C <hub>`; do not retry another way.
- **`auto_sync` false or unset:** don't run git. The session-start check warns the user when the hub needs syncing.
