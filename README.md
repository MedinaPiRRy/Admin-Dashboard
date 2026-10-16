# Admin Dashboard

A full-stack admin dashboard built with **Next.js 15 (App Router)**, **MongoDB / Mongoose** and **NextAuth v5**. An administrator logs in to see live business metrics and to manage users, products and orders.

> **Recruiters:** open [INSTRUCTIONS.md](./INSTRUCTIONS.md) for the demo login and a step-by-step tour.

## What the app does

| Section | What you can do |
| --- | --- |
| **Login** | Credentials sign-in (bcrypt-hashed passwords, JWT sessions). Every `/dashboard` route is protected by middleware; deactivated users can't sign in. |
| **Dashboard** | Cards for total users, completed revenue and products, each with real week-over-week change; latest transactions; a 7-day orders/revenue chart. Hover a card to flip it for more detail. |
| **Users** | Search (username or email), paginate, add, edit and delete users. Role (admin/client) and active/inactive status. |
| **Products** | Search, paginate, add, edit and delete products. Low-stock items (< 20 units) are flagged. |
| **Transactions** | All orders, searchable by customer and filterable by status (pending / done / cancelled). |
| **Revenue** | Completed revenue per month (chart + table), average order value, pending amount. |
| **Reports** | Inventory by category, low-stock list, admin/client and active/inactive user counts. |
| **Teams** | The workspace administrators. |
| **Settings / Help** | Your account details and a guide to every section. |

All numbers come from MongoDB aggregations; nothing on the dashboard is hard-coded or random.

### Implementation notes

- **Server Actions** handle every create/update/delete. They re-check the session, validate input on the server, and redirect back with an `?error=` / `?success=` code that the page shows as a message.
- Forms use `useFormStatus` for pending states and a confirmation prompt before deleting.
- Lists are sorted (so pagination is stable), escape the search text before building a regex, and use `countDocuments`.
- The Mongoose connection is cached across hot reloads and serverless invocations.
- The seeded `demo_recruiter` account is **read-only** (it can't be edited or deleted) so the public demo can't be locked out. Run `npm run seed` to reset all demo data.

## Tech stack

Next.js 15 · React 19 · MongoDB + Mongoose · NextAuth (Auth.js) v5 beta · bcrypt · Recharts · CSS Modules + Tailwind CSS 4 · deployed on Vercel

## Run locally

Requires Node 20.6+ and a MongoDB database (a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster works).

```bash
npm install
cp .env.example .env.local   # then fill in DB_URL and AUTH_SECRET
npm run seed                 # loads demo users, products and orders
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run lint` (ESLint), `npm run build`, `npm start`.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `DB_URL` | yes | MongoDB connection string, including a database name (e.g. `.../admin-dashboard?retryWrites=true`). |
| `AUTH_SECRET` | yes | Random string used to sign sessions (`openssl rand -base64 32`). |
| `AUTH_URL` | no | Only for local development (`http://localhost:3000/api/auth`). Don't set it on Vercel. |

On Vercel, add `DB_URL` and `AUTH_SECRET` under **Project Settings → Environment Variables** and redeploy. Use the same `DB_URL` that you seeded.

## Seed data

`npm run seed` **deletes** the `users`, `products` and `orders` collections in the database that `DB_URL` points to, then inserts 32 users (7 administrators), 37 products in 8 categories and about 285 orders over the last six months, with generated avatars and product images (`public/avatars`, `public/products`). The data is deterministic, so every run produces the same dataset, but dates are relative to the moment you run it, so **re-run the seed before sharing the demo** if it has been a while (the "last 7 days" widgets look at the real calendar). Don't point it at a database you want to keep.

The data lives in `scripts/sample-data.mjs`; `node scripts/generate-images.mjs` regenerates the SVG images from it.

## Project structure

```
app/
  dashboard/          Protected pages: overview, users, products, transactions,
                      revenue, reports, teams, settings, help
  login/              Login page
  lib/
    actions.js        Server Actions (CRUD + login)
    data.js           Database queries and aggregations
    models.js         Mongoose models (User, Product, Order)
    constants.js      Shared constants and messages
    format.js         Currency / date helpers
    menu.jsx          Sidebar + page-search menu definition
    utils.js          Cached MongoDB connection
  (ui)/               Components and CSS modules
auth.js               NextAuth config (credentials provider)
middleware.js         Route protection
scripts/seed.mjs      Demo data seeder
  sample-data.mjs     The demo users, products and order generator
  generate-images.mjs Generates the SVG avatars / product images in public/
```
