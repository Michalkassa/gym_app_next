# LockedIn — Fitness Tracker Web App

LockedIn is a full-stack progressive web application designed to help users track workouts and monitor fitness progress over time.

Built with **Next.js and React**, the application allows users to securely log workouts, store fitness data, and visualize progress through interactive charts.

The backend uses **PostgreSQL with Prisma ORM** to manage data, while **NextAuth credential authentication** provides secure user login. Performance is optimized using **server-side rendering and caching**.

## Features

* **Workout & exercise logging** with automatic estimated one-rep-max (Brzycki formula)
* **Exercise library** of 30+ movements tagged by muscle group and equipment
* **Prebuilt programs** (PPL, StrongLifts 5×5, Starting Strength) you can copy into your account in one click
* **Training analytics** — weekly volume trend and a GitHub-style activity heatmap
* **Personal records** page tracking best weight, estimated 1RM and set volume per exercise
* **Nutrition logging** of calories and macros with charts
* **Gamification** — earn XP per set/workout and level up
* **Data export** to CSV and a generated PDF progress report
* **Bodyweight tracking**, PWA support, and a responsive mobile/desktop UI

Validated with a **Vitest** unit-test suite and runnable end-to-end with a single `docker compose up`.

## Tech Stack

* TypeScript
* Next.js
* React
* PostgreSQL
* Prisma ORM
* NextAuth
* Chart.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Run with Docker (recommended)

The whole stack (Next.js app + PostgreSQL) runs with a single command:

```bash
docker compose up --build
```

This builds the app, starts Postgres, applies the Prisma migrations automatically, and serves the app at [http://localhost:3000](http://localhost:3000). Override `AUTH_SECRET` via an `.env` file (see `.env.example`) for anything beyond local use.

## Testing

Unit tests run with [Vitest](https://vitest.dev/):

```bash
npm run test        # run once
npm run test:watch  # watch mode
```

## Getting Started (local, without Docker)

Copy `.env.example` to `.env` and fill in `DATABASE_URL` and `AUTH_SECRET`, then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

After updating prisma tables to actually create the tables in your database, you now can use the following command of the Prisma CLI:

```bash
npx prisma db push
```

For Prisma Studio. Run the following command:

```bash
npx prisma studio
```

Because Prisma Client is tailored to your own schema, you need to update it every time your Prisma schema file is changing by running the following command:

```bash
npx prisma generate
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
