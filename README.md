# jrg-skills

A ticket workflow for Claude Code, shared across machines. Generalized from the football-cards workflow.

## Install

This repo is a Claude Code plugin and its own marketplace. In Claude Code, on each machine:

```text
/plugin marketplace add jrgtwo/jrg-skills
/plugin install jrg-skills@jrg
```

Nothing is installed outside Claude Code's plugin system: no settings, hooks or rules are changed. To try a local checkout instead, pass its folder: `/plugin marketplace add ~/projects/jrg-skills`.

**Updating:** bump `version` in `.claude-plugin/plugin.json` when releasing a change; machines pick it up with `/plugin marketplace update jrg` and `/plugin update jrg-skills@jrg`.

## Skills

| Skill | Does |
| --- | --- |
| `/jrg-start` | Start a session. Sets the repo up — or migrates it — if needed, then reads the generated status and resumes or picks a ticket |
| `/jrg-plan` | Plan large or unclear work as a milestone of tickets, with a pausable decision register |
| `/jrg-plan-to-tickets` | Turn a ready plan into build milestones and tickets |
| `/jrg-new-ticket` | One ticket for one clear piece of work |
| `/jrg-update-ticket` | Progress, blocked, or done on the current ticket |
| `/jrg-cut-sub-ticket` | Required extra work split out of the current ticket |
| `/jrg-defer` | Something uncertain to look at later |
| `/jrg-backlog` | Wanted work with no home yet |
| `/jrg-groom` | Walk deferred, backlog or pre-migration one entry at a time |

## What a set-up repo looks like

```text
README.md
CLAUDE.md               short; points into docs/
docs/
  knowledge/            how the project works — owned by no workflow
    plans/<slug>/       brief, plan, decision register
  tickets/              this workflow: workflow.md, status.py, STATUS.md (generated),
                        templates/, initiatives, deferred/, backlog/, pre-migration/
  legacy/               superseded material + an index of where its content went
```

Knowledge and tracking are kept apart so the tracking layer can be replaced later without losing anything. The rules every skill follows are in `skills/jrg-start/scaffold/docs/tickets/workflow.md`, which setup copies into each repo.

## Layout of this repo

```text
.claude-plugin/plugin.json               the plugin: lists the skills
.claude-plugin/marketplace.json          makes this repo installable with /plugin
skills/jrg-start/scaffold/docs/          copied into a repo at setup
skills/jrg-start/setup.md                setup for a repo with no workflow docs
skills/jrg-start/migration/              migration for a repo that has them
skills/jrg-plan/templates/               brief, plan, decision register
skills/jrg-*/SKILL.md                    the skills
```
