---
name: jrg-defer
description: Note something to look at later
when_to_use: Use when the user says to defer, park, or note something for later, or when something uncertain is noticed mid-ticket that may or may not matter.
argument-hint: "[what to note]"
---

# Add a deferred entry

Hub: `${user_config.hub_path}` · Plugin: `${CLAUDE_PLUGIN_ROOT}`

**First, find the project root:** follow `${CLAUDE_PLUGIN_ROOT}/skills/jrg-start/root.md`, and use the root, status command, templates folder and workflow file it gives. If you write to a hub, finish with its **Hub sync** step.

$ARGUMENTS

For something noticed while working a ticket that is **uncertain** — it may be nothing. Definitely wanted → `/jrg-backlog`. Required for the current ticket or milestone → a ticket or sub-ticket, never deferred.

1. With no argument, take it from what was just discussed. Do not ask the user to retype it.
2. Append an entry under `## Entries` in `<root>/tickets/deferred/index.md` (replace `None yet.` if present), in the format in that file's header. `Found during` links the current ticket.
3. Show the entry written, so a misreading can be corrected.

One observation per entry. Write straight to the list.
