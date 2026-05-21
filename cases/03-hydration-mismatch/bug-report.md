# Bug Report: SSR and Client Booking State Mismatch

## Product bug

The controlled `hydration-mismatch` scenario renders different booking state on server and client.

## Steps

1. Open `/sessions/evening`.
2. Set `qa-scenario=hydration-mismatch`.
3. Observe `data-testid="hydration-probe"` after hydration.

## Expected

Probe text remains `SSR и клиент согласованы: A2`.

## Actual

Probe text becomes `Клиентская бронь пересчитана: B1`.

## Regression test

`cases/03-hydration-mismatch/generated-regression.spec.ts`
