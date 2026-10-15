# Admin Dashboard

A full-stack admin dashboard built with **Next.js 14 (App Router)**, **MongoDB/Mongoose** and **NextAuth v5**. It lets an administrator log in, view business metrics, and manage users and products (create, search, paginate, edit, delete).

> **Recruiters:** see [INSTRUCTIONS.md](./INSTRUCTIONS.md) for the demo login and a guided tour.

## What the app does

- **Authentication** - credentials login (bcrypt-hashed passwords, JWT sessions). All `/dashboard` routes are protected by middleware and redirect to `/login` when signed out.
- **Dashboard overview** - summary cards, a transactions table, a Recharts chart and a side panel.
- **User management** - searchable, paginated list; add, edit and delete users; admin/active flags.
- **Product management** - searchable, paginated list; add, edit and delete products (price, stock, category, color, size).
- **Server Actions** for all mutations, with form validation and duplicate detection.

## Tech stack

Next.js 14 · React 18 · MongoDB + Mongoose · NextAuth (Auth.js) v5 · bcrypt · Recharts · CSS Modules / Tailwind · Deployed on Vercel

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run seed                 # loads demo users and products
npm run dev
```

Open http://localhost:3000.

## Environment variables

| Variable      | Description                                                                 |
| ------------- | --------------------------------------------------------------------------- |
| `DB_URL`      | MongoDB connection string (a free MongoDB Atlas cluster works), incl. a DB name |
| `AUTH_SECRET` | Random string used to sign sessions. Generate with `openssl rand -base64 32`  |

Set the same two variables in Vercel under **Project Settings -> Environment Variables**, then redeploy.

## Project structure

```
app/
  dashboard/        Protected pages (overview, users, products)
  login/            Login page
  lib/              Mongoose models, data fetching, server actions, DB connection
  (ui)/             Presentational components and CSS modules
auth.js             NextAuth configuration (credentials provider)
middleware.js       Route protection
scripts/seed.mjs    Demo data seeder
```
