---
name: kinokit-workshop-dod
description: Use inside the KinoKit AI QA Workshop repository when adding or finishing a workshop feature, especially UI changes, and the agent must deliver it to Definition of Done: tests, MSW coverage when relevant, Playwright E2E, visual or screenshot coverage for UI changes, lint, build, commit, push, GitHub PR, and a strict PR_CREATED or BLOCKED final report.
metadata:
  scope: repo
  repository: kinokit-ai-qa-workshop
---

# KinoKit Workshop Definition Of Done

Use this skill only inside the `kinokit-ai-qa-workshop` repository.

This skill is for end-to-end delivery of a workshop feature. It applies when the user asks to add, change, or finish functionality and expects the agent to implement the change, cover it with tests, create a PR, and report in a fixed format.

## Boundary

Before any change, verify the repository:

```bash
pwd
git remote -v
```

Continue only if the working directory is the KinoKit workshop repo and at least one remote points to:

```text
github.com/IlyaShorin/kinokit-ai-qa-workshop
```

If the remote does not match, stop with `BLOCKED`.

## Required Order

If any file is changed, the task is not complete until every required step below is done or the run ends with `BLOCKED`.

1. Read local instructions and project context:

```bash
find .. -name AGENTS.md -o -name CLAUDE.md
sed -n '1,220p' README.md
sed -n '1,220p' package.json
git status --short
git log -n 15 --oneline
```

Do not overwrite unrelated dirty work. If the worktree is already dirty before the task and the ownership is unclear, ask the user before editing or finish as `BLOCKED`.

2. Create a workshop branch before edits when possible.

Use:

```text
workshop/<short-feature-slug>
```

If the user provides a branch name, use it. If local commits already exist on another branch, do not rewrite history without explicit permission.

3. Understand the current app contract.

For booking work, inspect the relevant files before editing:

```text
features/booking/
app/sessions/[sessionId]/
mocks/
tests/e2e/
tests/msw/
tests/visual/
```

Use existing patterns. Do not invent fake JSON reports, fake metrics, or unverifiable demo artifacts.

4. Implement the requested feature.

For UI changes, update the actual user-facing experience, not only tests. Keep the seeded workshop bugs intact unless the task explicitly asks to fix them.

5. Add focused automated coverage.

Choose coverage by change type:

- Business logic: add or update focused unit tests near the changed logic if the project has such tests.
- MSW/API contract: add or update `tests/msw` when handlers, scenarios, or server data contracts change.
- User workflow: add or update Playwright E2E in `tests/e2e`.
- UI/layout/text/visual state: add or update screenshot or visual coverage in `tests/visual`.

For visual changes, a screenshot or visual test is mandatory. Do not claim Done with only lint and E2E.

6. Run required checks.

Always run:

```bash
pnpm lint
pnpm test:msw
pnpm test:e2e
pnpm build
```

Run visual checks for any UI, layout, style, copy, state, or screenshot change:

```bash
pnpm test:visual
```

If a visual diff is intentional, update snapshots with the project's Playwright snapshot update command and run `pnpm test:visual` again.

If `pnpm test:visual` fails because of an unrelated pre-existing seeded workshop bug, prove it with a pre-change baseline or a narrow grep/run. Do not mark it pass. Either fix the requested visual issue, include the intended snapshot update, or finish as `BLOCKED` with the exact failing command.

7. Review the diff.

```bash
git diff --check
git diff --stat
git diff
```

Confirm the diff only contains requested work and required tests/snapshots.

8. Commit in repository style.

Check recent commits first:

```bash
git log -n 15 --oneline
```

Use a concise commit message that matches local style. Do not add co-authorship or AI-generated signatures.

9. Push the branch.

```bash
git push -u origin <branch>
```

10. Create or update a GitHub PR.

Use the GitHub app/tools when available. If they are unavailable, use `gh` only if it is authenticated locally.

The PR body must include:

- what changed;
- what tests were added or updated;
- exact checks run;
- known expected workshop failures, if any, clearly marked as not fixed by this PR.

If a PR URL cannot be produced, finish as `BLOCKED`.

## Completion Format

The final answer must be exactly one of these statuses: `PR_CREATED` or `BLOCKED`.

If `PR_URL` is missing, the status cannot be `PR_CREATED`.

### PR_CREATED

```text
STATUS: PR_CREATED
REPOSITORY: kinokit-ai-qa-workshop
BRANCH: <branch>
TARGET_BRANCH: <target-branch>
COMMIT: <commit-sha>
CHECK_REMOTE: GitHub workshop remote => pass
CHECK_BRANCH: workshop branch => pass
CHECK_DIFF: requested scope only => pass
CHECK_LINT: pnpm lint => pass
CHECK_MSW: pnpm test:msw => pass
CHECK_E2E: pnpm test:e2e => pass
CHECK_VISUAL: <pnpm test:visual or n/a> => pass
CHECK_BUILD: pnpm build => pass
PUSH: origin/<branch> @ <commit-sha>
PR_URL: <full PR link>
SUMMARY:
- <what changed>
- <what tests cover it>
- <what to show during the workshop>
```

### BLOCKED

```text
STATUS: BLOCKED
REPOSITORY: kinokit-ai-qa-workshop
BRANCH: <branch or n/a>
TARGET_BRANCH: <target-branch or n/a>
COMMIT: <commit-sha or n/a>
CHECK_REMOTE: GitHub workshop remote => pass/fail
CHECK_BRANCH: workshop branch => pass/fail/n/a
CHECK_DIFF: requested scope only => pass/fail/n/a
CHECK_LINT: <pnpm lint or n/a> => pass/fail/n/a
CHECK_MSW: <pnpm test:msw or n/a> => pass/fail/n/a
CHECK_E2E: <pnpm test:e2e or n/a> => pass/fail/n/a
CHECK_VISUAL: <pnpm test:visual or n/a> => pass/fail/n/a
CHECK_BUILD: <pnpm build or n/a> => pass/fail/n/a
BLOCKER: <one concrete blocker>
FAILED_COMMAND: <exact command or n/a>
EXIT_CODE: <number or n/a>
STDERR: <short exact stderr excerpt or n/a>
NEXT_USER_ACTION: <what the user must decide or provide>
SUMMARY:
- <what was completed before the blocker>
```
