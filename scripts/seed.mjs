// Seeds the database with demo users, products and orders for the live demo.
// Usage:  npm run seed        (reads DB_URL from .env.local / .env or the shell)
// WARNING: this clears the users, products and orders collections first.
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { users, products, buildOrders } from "./sample-data.mjs";

const DB_URL = process.env.DB_URL;
if (!DB_URL) {
  console.error("DB_URL is not set. Copy .env.example to .env.local and fill it in.");
  process.exit(1);
}

const DEMO_PASSWORD = "Demo1234!";
const DAY = 24 * 60 * 60 * 1000;
const now = Date.now();
const daysAgo = (n) => new Date(now - n * DAY);

const orders = buildOrders(now);

await mongoose.connect(DB_URL);
const db = mongoose.connection;

// Collection names match the Mongoose models in app/lib/models.js
const hash = await bcrypt.hash(DEMO_PASSWORD, 10);
await Promise.all(["users", "products", "orders"].map((name) => db.collection(name).deleteMany({})));

await db.collection("users").insertMany(
  users.map(({ joined, ...u }) => ({
    img: `/avatars/${u.username}.svg`,
    ...u,
    password: hash,
    createdAt: daysAgo(joined),
    updatedAt: daysAgo(joined),
  }))
);
await db.collection("products").insertMany(
  products.map(({ age, ...p }) => ({
    img: `/products/${p.category}.svg`,
    ...p,
    createdAt: daysAgo(age),
    updatedAt: daysAgo(age),
  }))
);
await db.collection("orders").insertMany(orders.map((o) => ({ ...o, updatedAt: o.createdAt })));

console.log(`Seeded ${users.length} users, ${products.length} products and ${orders.length} orders.`);
console.log(`Demo login -> username: demo_recruiter  password: ${DEMO_PASSWORD}`);
await mongoose.disconnect();
