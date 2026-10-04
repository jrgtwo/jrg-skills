---
name: jrg-start
description: "Start here: see what's in progress, or set up this repo"
when_to_use: Use at the beginning of a work session in a repo, to see current work and pick what to do next. On first use in a repo it sets up the ticket workflow, or migrates existing notes and task docs into it. "/jrg-start migrate" starts a migration in a repo that began clean; "/jrg-start upgrade" updates the workflow files after a plugin update.
argument-hint: "[migrate | upgrade]"
---

# Start a session

$ARGUMENTS

Bootstraps and routes. Writes no feature code, runs no project tests, starts no servers: the branch is not guaranteed clean or related to what comes next.

## 0. Find the project and check it is set up

Hub: `${user_config.hub_path}` · Plugin: `${CLAUDE_PLUGIN_ROOT}`

Follow [root.md](root.md) to run `jrg-hub resolve`. **Never pick a project by guessing** — not from open files, recent activity, or scanning folders. The project is the one `resolve` reports, or the one the user picks. **With a hub** (any mode except `in-place` and `no-hub`), first:

1. **One-time questions on this machine.** Read `jrg-hub config --hub <hub>`; ask only the questions whose key is missing, then record the answer with `jrg-hub config --hub <hub> KEY=VALUE`:
   - `hub_dirs` — "Save the hub's location in your user settings, and add it to `additionalDirectories`, so every session finds it and can update its notes without permission prompts? (This edits `~/.claude/settings.json`.)" On a yes, in `~/.claude/settings.json` set `pluginConfigs.<plugin id>.hub_path` to the hub path — the plugin id is this plugin's key in `enabledPlugins`, e.g. `jrg-skills@jrg-skills` — and add the hub path to `permissions.additionalDirectories`; touch nothing else, and say it takes effect from the next session. Record `hub_dirs=true`. On a no, `hub_dirs=false` (the user can still set **hub_path** in `/config`).
   - `auto_sync` — "Let jrg commit and push the hub automatically? It only ever touches the hub — never your project repos." Record `auto_sync=true` or `false`.
2. **Pull.** If `auto_sync` is true, run the **Before reading** step from root.md's Hub sync.
3. **Privacy check.** Run `jrg-hub privacy-check --hub <hub>`. If `private_projects_in_public_hub` lists anything, warn — those projects' notes are being published — and offer `jrg-hub make-private --hub <hub> --name <project>` for each, saying that what was already pushed stays in the hub's git history. If `unknown_projects` lists anything, ask once whether each repo is private and record it with `jrg-hub visibility --hub <hub> --path <its folder> --set public|private`.

Then act on `mode`:

- **`in-place`, `hub` or `private`** → the project has a root. If `<root>/tickets/index.md` is missing (a hub project registered but never set up), go to **Set up** below. Otherwise:
  - **The argument is `migrate`** → if `<root>/tickets/migration/` already exists, say a migration is already underway and go to step 1. Otherwise look for existing docs (see **Existing docs**); none → say so and go to step 1; some → follow [migration/migrate.md](migration/migrate.md), skipping its scaffold step.
  - **The argument is `upgrade`** → `jrg-hub upgrade --root <root>` (in-place) or `jrg-hub upgrade --hub <hub>` (hub — upgrades every project at once). It replaces only `workflow.md`, `status.py` and the templates — never tickets, knowledge or legacy. Run the status command, report the version change and files replaced, and in a hub finish with Hub sync. Go to step 1.
  - **Otherwise** → compare the `<!-- jrg-scaffold: N -->` marker in the workflow file with this skill's `scaffold/jrg/tickets/workflow.md`. If the project's is older, say so in one line and suggest `/jrg-start upgrade` (do not upgrade unprompted). Go to step 1.
- **`hub-root` or `not-a-project`** → show the project picker (below) and ask which to work on. For a project that's on this machine, resolve again with `--cwd` set to its path and continue as above. For one that isn't, offer `/jrg-projects link`. Planning and grooming can continue from here; for coding, say it's smoother to start Claude in the project's folder.
- **`name-match`** → a hub project with no repo yet has this folder's name. Ask: **is this folder _<project>_?** Yes → `jrg-hub relink --hub <hub> --name <project> --path <path>`, resolve again, continue as above. No → treat as `unregistered`.
- **`unregistered`** → a git repo the hub doesn't know. Ask one question: **add it to the hub, or keep its notes in this repo?**
  - **Hub** → ask its name (suggest `suggested_name`). Check privacy: `jrg-hub visibility --hub <hub> --path <path>` and `jrg-hub visibility --hub <hub> --self` (ask and `--set` any that come back unknown). **A private project in a public hub always goes in `private/`** — say so — and then ask how it should appear on public stats (hidden, aggregated — the default — or anonymous). Then `jrg-hub register --hub <hub> --path <path> --name <name> [--private --stats <choice>]` and resolve again. If the repo already has its own `jrg/`, copy its `tickets/`, `knowledge/` and `legacy/` into the new root (skipping `workflow.md`, `status.py` and `templates/`), run the status command to confirm it matches, leave the repo's `jrg/` untouched, and go to step 1. Otherwise go to **Set up**.
  - **This repo** → go to **Set up** with root `<repo>/jrg`.
