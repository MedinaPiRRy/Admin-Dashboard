# How to use the app

## 1. Log in

Open the live demo (the Vercel link on the repo page) and sign in:

| Field    | Value            |
| -------- | ---------------- |
| Username | `demo_recruiter` |
| Password | `Demo1234!`      |

This is a sample account with fake data, created for reviewing the project. The login page also shows these credentials. Other seeded users (e.g. `john_doe`, `leah_akai`) use the same password; `miguel_angel` and `aleks_manov` are *inactive* and can't sign in.

The `demo_recruiter` account is **read-only**: it can't be edited, deactivated or deleted, so the demo always stays usable. Everything else can be changed freely.

## 2. Guided tour (about 5 minutes)

1. **Dashboard** - Three cards show total users, completed revenue and products, with real week-over-week change. *Hover a card* to flip it for more detail. Below are the latest transactions and a chart of orders and revenue for the last 7 days.
2. **Users** (sidebar → Users)
   - Type in the search box to filter by username or email; the list shows 5 per page, so use **Next / Previous**.
   - Click **Add New**, fill in the form (password at least 8 characters, both password fields must match) and submit. Try submitting a mismatching password or an existing username to see the error messages.
   - Click **View** on the new user, change *Is Active?* to NO (or the role) and **Update**. A "Changes saved" message confirms it; the list now shows the user as Inactive.
   - Click **Delete** and confirm. (Deleting `demo_recruiter` is blocked on purpose.)
3. **Products** (sidebar → Products)
   - Search by title, add a product, then **View** it and set its stock to `0` or a low number. Products under 20 units show a ⚠ warning.
   - Delete the test product.
4. **Transactions** - Filter orders by *Pending / Done / Cancelled* and search by customer name.
5. **Revenue** - Completed revenue per month as a chart and table, plus average order value.
6. **Reports** - Inventory value by category, the low-stock list (the product you just edited appears here if its stock is low), and user counts.
7. **Teams** - The administrators of the workspace; click a name to open their user record.
8. **Settings / Help** - Your account details and a guide to every section.
9. **Page search** (top right) - Type a page name, e.g. "rev", and press Enter or click a suggestion to jump to it.
10. **Logout** (bottom of the sidebar). Try opening `/dashboard` again: you're sent back to the login page.

## 3. Run it yourself

1. `npm install`
2. `cp .env.example .env.local` and set `DB_URL` (MongoDB URI incl. database name) and `AUTH_SECRET`.
3. `npm run seed` - inserts the sample users, products and orders. This **clears** the `users`, `products` and `orders` collections first.
4. `npm run dev` and open http://localhost:3000.

## 4. Deploying to Vercel

1. Add `DB_URL` and `AUTH_SECRET` under Project Settings → Environment Variables (no surrounding quotes), then redeploy.
2. In MongoDB Atlas, allow network access from anywhere (`0.0.0.0/0`) so Vercel's changing IPs can connect.
3. Run `npm run seed` once from your machine with `DB_URL` pointing at the same database.

To reset the demo data at any time, run `npm run seed` again.

## Troubleshooting

- **"Wrong credentials"** - Check you ran the seed against the same database as the deployment's `DB_URL` (the database name must match), and that the user is active.
- **"Something went wrong" on login or pages** - Look at the Vercel runtime logs. `bad auth` means the username/password in `DB_URL` is wrong; a timeout means the Atlas IP allow-list blocks Vercel.
- **Seed script can't connect** - Confirm `.env.local` has a valid `DB_URL`.
