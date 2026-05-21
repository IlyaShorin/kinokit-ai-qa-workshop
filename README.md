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
pnpm test:e2e
```

The default E2E suite contains one active basic booking test. It selects standard seat `A2`, checks total `120 ₽`, books tickets and expects the confirmation.

## VIP regression workshop step

The product intentionally contains a VIP pricing bug. `A2` costs `120 ₽`, `B1` costs `240 ₽`, so the expected total is `360 ₽`; the app currently shows `240 ₽` because `calculateTotal` uses the standard price for every selected seat.

To activate the fallback regression test:

```bash
pnpm workshop:add-vip-test
pnpm test:e2e --grep "VIP"
```

That VIP test should fail before the manual fix. This is expected for the workshop.

## Visual check

```bash
pnpm test:visual
```

The visual test covers the mobile booking flow and guards against seat map or summary overlap.
In the current workshop state it is expected to fail because case `02-mobile-overlap` contains a seeded mobile layout bug.

## Token report

```bash
pnpm token-meter
```

The report uses fixture JSON files from `cases/**/token-report*.json`; it is not real billing data.
