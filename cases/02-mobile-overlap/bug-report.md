# Bug Report: Mobile Booking Summary Overlap

## Product bug

On mobile viewport, the booking summary overlaps the seat map in the controlled `mobile-overlap` scenario.

## Steps

1. Open `/sessions/evening`.
2. Set `qa-scenario=mobile-overlap`.
3. Use viewport `390x844`.
4. Select `A2`, `B1` and `C3`.

## Expected

Seat map and booking summary are separated and fully readable.

## Actual

Booking summary moves upward and overlaps the bottom of the seat map.

## Regression test

`tests/visual/booking.mobile-overlap.spec.ts`
