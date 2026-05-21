# Bug Report: SSR and Client Booking State Mismatch

## Product bug

The controlled `hydration-mismatch` scenario renders different selected seats on the server and on the hydrated client.

## Steps

1. Open `/sessions/evening`.
2. Set `qa-scenario=hydration-mismatch`.
3. Compare the server-rendered expected state and the hydrated browser state.

## Expected

The selected seats summary remains `A2`, and the `A2` seat button remains pressed after hydration.

## Actual

The selected seats summary becomes `B1`, and the `B1` seat button is pressed after hydration.

## Regression test

`cases/03-hydration-mismatch/generated-regression.spec.ts`
