# jrg-skills

A ticket workflow for Claude Code, shared across machines. Generalized from the football-cards workflow.

## Install

This repo is a Claude Code plugin and its own marketplace. In Claude Code, on each machine:

```text
/plugin marketplace add jrgtwo/jrg-skills
/plugin install jrg-skills@jrg-skills
```

Nothing is installed outside Claude Code's plugin system: no settings, hooks or rules are changed. To try a local checkout instead, pass its folder: `/plugin marketplace add ~/projects/jrg-skills`.

**Updating:** Claude Code only offers an update when `version` in `.claude-plugin/plugin.json` changes. The repo's pre-commit hook bumps it automatically on any commit that doesn't — enable it once per clone with `git config core.hooksPath .githooks`. On a machine, update from `/plugin` → **Marketplaces** → **jrg-skills** → **Update marketplace**.

## Hub mode (optional)

Set the plugin's **hub_path** option (`/config`) to a folder holding one private repo for every project's tickets and notes; `/jrg-start` can create it. Leave it empty to keep notes in each repo's own `jrg/`. The design is in [`design/hub-mode.md`](design/hub-mode.md).

- `bin/jrg-hub` — the helper the skills use to find a project's notes and manage the hub (on the PATH while the plugin is enabled).
- `hooks/hub-check.py` — a session-start check that warns when the hub has unpushed work or is behind its remote.
- Hub git (only with your consent, per machine) is always written as `git -C <hub> …`; project repos are never touched. A git guard of your own needs an exception for that form.

## Skills

Start with `/jrg-start`. Run `/jrg-help` any time for an explanation in Claude.

| Skill | Does |
| --- | --- |
| `/jrg-start` | Start here: see what's in progress, or set up this repo (migrating existing notes if there are any) |
| `/jrg-plan` | Plan a big or unclear change before building it; ends by turning the plan into tickets |
| `/jrg-ticket` | Add a ticket, or update the one you're working on (progress, blocked, done) |
| `/jrg-build` | Build the current ticket with the multi-agent workflow (build → independent review → fix); stops for questions |
| `/jrg-split` | Split extra work the current ticket needs into its own ticket |
| `/jrg-defer` | Note something to look at later |
| `/jrg-backlog` | Note work you want but haven't scheduled |
| `/jrg-groom` | Go through the deferred, backlog or pre-migration list one item at a time |
| `/jrg-overview` | Where things stand — one project or all; `stats` writes the hub's public stats page |
| `/jrg-projects` | Hub projects: list, folders, scan, register, new, link, relink, archive, make private, remove |
| `/jrg-help` | What these skills are and how to use them |

The small ones (split, defer, backlog) don't need to be remembered: say "defer that" or "add it to the backlog" and Claude uses them, and `/jrg-ticket` asks about extra work when it saves progress.

## What a set-up repo looks like

```text
README.md
jrg/
  knowledge/            how the project works — owned by no workflow
    plans/<slug>/       brief, plan, decision register
  tickets/              this workflow: workflow.md, status.py, STATUS.md (generated),
                        templates/, initiatives, deferred/, backlog/, pre-migration/
  legacy/               superseded material + an index of where its content went
```

Knowledge and tracking are kept apart so the tracking layer can be replaced later without losing anything. The rules every skill follows are in `skills/jrg-start/scaffold/jrg/tickets/workflow.md`, which setup copies into each repo.

## Layout of this repo

```text
workflows/jrg-build.js                   the multi-agent build workflow
bin/jrg-hub                              hub helper used by the skills
hooks/                                   session-start hub check
design/hub-mode.md                       hub design notes
.githooks/pre-commit                     bumps the plugin version on every commit
.claude-plugin/plugin.json               the plugin: lists the skills
.claude-plugin/marketplace.json          makes this repo installable with /plugin
skills/jrg-start/scaffold/jrg/          copied into a repo at setup
skills/jrg-start/setup.md                setup for a repo with no workflow docs
skills/jrg-start/migration/              migration for a repo that has them
skills/jrg-plan/templates/               brief, plan, decision register
skills/jrg-*/SKILL.md                    the skills
```
