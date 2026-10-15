// Seeds the database with demo users and products for the live demo.
// Usage:  npm run seed        (reads DB_URL from .env.local / .env or the shell)
// WARNING: this clears the users and products collections first.
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const DB_URL = process.env.DB_URL;
if (!DB_URL) {
  console.error("DB_URL is not set. Copy .env.example to .env.local and fill it in.");
  process.exit(1);
}

const DEMO_PASSWORD = "Demo1234!";

const users = [
  { username: "demo_recruiter", email: "recruiter@example.com", isAdmin: true, isActive: true, phone: "6475550100", address: "100 Demo Street, Toronto" },
  { username: "john_doe", email: "johndoe@example.com", isAdmin: true, isActive: true, phone: "6475556677", address: "" },
  { username: "daniel_medina", email: "danielmedina@example.com", isAdmin: true, isActive: true, phone: "6475556677", address: "811 Rayner Court" },
  { username: "leah_akai", email: "leahakai@example.com", isAdmin: false, isActive: true, address: "" },
  { username: "miguel_angel", email: "miguelangel@example.com", isAdmin: false, isActive: false, address: "1959 Zelinsky Drive" },
  { username: "aleks_manov", email: "aleksmanov@example.com", isAdmin: false, isActive: false, phone: "6475556677", address: "811 Rayner Court" },
  { username: "sara_kim", email: "sarakim@example.com", isAdmin: false, isActive: true, phone: "4165550123", address: "22 Queen St W" },
  { username: "omar_haddad", email: "omarhaddad@example.com", isAdmin: false, isActive: true, address: "7 Maple Ave" },
];

const products = [
  { title: "iPhone 13", price: 999.99, stock: 89, color: "Blue", size: "R", category: "phone", desc: "Smartphone with a 6.1-inch display." },
  { title: "Samsung Fridge", price: 420.99, stock: 67, color: "Gray", size: "L", category: "Kitchen", desc: "Double-door refrigerator." },
  { title: "iMac", price: 1999.99, stock: 9, color: "White", size: "R", category: "Computer", desc: "All-in-one desktop computer." },
  { title: "LV Shirt", price: 840.99, stock: 14, color: "Purple", size: "M", category: "Clothes", desc: "Designer cotton shirt." },
  { title: "Bose Headphones", price: 350.99, stock: 140, color: "Black", size: "R", category: "Electronics", desc: "Noise-cancelling headphones." },
  { title: "Dell Laptop", price: 1299.0, stock: 32, color: "Silver", size: "M", category: "Computer", desc: "14-inch ultrabook." },
  { title: "Air Fryer", price: 129.5, stock: 54, color: "Black", size: "M", category: "Kitchen", desc: "5-litre digital air fryer." },
];

await mongoose.connect(DB_URL);
const db = mongoose.connection;

// Use the same collection names as the Mongoose models in app/lib/models.js
const hash = await bcrypt.hash(DEMO_PASSWORD, 10);
const now = new Date();
await db.collection("users").deleteMany({});
await db.collection("products").deleteMany({});
await db.collection("users").insertMany(
  users.map((u) => ({ img: "/no-avatar.jpg", ...u, password: hash, createdAt: now, updatedAt: now }))
);
await db.collection("products").insertMany(
  products.map((p) => ({ img: "/no-product.jpg", ...p, createdAt: now, updatedAt: now }))
);

console.log(`Seeded ${users.length} users and ${products.length} products.`);
console.log(`Demo login -> username: demo_recruiter  password: ${DEMO_PASSWORD}`);
await mongoose.disconnect();
