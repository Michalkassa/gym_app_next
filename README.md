<div align="center">

<img src="public/logo.png" alt="LockedIn logo" width="84" />

# LockedIn

**A full-stack fitness tracker for logging workouts, tracking strength, and staying on top of your goals.**

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Tested with Vitest](https://img.shields.io/badge/tested_with-Vitest-6E9F18?logo=vitest&logoColor=white)

</div>

<p align="center">
  <img src="docs/screenshots/landing.svg" alt="LockedIn landing page" width="900" />
</p>

LockedIn is a progressive web app built with **Next.js (App Router) and TypeScript**. Workouts and progress are stored in **PostgreSQL via Prisma**, auth is handled by **NextAuth**, and the whole stack runs with a single `docker compose up`.

> The previews below are stylised SVG mockups of the interface (same dark theme, layout and palette as the running app).

---

## Features

### Dashboard
Everything at a glance — quick actions, your bodyweight trend, most-trained exercises, weekly volume, and a GitHub-style activity heatmap that rolls to today.

<p align="center"><img src="docs/screenshots/dashboard.svg" alt="Dashboard" width="900" /></p>

### Workouts and a live set tracker
Build workouts from your exercises and run a live session that records each set, shows your previous numbers, and awards XP when you finish.

<p align="center"><img src="docs/screenshots/live-workout.svg" alt="Live workout tracker" width="900" /></p>

### Exercises and automatic 1RM
Log weight × reps and LockedIn estimates your one-rep max (Brzycki formula) and charts it over time. Pick from a built-in library of 30+ exercises tagged by muscle group, or add your own.

<p align="center"><img src="docs/screenshots/exercise.svg" alt="Exercise detail with 1RM chart" width="900" /></p>

### Prebuilt programs
Start from proven programs — Push/Pull/Legs, StrongLifts 5×5, Starting Strength — and copy them into your account in one click.

<p align="center"><img src="docs/screenshots/programs.svg" alt="Programs" width="900" /></p>

### Personal records and data export
Track your best weight, estimated 1RM and set volume per exercise, and export everything to CSV or a generated PDF progress report.

<p align="center"><img src="docs/screenshots/records.svg" alt="Personal records" width="900" /></p>

### Nutrition with daily goals
Set a daily calorie & macro goal, log meals (enter calories or auto-calculate them from macros), and see what's remaining for the day.

<p align="center"><img src="docs/screenshots/nutrition.svg" alt="Nutrition tracking" width="900" /></p>

### Activity heatmap and gamification
A full trailing-year contribution graph (with a year selector for history) plus an XP/level system that rewards consistency.

<p align="center"><img src="docs/screenshots/heatmap.svg" alt="Activity heatmap" width="820" /></p>

---

## Tech stack

| Layer | Tech |
|------|------|
| Framework | Next.js 14 (App Router, Server Actions) · React 18 · TypeScript |
| Database | PostgreSQL · Prisma ORM |
| Auth | NextAuth (credentials, bcrypt) |
| UI | Tailwind CSS · MUI Joy · React Icons |
| Charts | Chart.js · custom contribution heatmap |
| Validation | Zod |
| PDF / export | @react-pdf/renderer · CSV |
| Testing | Vitest |
| Tooling | Docker · docker-compose |

---

## Getting started

### Option A — Docker (recommended)

Runs the app **and** PostgreSQL, applies migrations, and seeds the exercise library + programs automatically:

```bash
docker compose up --build
```

Then open **http://localhost:3000**. Set `AUTH_SECRET` via an `.env` file (see `.env.example`) for anything beyond local use — generate one with `openssl rand -base64 32`.

### Option B — Local

```bash
cp .env.example .env          # set DATABASE_URL and AUTH_SECRET
npm install
npx prisma migrate deploy     # create the tables
npm run seed                  # load the exercise library + programs
npm run dev
```

---

## Testing

Unit tests (1RM math, validation, analytics, XP, nutrition, CSV) run with [Vitest](https://vitest.dev/):

```bash
npm run test          # run once
npm run test:watch    # watch mode
```

---

## Screenshots

The previews above are stylised SVG mockups in [`docs/screenshots/`](docs/screenshots). To swap in real screenshots of your running instance, see that folder's README for the filenames and a capture guide.
