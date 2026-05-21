# KinoKit AI QA Workshop

Demo repository for the workshop: AI as QA engineer for frontend testing.

KinoKit is a small deterministic cinema booking app. It exists as a workshop artifact, not as a production product: the repository demonstrates how controlled data, semantic UI, Playwright tests, AI instructions, fallback outputs and token reports make agent-assisted QA less vague.

## Run

```bash
pnpm install
pnpm dev
```

Open:

```text
http://127.0.0.1:3000/sessions/evening
```

## Tests

```bash
pnpm workshop:reset
pnpm test:e2e
```

The default E2E suite keeps the livecoding baseline green. It checks the Russian booking UI, including the seat button labels `Место A2, стандарт, 120 ₽, доступно` and `Место B1, VIP, 240 ₽, доступно`.

Named QA scenarios are activated with the `qa-scenario` cookie. Test helpers call `useScenario(page, scenarioName)`, which sets that cookie and opens `/sessions/evening`; do not add a second `page.goto('/sessions/evening')` after it.

Available workshop scenarios:

- `evening` — main `/sessions/evening` happy path.
- `vip-pricing` — A2 standard `120 ₽`, B1 VIP `240 ₽`, expected total `360 ₽`.
- `mobile-overlap` — same booking data with the seeded mobile visual overlap enabled.
- `hydration-mismatch` — placeholder scenario data for the SSR/client mismatch exercise.

## VIP regression workshop step

The product intentionally contains a VIP pricing bug in the named `vip-pricing` scenario. `A2` costs `120 ₽`, `B1` costs `240 ₽`, so the expected total is `360 ₽`; the app currently shows `240 ₽` because `calculateTotal` uses the standard price for every selected seat.

To activate the fallback regression test:

```bash
pnpm workshop:add-vip-test
pnpm test:e2e --grep "VIP"
```

That VIP test should fail before the manual fix. This is expected for the workshop.
After manually changing `features/booking/calculateTotal.ts` to sum actual seat prices, the same VIP test should pass.

## Hydration mismatch workshop step

The repository also contains a controlled SSR/client mismatch scenario.

```bash
pnpm workshop:add-hydration-test
pnpm test:e2e --grep "hydration"
```

That hydration test should fail before the manual fix. The server-rendered probe says `A2`, while the hydrated client state says `B1`.

## Visual check

```bash
pnpm test:visual
```

The visual test covers the mobile booking flow and guards against seat map or summary overlap.
In the current workshop state it is expected to fail because case `02-mobile-overlap` contains a seeded mobile layout bug.
See `cases/02-mobile-overlap/diff-notes.md` for the expected diff and the CSS rule to remove.

## Token report

```bash
pnpm token-meter
```

The report uses fixture JSON files from `cases/**/token-report*.json`; it is not real billing data.
