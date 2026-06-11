# LockedIn — Improvement Roadmap (CV-focused)

## Context

LockedIn is a working full-stack fitness tracker (Next.js 14 App Router, TypeScript, Prisma/PostgreSQL, NextAuth credentials, Chart.js/Tremor, Tailwind, MUI Joy, PWA). It already supports auth, bodyweight tracking, exercises + logs with auto 1RM, workout building, a live workout flow, and per-exercise progress charts.

The goal is to make the project noticeably more impressive on a CV. The user reviewed 20 feature questions and chose a concrete set, and asked that the work be sequenced **engineering-quality-first**, then layer features. This plan reflects exactly those selections (AI, OAuth, CI/CD, leaderboards, dark mode, wearables, and advanced rest timer were explicitly declined).

### Selected scope
- **Engineering foundation first:** unit tests, Docker + docker-compose, fix latent bugs, introduce zod validation, basic accessibility.
- **Features:** prebuilt workout programs, exercise library tagged by muscle group, workout template sharing, PR history page, volume & frequency analytics, activity heatmap, calorie/macro nutrition logging, XP & levels, progress photos (upload + compare), CSV + PDF export.

### Existing patterns to reuse (do not reinvent)
- Server actions: `src/app/api/auth/actions.ts` (add new ones here or split into feature files following the same `"use server"` + `auth()` + `revalidatePath` shape).
- `oneRepMaxCalculator` (Brzycki) in `actions.ts` — reuse for PR/analytics.
- Prisma singleton: `src/app/api/prisma.ts`.
- Session gate: `const session = await auth(); if (!session) redirect(...)` in every page.
- Forms: `useFormState` + server action returning `{message, valid}` (see `src/components/Logs/AddLog.tsx`), `Modal` component, Tremor/Chart.js `LineChart`.
- Types in `src/Props.ts`.

---

## Phase 0 — Engineering quality (do first)

**Bug fixes (high value, low effort):**
- `src/app/api/auth/auth.ts` and `actions.ts`: `bcrypt.compare(...)` is used **without `await`**, so it returns a truthy Promise and password validation always passes. Add `await`. (Security correctness — great to mention in README/commit.)
- `actions.ts`: every `revalidatePath("/dasboard/...")` is misspelled (`dasboard`) so cache never revalidates. Fix to `/dashboard/...`. This alone fixes stale-data UX across the app.

**Tooling:**
- Add **Vitest** + `@testing-library/react`. Scripts: `test`, `test:watch`. Config `vitest.config.ts` with path alias `@/`.
- First tests (pure logic, no DB needed): `oneRepMaxCalculator` (Brzycki edge cases), new zod validation schemas, and any new pure helpers (XP/level math, volume aggregation, CSV serialization).
- Introduce **zod** (already a dependency) — create `src/lib/validation.ts` with schemas for register/login, add-log, add-exercise, add-workout, bodyweight, nutrition. Replace the hand-rolled `if (!x)` chains in `actions.ts` with `schema.safeParse`, returning the existing `{message}` shape so UI is unchanged.
- **Docker:** `Dockerfile` (multi-stage: deps → build → runner, Next.js standalone output via `next.config.mjs` `output: "standalone"`) and `docker-compose.yml` (app + `postgres:16`, volume, `DATABASE_URL`/`AUTH_SECRET` env). Add `.dockerignore`. Document `docker compose up` one-command setup in README.
- **Basic a11y:** add `<label htmlFor>`/`aria-label` to inputs (forms currently rely on placeholders), `alt` text on images (`logo.png`, `blankUserImage.webp`), and check button contrast. Lightweight pass, no framework.

Critical files: `src/app/api/auth/auth.ts`, `src/app/api/auth/actions.ts`, `next.config.mjs`, `package.json`, new `vitest.config.ts`, `src/lib/validation.ts`, `Dockerfile`, `docker-compose.yml`, `README.md`.

---

## Phase 1 — Exercise library + muscle groups (foundational for analytics)

- Schema (`prisma/schema.prisma`): add `muscleGroup String?` and `equipment String?` to `Exercise`. Add a seedable global catalog so users pick from real exercises instead of typing.
  - Add model `ExerciseCatalog { id, name, muscleGroup, equipment, instructions }` (global, not user-scoped).
- Seed script `prisma/seed.ts` (wire `prisma.seed` in package.json) populating ~40 common exercises with muscle groups (chest/back/legs/shoulders/arms/core) and equipment.
- Update `AddExercise` to let users search/pick a catalog exercise (prefilling name + muscleGroup) or enter a custom one. Reuse `react-select` (already installed).
- Migration via `npx prisma migrate dev`.

Critical files: `prisma/schema.prisma`, `prisma/seed.ts`, `src/components/Exercises/AddExercise.tsx`, `actions.ts`.

---

## Phase 2 — Prebuilt programs + workout template sharing

- Schema: add `isTemplate Boolean @default(false)` and `isPublic Boolean @default(false)` to `Workout`. Prebuilt programs are seeded public templates (PPL, StrongLifts 5x5, Starting Strength) with their `ExercisesOnWorkouts` rows referencing catalog-derived exercises.
- New action `copyWorkoutTemplate(workoutId)` — clones a template Workout (+ its exercise pairs) into the current user's account. Reuse existing `addWorkout`/`addExerciseToWorkout` logic.
- UI: a "Programs / Templates" browse view (extend `src/components/Workouts/`) listing public templates with a "Use this program" button.

