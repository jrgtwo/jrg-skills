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

## Skills

Start with `/jrg-start`. Run `/jrg-help` any time for an explanation in Claude.

| Skill | Does |
| --- | --- |
| `/jrg-start` | Start here: see what's in progress, or set up this repo (migrating existing notes if there are any) |
| `/jrg-plan` | Plan a big or unclear change before building it; ends by turning the plan into tickets |
| `/jrg-ticket` | Add a ticket, or update the one you're working on (progress, blocked, done) |
| `/jrg-split` | Split extra work the current ticket needs into its own ticket |
| `/jrg-defer` | Note something to look at later |
| `/jrg-backlog` | Note work you want but haven't scheduled |
| `/jrg-groom` | Go through the deferred, backlog or pre-migration list one item at a time |
| `/jrg-help` | What these skills are and how to use them |

The small ones (split, defer, backlog) don't need to be remembered: say "defer that" or "add it to the backlog" and Claude uses them, and `/jrg-ticket` asks about extra work when it saves progress.

## What a set-up repo looks like

```text
README.md
CLAUDE.md               short; points into jrg/
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
.githooks/pre-commit                     bumps the plugin version on every commit
.claude-plugin/plugin.json               the plugin: lists the skills
.claude-plugin/marketplace.json          makes this repo installable with /plugin
skills/jrg-start/scaffold/jrg/          copied into a repo at setup
skills/jrg-start/setup.md                setup for a repo with no workflow docs
skills/jrg-start/migration/              migration for a repo that has them
skills/jrg-plan/templates/               brief, plan, decision register
skills/jrg-*/SKILL.md                    the skills
```
