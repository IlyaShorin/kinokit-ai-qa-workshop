# Case 03: Hydration Mismatch

SSR/client mismatch exercise.

The app intentionally renders different booking state on the server and on the hydrated client when `qa-scenario=hydration-mismatch` is set.

Seeded bug:

- server-rendered booking state selects `A2`;
- hydrated client booking state selects `B1`.

This simulates a frontend QA problem where the HTML sent by SSR and the first client render disagree. In `next dev`, Next.js shows a large hydration error overlay. For the live workshop demo, run this case in production mode with `pnpm build && pnpm start`; production mode does not show the dev overlay, so a shallow page check can miss the SSR/client mismatch.

To activate the regression test:

```bash
pnpm workshop:add-hydration-test
pnpm test:e2e --grep "hydration"
```

The test should fail while the seeded bug is present.

Manual fix for the live demo:

Change `features/booking/BookingFlow.tsx` so the server render and first client render use the same initial selected seat ids.
