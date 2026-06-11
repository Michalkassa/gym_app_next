# Screenshots

The main `README.md` references the images below. Drop PNGs with these exact
names into this folder and they'll render automatically.

| File | Page / what to capture |
|------|------------------------|
| `landing.png` | `/` — the public landing/hero page |
| `dashboard.png` | `/dashboard` — quick actions, bodyweight chart, popular exercises, weekly volume + heatmap |
| `live-workout.png` | `/dashboard/runningworkout/<id>` — the live set tracker mid-workout |
| `exercise.png` | `/dashboard/exercises/<id>` — an exercise with its 1RM chart and logs |
| `programs.png` | `/dashboard/programs` — the prebuilt programs grid |
| `records.png` | `/dashboard/records` — personal records table + export buttons |
| `nutrition.png` | `/dashboard/nutrition` — the daily goal card with macros remaining |
| `heatmap.png` | the activity heatmap (crop from the dashboard) |

## Tips for clean, consistent shots

1. Run the app and log in with an account that has **some data** (log a few
   workouts and a nutrition entry first, or run `npm run seed` for the library).
2. Use your browser's device toolbar (Chrome DevTools → toggle device, or
   responsive mode) at a fixed width — **~1280px** desktop looks good; grab a
   couple at phone width (~390px) too if you want to show responsiveness.
3. Capture as **PNG**, then optionally downscale to ~900–1400px wide to keep the
   repo light.
4. The app is a dark theme, so screenshots sit nicely on GitHub's dark and light
   readme backgrounds.
