# Case 03: Hydration Mismatch

SSR/client mismatch exercise.

The app intentionally renders different booking state on the server and on the first client render when `qa-scenario=hydration-mismatch` is set.

Seeded bug:

- server-rendered text: `SSR и клиент согласованы: A2`;
- client-rendered text: `Клиентская бронь пересчитана: B1`.

This simulates a frontend QA problem where DOM-only happy path checks can pass, but the browser console and hydrated UI expose inconsistent SSR/client state.

To activate the regression test:

```bash
pnpm workshop:add-hydration-test
pnpm test:e2e --grep "hydration"
```

The test should fail while the seeded bug is present.

Manual fix for the live demo:

Change `features/booking/HydrationMismatchProbe.tsx` so the first client render matches the server-rendered value, or move client-only recalculation into an effect after hydration with explicit loading/state handling.
