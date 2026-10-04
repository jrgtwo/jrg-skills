---
name: jrg-build
description: Build the current ticket with agents — each part built, reviewed and fixed
when_to_use: Use to implement the current jrg ticket with the multi-agent workflow (build, independent adversarial review, fix), or when a ticket starts and its project builds in multi-agent mode. Also when the user says "use the multi-agent workflow" or "build this with agents".
argument-hint: "[extra guidance for this run]"
---

# Build with agents

Hub: `${user_config.hub_path}` · Plugin: `${CLAUDE_PLUGIN_ROOT}`

**First, find the project root:** follow `${CLAUDE_PLUGIN_ROOT}/skills/jrg-start/root.md`, and use the root, status command, templates folder and workflow file it gives. If you write to a hub, finish with its **Hub sync** step.

$ARGUMENTS

Builds the session's current ticket through `${CLAUDE_PLUGIN_ROOT}/workflows/jrg-build.js`: each part is **built → independently reviewed → fixed**. If there is no current ticket, say so and suggest `/jrg-start`.

## 0. Open questions first

Before anything else, check for questions that change what the user gets:

- the plan's `decisions.md` entries with `Status: open` whose `Blocks` names this ticket;
- anything in the ticket's outcome or acceptance criteria you would otherwise have to guess.

If there are any, ask them now — the workflow file's Decision questions rules apply (plain terms, count up front, one at a time, record answers as given) — and **stop**. Build only once none remain. Technical choices you settle yourself, saying what you chose.

## 1. Decompose into tasks

One task per coherent part of the ticket. For each: `title` (short), `label` (kebab-case), `files` (what it may touch, new ones marked `(new)`), and `brief` (what to build, what to reuse, what to test, anything the agent must not assume). **Merge before you split** — a part with no risk of its own belongs in its neighbour's brief; every task is 3–4 agents.

## 2. Research, then pass findings as `extraContext`

Do this yourself before launching, so agents don't all re-read the same files or get briefed on something false: does this already exist in the repo (check shared folders, not just the feature folder)? What's exported or relied on elsewhere? Put the answers in `extraContext` as findings.

## 3. House facts and verify command

- `house`: the project's facts agents need — stack, layout, conventions, gotchas — from `<root>/knowledge/` (architecture, technical, development) and the repo's `CLAUDE.md`. Short; facts, not instructions.
- `verify`: the command that must pass. Use the `Verify:` line in `<root>/tickets/index.md`; if there isn't one, find it in `<root>/knowledge/development.md` or the repo's scripts, confirm it with the user once, and add the line.

## 4. Say the cost, then launch

About **100k tokens and ~5 minutes per agent**; one reviewer = 3 agents per task, two = 4. Use `reviewers: 2` for novel or risky work, `1` otherwise. `parallel: false` unless every task's files are disjoint and none depends on another. Tell the user the tasks, reviewers and rough cost, then:

```
Workflow({
  scriptPath: '${CLAUDE_PLUGIN_ROOT}/workflows/jrg-build.js',
  args: { repo: '<project folder>', house: '...', verify: '...', tasks: [...], reviewers: 1, parallel: false, extraContext: '...' },
})
```

Pass `args` as a real object. If a run dies part-way, relaunch with the same `scriptPath` and **identical** `args` plus `resumeFromRunId` — finished agents replay from cache.

## 5. When it lands

1. **Questions.** Collect every QUESTIONS entry from the reports. If any, present them to the user (as in step 0), record them in the ticket's `Notes and blockers`, and **stop** — don't mark anything done.
2. **Verify yourself** — don't trust the reports: run the verify command and read the diff (`git diff --stat`, then the changes).
3. **Report** what the reviews actually caught, in a few lines.
4. **Update the ticket** as `/jrg-ticket` does (evidence for the acceptance criteria it met, `Next:`), and run the status command.
