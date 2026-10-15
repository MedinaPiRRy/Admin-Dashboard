// Seeds the database with demo users, products and orders for the live demo.
// Usage:  npm run seed        (reads DB_URL from .env.local / .env or the shell)
// WARNING: this clears the users, products and orders collections first.
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const DB_URL = process.env.DB_URL;
if (!DB_URL) {
  console.error("DB_URL is not set. Copy .env.example to .env.local and fill it in.");
  process.exit(1);
}

const DEMO_PASSWORD = "Demo1234!";
const DAY = 24 * 60 * 60 * 1000;
const now = Date.now();
const daysAgo = (n) => new Date(now - n * DAY);

// Small deterministic random generator so every seed run produces the same orders
let state = 42;
const random = () => {
  state = (state * 1664525 + 1013904223) % 4294967296;
  return state / 4294967296;
};
const pick = (list) => list[Math.floor(random() * list.length)];

// `joined` is how many days ago the account was created (spread out so the
// dashboard's week-over-week numbers have something to compare).
const users = [
  { username: "demo_recruiter", email: "recruiter@example.com", isAdmin: true, isActive: true, phone: "6475550100", address: "100 Demo Street, Toronto", joined: 90 },
  { username: "john_doe", email: "johndoe@example.com", isAdmin: true, isActive: true, phone: "6475556677", joined: 80 },
  { username: "daniel_medina", email: "danielmedina@example.com", isAdmin: true, isActive: true, phone: "6475556677", address: "811 Rayner Court", joined: 75 },
  { username: "leah_akai", email: "leahakai@example.com", isAdmin: false, isActive: true, joined: 40 },
  { username: "miguel_angel", email: "miguelangel@example.com", isAdmin: false, isActive: false, address: "1959 Zelinsky Drive", joined: 30 },
  { username: "aleks_manov", email: "aleksmanov@example.com", isAdmin: false, isActive: false, phone: "6475556677", address: "811 Rayner Court", joined: 20 },
  { username: "sara_kim", email: "sarakim@example.com", isAdmin: false, isActive: true, phone: "4165550123", address: "22 Queen St W", joined: 12 },
  { username: "omar_haddad", email: "omarhaddad@example.com", isAdmin: false, isActive: true, address: "7 Maple Ave", joined: 10 },
  { username: "priya_nair", email: "priyanair@example.com", isAdmin: false, isActive: true, joined: 4 },
  { username: "lucas_silva", email: "lucassilva@example.com", isAdmin: false, isActive: true, phone: "4165550188", joined: 2 },
];

const products = [
  { title: "iPhone 13", price: 999.99, stock: 89, color: "Blue", size: "R", category: "phone", desc: "Smartphone with a 6.1-inch display." },
  { title: "Samsung Fridge", price: 420.99, stock: 67, color: "Gray", size: "L", category: "kitchen", desc: "Double-door refrigerator." },
  { title: "iMac", price: 1999.99, stock: 9, color: "White", size: "R", category: "computer", desc: "All-in-one desktop computer." },
  { title: "LV Shirt", price: 840.99, stock: 14, color: "Purple", size: "M", category: "clothes", desc: "Designer cotton shirt." },
  { title: "Bose Headphones", price: 350.99, stock: 140, color: "Black", size: "R", category: "electronics", desc: "Noise-cancelling headphones." },
  { title: "Dell Laptop", price: 1299.0, stock: 32, color: "Silver", size: "M", category: "computer", desc: "14-inch ultrabook." },
  { title: "Air Fryer", price: 129.5, stock: 54, color: "Black", size: "M", category: "kitchen", desc: "5-litre digital air fryer." },
  { title: "Pixel 8", price: 799.0, stock: 41, color: "Obsidian", size: "R", category: "phone", desc: "Android smartphone with a great camera." },
  { title: "Denim Jacket", price: 89.99, stock: 6, color: "Blue", size: "L", category: "clothes", desc: "Classic denim jacket." },
];

// Orders over the last ~6 months, denser in recent weeks so the charts look alive.
const customers = users.filter((u) => !u.isAdmin && u.isActive).map((u) => u.username);
const statuses = ["done", "done", "done", "pending", "cancelled"];
const orders = [];
for (let i = 0; i < 90; i++) {
  const product = pick(products);
  const quantity = 1 + Math.floor(random() * 3);
  const age = i < 30 ? random() * 14 : random() * 180;
  orders.push({
    customer: pick(customers),
    product: product.title,
    quantity,
    amount: Math.round(product.price * quantity * 100) / 100,
    status: pick(statuses),
    createdAt: daysAgo(age),
  });
}

await mongoose.connect(DB_URL);
const db = mongoose.connection;

// Collection names match the Mongoose models in app/lib/models.js
const hash = await bcrypt.hash(DEMO_PASSWORD, 10);
await Promise.all(["users", "products", "orders"].map((name) => db.collection(name).deleteMany({})));

await db.collection("users").insertMany(
  users.map(({ joined, ...u }) => ({ img: "/no-avatar.jpg", ...u, password: hash, createdAt: daysAgo(joined), updatedAt: daysAgo(joined) }))
);
await db.collection("products").insertMany(
  products.map((p, i) => ({ img: "/no-product.jpg", ...p, createdAt: daysAgo(60 - i * 5), updatedAt: daysAgo(60 - i * 5) }))
);
await db.collection("orders").insertMany(orders.map((o) => ({ ...o, updatedAt: o.createdAt })));

console.log(`Seeded ${users.length} users, ${products.length} products and ${orders.length} orders.`);
console.log(`Demo login -> username: demo_recruiter  password: ${DEMO_PASSWORD}`);
await mongoose.disconnect();
