---
name: jrg-groom
description: Walk a jrg holding list (deferred, backlog, or pre-migration) one entry at a time with the user — drop, keep, reword, merge, promote, or file as history
argument-hint: "[optional — deferred | backlog | pre-migration]"
---

# Groom a holding list

$ARGUMENTS

Rules: `docs/tickets/workflow.md` — Holding lists, Grooming. **The user decides every entry; never bulk-classify.**

## With no list named

Show each list in `docs/tickets/` (deferred, backlog, and pre-migration if it exists) with its entry count and `Last groomed` date, and ask which to groom.

## With a list named

Read the list's header (`What`, `Add when`, `Remove when`). Say how many entries there are. Then for each entry, in order:

1. Show the entry, in plain words.
2. Say what was found checking it **now, against the code**: already done, partly done, still accurate, the file it mentions is gone, it duplicates another entry, or a ticket already covers it. Check before proposing; a stale entry is the normal case, not the exception.
3. Recommend one outcome, with the reason in a line.
4. **Wait.** The user decides.

The user can stop at any point. Every decision is written as it is made, so stopping loses nothing; the next session continues at the next entry.

## Outcomes

- **Keep** — leave it, optionally reworded.
- **Drop** — remove it.
- **Merge** — fold into another entry; remove this one.
- **Deferred → backlog** — move it in the backlog's format.
- **→ ticket** — create it with `/jrg-new-ticket`, then remove the entry.
- **Pre-migration only:**
  - **History** (it shipped) — add a dated line to `docs/knowledge/history.md` (newest first; create the file if missing), saying what shipped and, if the old doc says, why. Remove the entry.
  - **→ backlog / → deferred** — rewrite it in that list's format, as checked today, and remove it here.
  - When pre-migration is empty, delete the folder and its row in `docs/tickets/index.md`.

## Finish

Update `Last groomed` in the list's header. Run `python3 docs/tickets/status.py`. Report counts: kept, dropped, merged, promoted, filed as history. An entry that cannot be settled quickly stays, marked `unverified: <date>`. Fixing something found is a ticket, not part of the pass.
