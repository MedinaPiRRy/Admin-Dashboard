# How to use the app

## 1. Log in

Go to the live demo (the Vercel URL on the repo page) and sign in with the demo account:

| Field    | Value            |
| -------- | ---------------- |
| Username | `demo_recruiter` |
| Password | `Demo1234!`      |

This is a sample account with fake data, created for reviewing the project. Other seeded users (e.g. `john_doe`, `daniel_medina`) use the same password.

## 2. Take the tour

**Dashboard** - after login you land on the overview: summary cards, recent transactions and a chart. (Card figures are randomly generated sample numbers.)

**Users** (sidebar -> Users)
- Search by username with the search box; results are paginated 5 per page.
- Click **Add New** to create a user (passwords must match; duplicate usernames/emails are rejected).
- Click **View** on a row to edit a user; leave the password blank to keep it unchanged.
- Click **Delete** to remove a user.

**Products** (sidebar -> Products)
- Search by title and page through results.
- **Add New** creates a product; **View** edits it; **Delete** removes it.

**Log out** from the sidebar when finished.

## 3. Run it yourself

1. `npm install`
2. `cp .env.example .env.local` and set `DB_URL` (MongoDB URI) and `AUTH_SECRET`.
3. `npm run seed` - inserts sample users and products (this **clears** the `users` and `products` collections first).
4. `npm run dev` and open http://localhost:3000.

## 4. Deploying to Vercel

1. Add `DB_URL` and `AUTH_SECRET` under Project Settings -> Environment Variables (all environments).
2. In MongoDB Atlas, allow network access from anywhere (`0.0.0.0/0`) so Vercel's dynamic IPs can connect.
3. Run `npm run seed` once locally with `DB_URL` pointing at the same database to create the demo data.
4. Redeploy.

## Troubleshooting

- **Login says "Wrong credentials" or errors** - check `DB_URL` and `AUTH_SECRET` in Vercel, that you ran the seed against that same database, and the Atlas IP allowlist.
- **Seed script can't connect** - confirm `.env.local` has a valid `DB_URL`.
