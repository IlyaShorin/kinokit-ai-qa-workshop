# Bug Report: VIP Pricing

## Product bug

Selecting one standard seat and one VIP seat uses two standard prices in the booking total.

## Steps

1. Open `/sessions/evening`.
2. Select `A2`.
3. Select `B1`.
3. Read the total price.

## Expected

Total price is `360 ₽`.

## Actual

Total price is `240 ₽`.

## Suspected area

`features/booking/calculateTotal.ts`
