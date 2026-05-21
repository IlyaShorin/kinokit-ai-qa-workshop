# Mobile Overlap Diff Notes

The visual diff should show the booking summary moving upward into the seat map on a mobile viewport.

Why it matters:

- the selected seats block becomes harder to scan;
- the total and booking button compete with the seat grid;
- DOM assertions can still pass because all elements remain present and clickable.

Expected demo flow:

1. Open `/sessions/evening` through `useScenario(page, 'mobile-overlap')`.
2. Select `A2`, `B1` and `C3`.
3. Compare the mobile screenshot from `pnpm test:visual`.

The seeded CSS rule is:

```css
.booking-flow.mobile-overlap-demo .booking-summary {
  margin-block-start: -96px;
  position: relative;
  z-index: 2;
}
```

The manual fix is to remove that mobile-only negative margin rule from `app/globals.css`.