Critical files: `prisma/schema.prisma`, `prisma/seed.ts`, `actions.ts`, `src/components/Workouts/*`, new route under `src/app/(dashboard)/dashboard/`.

---

## Phase 3 — Analytics, PR history, activity heatmap

All derivable from existing `Log`/`Workout` `createdAt` — no schema changes required.
- **PR history page**: new route `dashboard/records`. Action computes, per exercise, best weight / best 1RM / best volume(weight×reps) and the date achieved, from `Log`. Display as a sortable list. Reuse `oneRepMaxCalculator`.
- **Volume & frequency analytics**: new section on dashboard. Helpers (unit-tested) aggregate total volume per week and workout frequency. Render with Tremor charts (already installed `@tremor/react`).
- **Activity heatmap**: GitHub-style calendar of workout days from log/workout dates. Build a small `ActivityHeatmap` component (grid of day cells colored by activity count) — no new dependency needed.

Critical files: new `src/app/(dashboard)/dashboard/records/page.tsx`, new analytics + heatmap components, `actions.ts`, `src/lib/analytics.ts` (pure, tested).

---

## Phase 4 — Nutrition (calories & macros) + XP/levels

- **Nutrition** schema: `model NutritionEntry { id, date, calories Int, protein Float, carbs Float, fat Float, authorId, createdAt }` + relation on `User`. Actions: add/list/delete. New route `dashboard/nutrition` with a daily entry form (reuse `useFormState`/`Modal`) and a Tremor chart of calories/macros over time alongside bodyweight.
- **XP & levels** schema: add `xp Int @default(0)` to `User`. Award XP in existing log/workout creation actions (e.g. +X per logged set, bonus per workout / new PR). Level is derived from XP via a pure `levelFromXp(xp)` helper (unit-tested). Show level + progress bar in the dashboard navbar (`DashboardNavbar.tsx`).

Critical files: `prisma/schema.prisma`, `actions.ts`, new `src/app/(dashboard)/dashboard/nutrition/*`, `src/lib/xp.ts`, `src/components/DashboardNavbar.tsx`.

---

## Phase 5 — Progress photos + data export

- **Progress photos**: `model ProgressPhoto { id, url, note, authorId, createdAt }`. Use **Vercel Blob** (`@vercel/blob`, fits existing Vercel/Postgres stack) for uploads; fallback note for local/Docker = store under a mounted volume. New route `dashboard/photos`: upload + a before/after comparison view (two selectable photos side by side).
- **Export**:
  - CSV: pure serializer (unit-tested) → `Response` download of logs/workouts/bodyweight/nutrition.
  - PDF: add `@react-pdf/renderer`; generate a progress summary report (PRs, volume trend, bodyweight change) as a downloadable PDF.

Critical files: `prisma/schema.prisma`, new `dashboard/photos/*`, `src/lib/export/csv.ts`, `src/lib/export/pdf.tsx`, `actions.ts`.

---

## Verification

- **Unit tests:** `npm run test` — green for `oneRepMaxCalculator`, zod schemas, `levelFromXp`, volume aggregation, CSV serializer.
- **Bug fixes:** confirm login rejects a wrong password (was previously accepted due to missing `await`); after adding a log, the exercise page updates without manual refresh (revalidatePath fix).
- **Docker:** `docker compose up` brings up app + Postgres; app reachable at `http://localhost:3000`; `prisma migrate` + `seed` run cleanly.
- **Feature smoke test (manual, logged in):** seed catalog → add exercise from library → start a prebuilt program via "Use this program" → log sets → see new PR on records page, volume/frequency charts and heatmap populate → add nutrition entry → XP/level increments → upload two progress photos and compare → export CSV and PDF.
- **a11y:** keyboard-tab through forms; inputs have labels; images have alt text.

## Notes / decisions
- Build in the phase order above (engineering quality first per user). Phases 1→2→3 are sequential (catalog → programs → analytics); 4 and 5 are independent and can be reordered.
- Keep new server actions in the established `"use server"` + `auth()` + `revalidatePath` style; consider splitting `actions.ts` per feature (`actions/nutrition.ts`, etc.) since it is already large.
- Recommend squashing the noisy `test`/`debug` commit history (or at least using clear conventional-commit messages going forward) so the repo reads well to reviewers.

---

## 20 feature questions & user selections (decision record)

1. AI feature → **No AI**
2. Social/community → **Workout sharing/templates**
3. Gamification → **XP & levels**
4. Nutrition → **Calorie & macro logging**
5. PR tracking → **PR history page**
6. Workout programs/templates → **Prebuilt programs**
7. Exercise library → **Library + muscle groups**
8. Rest timer → **Leave timer as-is**
9. Analytics → **Volume & frequency**
10. Progress photos → **Upload + compare**
11. Data export → **Both CSV + PDF**
12. Calendar/history → **Activity heatmap**
13. Testing → **Unit only**
14. CI/CD → **No CI/CD**
15. OAuth → **No OAuth**
16. DevOps → **Docker + compose**
17. Dark mode → **No dark mode**
18. Accessibility → **Basic improvements**
19. Wearables → **Skip integrations**
20. Priority → **Engineering quality first**
