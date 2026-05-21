# Live Demo

## 1. Baseline

Run:

```bash
pnpm workshop:reset
pnpm dev
pnpm test:msw
pnpm test:e2e
```

Show that the baseline E2E suite passes on `/sessions/evening`.

The booking data comes from the MSW mock API. The helper `useScenario(page, scenarioName)` sets `qa-scenario` and opens `/sessions/evening`. Generated tests should not add another `page.goto('/sessions/evening')` after calling it.

The demo uses Russian UI labels and ruble prices:

- `Место A2, стандарт, 120 ₽, доступно`
- `Место B1, VIP, 240 ₽, доступно`
- `A2` + `B1` should total `360 ₽`

## 2. Chaotic agent

Use `cases/01-vip-pricing/bad.prompt.md`.

Expected fallback output:

`cases/01-vip-pricing/bad-output.md`

## 3. Guided agent

Use `cases/01-vip-pricing/good.prompt.md` and `.ai/skills/playwright-e2e/SKILL.md`.

Expected fallback output:

`cases/01-vip-pricing/good-output.md`

## 4. Regression test

Fallback generated test:

`cases/01-vip-pricing/generated-regression.spec.ts`

To activate it manually:

```bash
pnpm workshop:add-vip-test
pnpm test:e2e --grep "VIP"
```

The test opens the named `vip-pricing` scenario through `useScenario(page, 'vip-pricing')`. The first run should expose the seeded bug: the app shows `240 ₽` instead of `360 ₽`.

## 5. Fix

Manually change `features/booking/calculateTotal.ts` to sum actual seat prices.

Then run:

```bash
pnpm test:e2e --grep "VIP"
```

The VIP regression test should pass after the manual fix.

## 6. Mobile visual check

Run:

```bash
pnpm test:visual
```

This checks the mobile booking flow screenshot from `tests/visual/booking.mobile-overlap.spec.ts`.

The check is expected to fail while the seeded `mobile-overlap` layout bug is present.

The diff should show the booking summary overlapping the seat map after selecting `A2`, `B1` and `C3`. See `cases/02-mobile-overlap/diff-notes.md` for fallback notes.

Fix `app/globals.css` by removing the mobile-only overlap rule for `.booking-flow.mobile-overlap-demo .booking-summary`, then run `pnpm test:visual` again.

## 7. Hydration mismatch

Run:

```bash
pnpm workshop:add-hydration-test
pnpm test:e2e --grep "hydration"
```

The check is expected to fail while the seeded `hydration-mismatch` bug is present. The server-rendered booking state starts with `A2`, but the hydrated client starts with `B1`.

For a live browser demo, run this scenario in production mode with `pnpm build && pnpm start`; `next dev` shows a large framework overlay for real hydration mismatches. Fix `features/booking/BookingFlow.tsx` so the first client render uses the same initial selected seat ids as the server render, then run the hydration test again.

## 8. Codex local usage

Run only if you want to show real local Codex usage for the repository:

```bash
pnpm codex-usage
```

The report reads `~/.codex/sessions` and is not provider billing.
