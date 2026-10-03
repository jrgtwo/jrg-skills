# Migration — a repo that already has workflow or planning docs

The migration is **work tracked in the new workflow**, not one long session. This file does the cheap part now (scaffold + migration tickets); the tickets do the rest, one per session if needed.

Goals, in order: lose nothing; leave one current copy of each fact; cite nothing stale; keep every session's context small.

## Now, in this session

1. **Scaffold.** Follow [../setup.md](../setup.md) steps 1–3 (copy scaffold, `.gitignore` check, CLAUDE.md section). Do not touch the old docs yet.
2. **Pre-migration list.** Copy [pre-migration-index.md](pre-migration-index.md) to `docs/tickets/pre-migration/index.md` and add its row to the holding-lists table in `docs/tickets/index.md`:
   `| [Pre-migration](pre-migration/index.md) | Every work item imported unverified from the old docs, awaiting grooming |`
3. **Migration initiative.** From the templates, create `docs/tickets/migration/index.md` (name "Migration", prefix `MIG`), milestone `docs/tickets/migration/01-migrate/index.md`, and the tickets below in this order. Type in brackets.
4. Run `python3 docs/tickets/status.py` and report what was created.

## The migration tickets

**MIG-001 — Inventory the old docs** [verification]
Write `docs/tickets/migration/inventory.md`: one row per old doc — path, lines, git-tracked or ignored, last modified, and its sections by line range with a content kind and a target home. Include the per-machine memory folder (`~/.claude/projects/<repo-path-with-dashes>/memory/`) as a read-only source. Flag duplicates (the same content in several files) and say which copy is newest. Skim to classify; do not verify claims against code here. Every later ticket reads only the rows it needs from this file.

Content kind → target home:

| Kind | Home |
| --- | --- |
| Product pitch, what works today, product decisions | `docs/knowledge/product.md` |
| How it works, file map | `docs/knowledge/architecture.md` |
| Stack, dependencies, technical decisions | `docs/knowledge/technical.md` |
| Setup, commands, testing, deploy, troubleshooting | `docs/knowledge/development.md` |
| Project-specific topics | `docs/knowledge/<topic>.md` |
| Any work item: active, done, queued, idea, parked, known issue, dropped | `docs/tickets/pre-migration/` |
| Agent behavior rules | `CLAUDE.md`, carried over unchanged |
| Old workflow commands and skills | `docs/legacy/` |
| Specs, audits, mockups, plans | knowledge (still-true parts) + `docs/legacy/` (the original) |

**MIG-002 — Import every work item into pre-migration** [implementation]
Mechanical. One entry per item in the pre-migration format, in the old doc's words, with its source path and line range and its old state. Do not verify, merge or judge — that is grooming's job. Duplicates across old docs become one entry listing every source.

**MIG-003… — One ticket per knowledge doc** [implementation], each depending on MIG-001: product, architecture, technical, development, plus one per project-specific topic the inventory found. Each ticket:
1. Reads only the inventory rows mapped to its doc.
2. Writes the doc from the newest copy of each fact.
3. **Checks every factual claim against the code** — use subagents for the checking so this session holds only their conclusions. Fix stale claims; list each fix in the completion evidence.
4. Shows the user the finished doc's outline and the list of corrections, once, for review.

**MIG-0xx — Rewrite CLAUDE.md** [implementation], depending on the knowledge tickets. Short: commands, conventions, gotchas, the Workflow section, pointers into `docs/knowledge/`. Anything longer moves to a knowledge doc. Every agent behavior rule the inventory found is carried over unchanged — the migration does not add, drop or reword rules; deduplicate exact repeats only.

**MIG-0xx — Retire the old docs** [implementation], last, depending on everything above. Move every old doc, command and skill into `docs/legacy/`, keeping relative structure. Add one row per item to `docs/legacy/README.md`: what it was and where its content went. Then confirm nothing outside `docs/legacy/` links into it, and run `git check-ignore` on `docs/` and `CLAUDE.md` once more. Never delete an old doc.

## After the migration

The migration initiative is done. Pre-migration stays until groomed (`/jrg-groom pre-migration`), whenever the user wants. Shipped items groomed from it go to `docs/knowledge/history.md`.