- **`no-hub` and `git` is false** → not in a project, and no hub configured. Say exactly that, then ask: **create a hub — one private repo holding every project's notes, usable from any folder — or point to one you already have? Or start Claude in a project's folder to set that project up instead?** Hub → as in **A hub** below, then show the (empty) project list and offer `/jrg-projects add <folder>` to find projects. Project → stop.
- **`no-hub` and `git` is true** → first use in a project with no hub configured. Explain in three short lines what this is: work is kept as tickets and project knowledge as plain files, so any session — on any machine — can pick up where the last one stopped; Claude keeps them current; `/jrg-help` explains more. Then ask: **keep this project's notes in this repo, or in a hub — one private repo holding every project's notes?**
  - **This repo** → **Set up** with root `<repo>/jrg`.
  - **A hub** → ask where it is (an existing hub folder, e.g. a clone) or where to create one. To create: `jrg-hub init --hub <path>`; git init and the remote are the user's — recommend a **private** remote, since the hub holds every project's notes. This session continues with `--hub <path>`; the one-time questions above (asked now) save the location for every future session. Then register this repo as for `unregistered`.

### Set up

**Existing docs.** Look for workflow or planning docs in the repo: a `.claude/` folder with docs or commands, `docs/`, `HANDOFF.md`, `STATUS.md`, `TODO*`, `ROADMAP*`, task or ticket folders, plan or spec files, and a `DEVELOPMENT.md` beyond a few lines.

- **Nothing found** → follow [setup.md](setup.md), then step 1.
- **Found** → list what was found (paths and line counts, one line each), then ask one question — in a repo root: **migrate these docs into jrg, or start clean alongside them?**; in a hub root: **import these docs into the hub, or start clean?** (importing only reads them; the repo is never changed).
  - **Migrate / import** → follow [migration/migrate.md](migration/migrate.md). The answer is the user's consent for the whole migration. Then continue at step 1, where the first migration ticket is the recommended pick.
  - **Start clean** → follow [setup.md](setup.md), then step 1. From then on no jrg skill reads docs outside the root, and this question is not asked again. `/jrg-start migrate` starts a migration later.

### Project picker

Run `jrg-hub list` (active projects, already sorted by last worked) and show it as a plain table — never a menu:

```
You're in the hub, not a project. Your projects:

  #  Project            In progress                         Next ready             Last worked
  1  metronome          Rework the trainer                  Accent editor          today
  2  football-cards     Migrate dashboard storage (blocked) Rework the proof page  last week
  3  kanban 🔒           —                                   —                      2 weeks ago
  4  recipes-app        (new — no repo yet)                 —                      —
     typing-tutor       not on this machine

Which one? (number or name)
```

🔒 marks private projects. Projects not on this machine are listed without a number. Write dates as "today", "3 days ago", "last week". The user answers with a number or a name.

### Merge sweep (hub and private roots)

Before reading the status, look for tickets with `Status: awaiting_merge` in `<root>/tickets/` (search the `- Status:` lines). For each, run `jrg-hub merged --path <project folder> --branch <its Branch>`:

- **`merged: true`** → apply its pending knowledge file (if any) to the knowledge docs, delete the file, remove the `Knowledge pending:` line, add the merge date to its completion evidence, set `Status: done`. Report one line per ticket: "*Rework the trainer* merged → knowledge updated, ticket closed."
- **`merged: false`** → leave it.
- **`merged: null`** (no history and no PR, e.g. a squash merge without `gh`) → ask once: "Was `<branch>` merged?" Yes → close it as above.

If anything closed, the status command and Hub sync below pick it up.

## 1. Regenerate and read the status

Run the status command, then read `<root>/tickets/STATUS.md`. **That is the whole bootstrap read.** Do not read initiative indexes, milestone indexes or ticket files to find out where things stand.

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
- If it was `todo`: confirm its dependencies are done, set `Status: in_progress`, write the `Next:` line at the top of `Notes and blockers`, and run the status command. In a hub project, check `jrg-hub branch --path <project folder>`: on a non-default branch, add `- Branch: <current>` to the ticket header.
- State the ticket's outcome and acceptance criteria back in two or three lines, so a misunderstanding surfaces before work starts.
- **Open questions?** Check the plan's `decisions.md` for `Status: open` entries whose `Blocks` names this ticket, and anything in the ticket you'd otherwise have to guess. If there are any, ask them now (the workflow file's Decision questions rules) and stop until they're answered.
- **None → start the work** in the project's build mode, from the `Build mode:` line in `<root>/tickets/index.md`:
  - `multi-agent` → `/jrg-build`, which stops whenever a question comes up.
  - `inline` → work on it directly in this session; stop and ask whenever a question comes up that changes what the user gets.
  - no line yet → ask once: **"Build tickets with the multi-agent workflow (faster, uses more tokens) or inline (cheaper)?"** Add `- **Build mode:** multi-agent` (or `inline`) to `<root>/tickets/index.md`, then start.
  The user can override for a single ticket by saying so.

The session now has one current ticket. The user can switch at any time by saying so.

In a hub, if this session wrote anything (a closed merge, a picked ticket), finish with the **After writing** step of root.md's Hub sync.

If the user names work that has no ticket: large or unclear → `/jrg-plan`; one clear piece of work → `/jrg-ticket`; required by the current ticket → `/jrg-split`.
