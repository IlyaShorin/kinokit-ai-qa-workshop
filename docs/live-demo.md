# Live Demo

## 1. Baseline

Run:

```bash
pnpm dev
pnpm test:e2e
```

Show that the basic booking happy path passes.

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

The first run should expose the seeded bug.

## 5. Fix

Manually change `features/booking/calculateTotal.ts` to sum actual seat prices.

Then run:

```bash
pnpm test:e2e --grep "VIP"
```

The VIP regression test should pass after the manual fix.

## 6. Token report

Run:

```bash
pnpm token-meter
```

## 7. Mobile visual check

Run:

```bash
pnpm test:visual
```

This checks the mobile booking flow screenshot from `tests/visual/booking.mobile-overlap.spec.ts`.

The check is expected to fail while the seeded `mobile-overlap` layout bug is present.

Fix `app/globals.css` by removing the mobile-only overlap rule for `.booking-flow.mobile-overlap-demo .booking-summary`, then run `pnpm test:visual` again.
