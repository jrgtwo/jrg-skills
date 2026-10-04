# Migration — a repo that already has workflow or planning docs

The migration is **work tracked in the new workflow**, not one long session. This file does the cheap part now (scaffold + migration tickets); the tickets do the rest, one per session if needed.

Goals, in order: lose nothing; leave one current copy of each fact; cite nothing stale; keep every session's context small.

**In a hub root, the migration only reads the repo** — nothing in it is moved, renamed or deleted, and there is no retire ticket; the hub is the source of truth, and the repo's own docs stay its owner's business. In a repo root, the old docs are retired into `<root>/legacy/` by the last ticket.

The user's choice to migrate covers the whole migration: work the tickets in order without asking for a go-ahead between them. Stop only for each knowledge doc's review.

## Now, in this session

1. **Mode.** Ask once: **use subagents (faster, more tokens — each agent loads its own context) or inline (cheaper — one ticket per session keeps context small)?** Record the answer as `Mode: subagents` or `Mode: inline` in the migration initiative's index (step 4). Every migration ticket follows it.
2. **Scaffold.** Follow [../setup.md](../setup.md) step 1 (copy the scaffold). Do not touch the old docs yet.
3. **Pre-migration list.** Copy [pre-migration-index.md](pre-migration-index.md) to `<root>/tickets/pre-migration/index.md` and add its row to the holding-lists table in `<root>/tickets/index.md`:
   `| [Pre-migration](pre-migration/index.md) | Every work item imported unverified from the old docs, awaiting grooming |`
4. **Migration initiative.** From the templates, create `<root>/tickets/migration/index.md` (name "Migration", prefix `MIG`, with the `Mode:` line), milestone `<root>/tickets/migration/01-migrate/index.md`, and the tickets below in this order. Type in brackets.
5. Run the status command and report in the same fixed form as setup step 3, adding one line for the migration tickets created.

## The migration tickets

Each ticket reads `Mode:` from `<root>/tickets/migration/index.md`. **Subagents** means: fan out as each ticket describes, and keep only the agents' results in this session. **Inline** means: do the same work in this session, and end the session after each ticket if context is getting full — the ticket's `Next:` line lets the next session resume.

**MIG-001 — Inventory the old docs** [verification]
Write `<root>/tickets/migration/inventory.md`: one row per old doc — path, lines, git-tracked or ignored, last modified, and its sections by line range with a content kind and a target home. Include the per-machine memory folder (`~/.claude/projects/<repo-path-with-dashes>/memory/`) as a read-only source. Flag duplicates (the same content in several files) and say which copy is newest. Skim to classify; do not verify claims against code here. Every later ticket reads only the rows it needs from this file.
*Subagents:* one agent per old doc (or small group of short docs), each returning only its table rows; this session merges the rows and marks duplicates.

Content kind → target home:

| Kind | Home |
| --- | --- |
| Product pitch, what works today, product decisions | `<root>/knowledge/product.md` |
| How it works, file map | `<root>/knowledge/architecture.md` |
| Stack, dependencies, technical decisions | `<root>/knowledge/technical.md` |
| Setup, commands, testing, deploy, troubleshooting | `<root>/knowledge/development.md` |
| Project-specific topics | `<root>/knowledge/<topic>.md` |
| Any work item: active, done, queued, idea, parked, known issue, dropped | `<root>/tickets/pre-migration/` |
| Old workflow commands and skills | repo root: `<root>/legacy/`; hub root: left in the repo |
| Specs, audits, mockups, plans | knowledge (still-true parts); the original goes to `<root>/legacy/` in a repo root, stays in the repo in a hub root |

**MIG-002 — Import every work item into pre-migration** [implementation]
Mechanical. One entry per item in the pre-migration format, in the old doc's words, with its source path and line range and its old state. Do not verify, merge or judge — that is grooming's job. Duplicates across old docs become one entry listing every source.
*Subagents:* one agent per old doc, each returning its items as entries; this session merges duplicates and writes the list (agents never write the list themselves).

**MIG-003… — One ticket per knowledge doc** [implementation], each depending on MIG-001: product, architecture, technical, development, plus one per project-specific topic the inventory found. Each ticket:
1. Reads only the inventory rows mapped to its doc.
2. Writes the doc from the newest copy of each fact.
3. **Checks every factual claim against the code.** Fix stale claims; list each fix in the completion evidence.
   *Subagents:* one agent drafts the doc from its sources, and agents check its claims against the code; the knowledge-doc tickets have no dependencies on each other, so run them in parallel. Reviews still happen one doc at a time.
4. Shows the user the finished doc's outline and the list of corrections, once, for review.

**MIG-0xx — Retire the old docs** [implementation] — **repo roots only; skip in a hub root.** Last, depending on everything above. Move every doc, command and skill listed in the inventory into `<root>/legacy/`, keeping relative structure. Add one row per item to `<root>/legacy/README.md`: what it was and where its content went. Then confirm nothing outside `<root>/legacy/` links into it, and run `git check-ignore -q jrg` once more. Never delete an old doc.

## After the migration

The migration initiative is done. Pre-migration stays until groomed (`/jrg-groom pre-migration`), whenever the user wants. Shipped items groomed from it go to `<root>/knowledge/history.md`.
