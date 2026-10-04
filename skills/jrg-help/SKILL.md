---
name: jrg-help
description: What these jrg skills are and how to use them
when_to_use: Use when the user asks what the jrg skills do, how the workflow works, which jrg command to run, or what the jrg ticket and knowledge files are for.
---

# jrg help

Hub: `${user_config.hub_path}` · Plugin: `${CLAUDE_PLUGIN_ROOT}`

**First, find the project root:** follow `${CLAUDE_PLUGIN_ROOT}/skills/jrg-start/root.md`, and use the root, status command, templates folder and workflow file it gives. If you write to a hub, finish with its **Hub sync** step.

Explain the workflow to someone who has never seen it. Plain words, short, no jargon left undefined. If the user asked about one skill or one part, answer only that. Otherwise give the overview below, adapted to this repo: if `<root>/tickets/` exists, mention what is in progress (from `<root>/tickets/STATUS.md`); if it does not, say this repo is not set up yet and `/jrg-start` will do it.

## Overview to give

**What it is.** A way to keep track of work in a repo so any session — tomorrow, on another machine, or another person — can pick up exactly where the last one stopped. Work lives in tickets (plain markdown files in the repo), and Claude keeps them up to date as you go.

**Where to start:** `/jrg-start` at the beginning of every session. The first time, it sets the repo up (or moves existing notes over). After that, it shows what's in progress and helps pick what to work on.

**The commands**

| Command | Use it to |
| --- | --- |
| `/jrg-start` | Start a session. Start here |
| `/jrg-plan` | Think through something big or unclear before building it. Can take several sessions; questions for you can be answered now or later |
| `/jrg-ticket` | Add a ticket for one clear piece of work, or save progress on the one you're on (including "done" or "blocked") |
| `/jrg-build` | Build the current ticket with agents: each part built, reviewed independently, then fixed. Used automatically when a project's build mode is multi-agent |
| `/jrg-split` | Pull extra work that the current ticket needs into its own ticket |
| `/jrg-defer` | Note something you spotted that might matter, to look at later |
| `/jrg-backlog` | Note work you definitely want but haven't scheduled |
| `/jrg-groom` | Go through the deferred and backlog lists one item at a time and decide what to keep |
| `/jrg-overview` | See where things stand — this project, or all of them — without picking work |
| `/jrg-projects` | With a hub: see your projects and where each lives on this machine; add folders where you keep projects |
| `/jrg-help` | This |

You don't have to remember the small ones: say "defer that" or "put that on the backlog" and Claude will use them, and `/jrg-ticket` asks about extra work when it saves progress.

**The files** — plain markdown, in one of two places: a `jrg/` folder inside the repo, or, with a hub (one private repo holding every project's notes), the hub's folder for this project. Say which one this project uses.

- `<root>/tickets/` — the work: tickets grouped into milestones, plus `STATUS.md`, a generated summary of everything in flight.
- `<root>/knowledge/` — how the project works: product, architecture, setup. Kept current, independent of the ticket system.
- `<root>/legacy/` — old notes kept for history.

End by asking whether they want to start (`/jrg-start`) — only if the repo is not set up or nothing is in progress.
