---
name: jrg-projects
description: Manage the projects in your jrg hub
when_to_use: Use when the user wants to see which projects are in their jrg hub and where each lives on this machine, add or remove a folder where they keep projects, rescan, link a project to a folder, register a repo, create a project that has no repo yet, re-link a project whose remote changed, or archive, unarchive or remove a project.
argument-hint: "[archived | all | scan | new | add <folder> | link <project> <path> | register | relink | archive | unarchive | remove]"
---

# Hub projects

Hub: `${user_config.hub_path}` · Plugin: `${CLAUDE_PLUGIN_ROOT}`

$ARGUMENTS

Everything here goes through the `jrg-hub` helper (or `python3 ${CLAUDE_PLUGIN_ROOT}/bin/jrg-hub` if it isn't on the PATH), always with `--hub <hub>`. If the header shows no hub (empty, or a literal `${…}`), say there is no hub configured and that `/jrg-start` sets one up; stop.

The helper writes only inside the hub: `projects.json` and `private/` for the project list, and the gitignored `.local/paths.json` for this machine's folders and paths.

## Listing

- **No argument** → `jrg-hub list` (active projects). **`archived`** → `jrg-hub list --archived`. **`all`** → `jrg-hub list --all`.
- Show a short table: project, 🔒 if private, its path on this machine (or "not on this machine"), and "new — no repo yet" for projects without one. Then this machine's project folders (`locations`). Nothing else.

## Actions

| Ask | Run | Then |
| --- | --- | --- |
| **add** a folder where projects live | `jrg-hub location add <folder>`, then `jrg-hub scan` | Report what was linked |
| **stop scanning** a folder | `jrg-hub location remove <folder>` | Confirm |
| **scan** / rescan | `jrg-hub scan` | Report: projects linked, projects not on this machine, and git repos found that aren't in the hub (one line each; offer to register any of them) |
| **link** a project to a folder (one-off, without adding its parent folder) | `jrg-hub set-path --name <project> --path <path>` | Confirm |
| **register** a repo | Ask its name (suggest the folder name). Check `jrg-hub visibility --path <path>` and `--self` (ask and `--set` if unknown); a private project in a public hub always goes in `private/` — say so, and ask its stats setting. `jrg-hub register --path <path> --name <name> [--private --stats <choice>]` | Say the project's notes will be set up the first time `/jrg-start` runs in it |
| **relink** a project whose remote changed (renamed, transferred, now a fork) | `jrg-hub relink --name <project> --path <path to the repo>` | Report the old and new identity |
| **new** project with no repo yet | Ask its name and whether it's private; `jrg-hub new --name <name> [--private]`; copy the scaffold into its root as [setup](../jrg-start/setup.md) does for a hub root; run the status command from the output | Offer `/jrg-plan` to start its first initiative as a plan. When its repo exists, `/jrg-start` in it matches by folder name and links it |
| **make private** — move a project out of the public part of the hub | `jrg-hub make-private --name <project>` | Say that what was already pushed stays in the hub's git history |
| **archive** a project | `jrg-hub archive --name <project>` | Its notes stay; it leaves the active list, `/jrg-start`'s picker and current stats |
| **unarchive** | `jrg-hub unarchive --name <project>` | Confirm |
| **remove** a project | Ask first — **this deletes the project's hub folder**; a private project only on this machine. Suggest archive instead if they only want it out of the list. On a yes: `jrg-hub remove --name <project> --yes` | Confirm what was deleted |

For a private project the hub stores its stats setting (`--stats hidden | aggregated | anonymous`, default aggregated) — how it appears on stats pages pushed with the hub. Ask only when registering a private project.

A folder with no git can be registered too; its identity is just its name, so on every other machine it is linked with **link**.
