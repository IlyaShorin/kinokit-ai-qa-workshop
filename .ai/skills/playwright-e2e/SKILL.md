# Playwright E2E Skill

Use this skill when an AI agent needs to create or update E2E tests for KinoKit.

## Rules

- Use `@playwright/test`.
- Prefer semantic locators: `getByRole`, `getByLabel`, `getByText`.
- Use `data-testid` only when semantic locators are not enough.
- Do not use CSS selectors for user-facing UI.
- Do not use `page.waitForTimeout`.
- Use `useScenario(page, scenarioName)` when a test needs a named scenario.
- Assert user-visible behavior.
- Classify failures before changing product code.
- Never weaken assertions just to make a test pass.
- Keep the test focused on one booking invariant.
- Do not activate workshop fallback tests unless the task explicitly asks for it.
- Do not use screenshots for the first VIP pricing case.

## Failure classification

- product bug
- test bug
- testability issue
- unclear requirement
- mock or environment issue

## Booking invariants

- Standard seats cost `120 ₽`.
- VIP seats cost `240 ₽`.
- Occupied seats cannot be selected.
- Booking confirmation must list selected seat ids.

## Good path

Use `examples/good-booking.spec.ts` as the model for stable tests.

## Bad path

Use `examples/bad-booking.spec.ts` as the workshop contrast example.
