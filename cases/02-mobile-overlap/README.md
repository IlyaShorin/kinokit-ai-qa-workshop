# Case 02: Mobile Overlap

Visual regression case for the mobile booking flow.

The test opens `/sessions/evening` with scenario `mobile-overlap`, selects `A2`, `B1` and `C3`, then screenshots the booking flow at a mobile viewport.

This case intentionally contains a layout bug. The booking summary overlaps the seat map on mobile only when the `qa-scenario=mobile-overlap` cookie is set.

Run:

```bash
pnpm test:visual
```

The command should fail while the seeded layout bug is present.

Update the baseline only after reviewing the changed image:

```bash
pnpm test:visual --update-snapshots
```

The goal is to catch layout regressions that ordinary DOM assertions can miss:

- seat map and booking summary overlap;
- selected seats text covers the total;
- the booking button is clipped;
- mobile row labels drift away from their seats.

Manual fix for the live demo:

Remove the mobile-only negative margin from `.booking-flow.mobile-overlap-demo .booking-summary` in `app/globals.css`.
After the fix, run `pnpm test:visual` again and the screenshot should match the baseline.

See `diff-notes.md` for the expected screenshot diff and CSS rule to remove.

Files:

- `bad.prompt.md` — vague visual QA request.
- `good.prompt.md` — guided visual QA request.
- `bad-output.md` — shallow result that misses the issue.
- `good-output.md` — useful result that identifies the overlap.
- `bug-report.md` — reproducible report for the layout bug.
- `diff-notes.md` — visual diff fallback notes.
