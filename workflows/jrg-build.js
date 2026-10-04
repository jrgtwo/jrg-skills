export const meta = {
  name: 'jrg-build',
  description: 'Build a ticket as one or more tasks, each independently reviewed then fixed',
  whenToUse:
    'Started by the /jrg-build skill for a jrg ticket whose project builds in multi-agent mode.\n\nCOST: about 100k tokens and ~5 minutes per agent. One reviewer = 3 agents per task; two reviewers = 4. Use two for novel or risky work, one for understood work.\n\nAgents never guess at behaviour: an open question stops the task and comes back to the user.',
  phases: [{ title: 'Build' }, { title: 'Review' }, { title: 'Fix' }],
}

/*
 * args: {
 *   repo: string,                               // absolute path of the project's code
 *   house: string,                              // the project's own facts: stack, layout, conventions
 *   verify: string,                             // the command that must pass, e.g. "pnpm test && pnpm build"
 *   tasks: [{ title, label, files, brief }],    // required
 *   reviewers?: 1 | 2,                          // default 1
 *   parallel?: boolean,                         // default false
 *   extraContext?: string,                      // findings researched before launch
 * }
 *
 * Sequential by default: tasks often converge on a shared file, and concurrent fix agents
 * editing one file clobber each other. Parallel only when files are disjoint and no task
 * depends on another's output.
 */

const INPUT = typeof args === 'string' ? JSON.parse(args) : (args ?? {})
const repo = INPUT.repo
const tasks = INPUT.tasks ?? []
const reviewerCount = INPUT.reviewers ?? 1
const runParallel = INPUT.parallel ?? false
const verify = INPUT.verify || "the project's test, typecheck and build commands (see its development notes)"

if (!repo || tasks.length === 0) {
  throw new Error('jrg-build: args.repo and args.tasks are required — received keys [' + Object.keys(INPUT).join(', ') + ']')
}

const HOUSE = [
  'Repo: ' + repo,
  'Read the repo\'s CLAUDE.md (if any) first.',
  '',
  'PROJECT FACTS:',
  INPUT.house || '(none given — read the code and its docs)',
  '',
  'RULES FOR EVERY AGENT:',
  '- Do not run package installs and do not add dependencies.',
  '- Do not run git commands that change state. Read-only git (status, diff, log) is fine.',
  '- Before writing new code, search for something that already does it and reuse it when it fits.',
  "  Don't bend shared code with flags or branching for a new case — write a separate, simple version.",
  '- Comments explain why, never what. Match the surrounding code.',
  '- NEVER GUESS AT BEHAVIOUR. If a requirement is ambiguous in a way that changes what the user',
  '  gets, do not pick an answer: stop that part, and list it under QUESTIONS in your report.',
  '  Mechanical and technical choices you may decide yourself — say what you chose.',
  '- Before finishing, from ' + repo + ':',
  '    ' + verify,
  INPUT.extraContext ? '\nALREADY RESEARCHED FOR YOU:\n' + INPUT.extraContext : '',
].join('\n')

const LENSES = [
  {
    key: 'correctness',
    focus: [
      'LENS: correctness and contracts.',
      '- Does it do what the brief asked, end to end? Trace one concrete case through the code.',
      '- Public surface: anything exported, persisted, or relied on by other code — did a',
      '  signature, type, or behaviour change? Say so explicitly, even when the change is right.',
      '- Arithmetic and edge cases: off-by-ones, empty input, missing data, units, sign errors.',
      '- Did it duplicate something that already existed in the repo?',
    ].join('\n'),
  },
  {
    key: 'reliability',
    focus: [
      'LENS: reliability, and whether the tests could actually fail.',
      '- Lifecycle: listeners, timers, subscriptions and caches released and rebuilt correctly?',
      '- Async ordering and degenerate states (no data, partial data, old saved formats).',
      '- TEST STRENGTH is the main job: for each new test, would it FAIL if the feature broke?',
      '  Mentally mutate the code — flip a sign, drop a guard — and name which test catches it.',
      '  Call out tests that cannot fail and headline behaviour with no coverage.',
    ].join('\n'),
  },
]

const buildPrompt = (task) =>
  [HOUSE, '', 'YOUR TASK:', task.brief, '', 'FILES YOU MAY TOUCH: ' + task.files, '',
    'Report: what you changed, what you VERIFIED rather than assumed, any choice you made yourself,',
    'and QUESTIONS (or "QUESTIONS: none").'].join('\n')

const reviewPrompt = (task, lens) =>
  [HOUSE, '',
    'You are ADVERSARIALLY REVIEWING code someone else just wrote. Do not look for their report —',
    'judge the code as it stands.', '',
    'WHAT THE FEATURE WAS MEANT TO DO:', task.brief, '',
    'FILES IN SCOPE: ' + task.files,
    'Use git diff and git status in ' + repo + ' to see what changed.', '',
    lens.focus, '',
    'Then run, from ' + repo + ': ' + verify, '',
    'DO NOT EDIT ANY FILES. Report only — a separate agent applies fixes.', '',
    'Per finding: SEVERITY (critical/high/medium/low), file and line, what is wrong, a concrete fix.',
    'If a finding depends on what the user wants, put it under QUESTIONS instead.',
    'Finish with the state of ' + verify + '.'].join('\n')

const fixPrompt = (task, reviews) =>
  [HOUSE, '', 'Reviewers examined a just-implemented feature. Apply their findings.', '',
    'WHAT THE FEATURE WAS MEANT TO DO:', task.brief, '', 'FILES IN SCOPE: ' + task.files, '',
    ...reviews.map((r, i) => '=== REVIEWER ' + String.fromCharCode(65 + i) + ' ===\n' + (r || '(no report)') + '\n'),
    'Your job:',
    '1. Fix every finding you agree with — smallest change that does the job.',
    '2. Where a finding looks wrong or reviewers disagree, decide and say why.',
    '3. Strengthen any test flagged as weak or unable to fail.',
    '4. Do not resolve anything listed under QUESTIONS — carry it into your report.',
    '5. Re-run: ' + verify + ' — it must be clean.', '',
    'Report: each finding and its disposition, tests added, final state, and QUESTIONS (or "QUESTIONS: none").'].join('\n')

async function runTask(task) {
  const title = task.title ?? task.label
  const built = await agent(buildPrompt(task), { label: 'build:' + task.label, phase: title })
  log(title + ': built — ' + reviewerCount + ' reviewer(s)')
  const reviews = await parallel(
    LENSES.slice(0, reviewerCount).map((lens) => () =>
      agent(reviewPrompt(task, lens), { label: 'review:' + task.label + ':' + lens.key, phase: title }),
    ),
  )
  const applied = await agent(fixPrompt(task, reviews), { label: 'fix:' + task.label, phase: title })
  log(title + ': reviewed and fixed')
  return { task: task.label, built, reviews, applied }
}

let results
if (runParallel) {
  results = await parallel(tasks.map((task) => () => runTask(task)))
} else {
  results = []
  for (const task of tasks) results.push(await runTask(task))
}

return results
