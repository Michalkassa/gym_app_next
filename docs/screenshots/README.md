# Screenshots

The main `README.md` shows stylised **SVG mockups** of the interface (same dark
theme, layout and palette as the running app) so the README looks complete
without needing a live capture:

`landing.svg · dashboard.svg · live-workout.svg · exercise.svg · programs.svg · records.svg · nutrition.svg · heatmap.svg`

## Swapping in real screenshots

Prefer real captures? Save PNGs and point the README at them (change the `.svg`
references to `.png`). Suggested mapping:

| File | Page / what to capture |
|------|------------------------|
| `landing.png` | `/` — the public landing/hero page |
| `dashboard.png` | `/dashboard` |
| `live-workout.png` | `/dashboard/runningworkout/<id>` — mid-workout |
| `exercise.png` | `/dashboard/exercises/<id>` — 1RM chart + logs |
| `programs.png` | `/dashboard/programs` |
| `records.png` | `/dashboard/records` |
| `nutrition.png` | `/dashboard/nutrition` |
| `heatmap.png` | the activity heatmap (crop from the dashboard) |

### Capture tips

1. Log in with an account that has **some data** (log a few workouts and a
   nutrition entry first, or run `npm run seed` for the exercise library).
2. Use your browser's device toolbar at a fixed width (~1280px desktop looks
   good; grab a couple at phone width to show responsiveness).
3. Save as PNG and downscale to ~900–1400px wide to keep the repo light.
