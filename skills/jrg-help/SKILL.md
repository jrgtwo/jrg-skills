---
name: jrg-help
description: What these jrg skills are and how to use them
when_to_use: Use when the user asks what the jrg skills do, how the workflow works, which jrg command to run, or what the files under docs/tickets or docs/knowledge are for.
---

# jrg help

Explain the workflow to someone who has never seen it. Plain words, short, no jargon left undefined. If the user asked about one skill or one part, answer only that. Otherwise give the overview below, adapted to this repo: if `docs/tickets/` exists, mention what is in progress (from `docs/tickets/STATUS.md`); if it does not, say this repo is not set up yet and `/jrg-start` will do it.

## Overview to give

**What it is.** A way to keep track of work in a repo so any session — tomorrow, on another machine, or another person — can pick up exactly where the last one stopped. Work lives in tickets (plain markdown files in the repo), and Claude keeps them up to date as you go.

**Where to start:** `/jrg-start` at the beginning of every session. The first time, it sets the repo up (or moves existing notes over). After that, it shows what's in progress and helps pick what to work on.

**The commands**

| Command | Use it to |
| --- | --- |
| `/jrg-start` | Start a session. Start here |
| `/jrg-plan` | Think through something big or unclear before building it. Can take several sessions; questions for you can be answered now or later |
| `/jrg-ticket` | Add a ticket for one clear piece of work, or save progress on the one you're on (including "done" or "blocked") |
| `/jrg-split` | Pull extra work that the current ticket needs into its own ticket |
| `/jrg-defer` | Note something you spotted that might matter, to look at later |
| `/jrg-backlog` | Note work you definitely want but haven't scheduled |
| `/jrg-groom` | Go through the deferred and backlog lists one item at a time and decide what to keep |
| `/jrg-help` | This |

You don't have to remember the small ones: say "defer that" or "put that on the backlog" and Claude will use them, and `/jrg-ticket` asks about extra work when it saves progress.

**The files** (all in the repo, so they travel with it)

- `docs/tickets/` — the work: tickets grouped into milestones, plus `STATUS.md`, a generated summary of everything in flight.
- `docs/knowledge/` — how the project works: product, architecture, setup. Kept current, independent of the ticket system.
- `docs/legacy/` — old notes kept for history.

End by asking whether they want to start (`/jrg-start`) — only if the repo is not set up or nothing is in progress.
