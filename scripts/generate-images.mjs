// Generates the SVG avatars and product images in public/ from scripts/sample-data.mjs.
// Usage: node scripts/generate-images.mjs   (the output is committed, so you rarely need to run it)
import { mkdirSync, writeFileSync } from "node:fs";
import { users, CATEGORY_STYLE } from "./sample-data.mjs";

const COLORS = ["#6366f1", "#0ea5e9", "#14b8a6", "#f59e0b", "#ef4444", "#ec4899", "#8b5cf6", "#22c55e", "#f97316", "#06b6d4"];

const hash = (text) => [...text].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

const initials = (username) =>
  username
    .split("_")
    .map((part) => part[0].toUpperCase())
    .slice(0, 2)
    .join("");

mkdirSync("public/avatars", { recursive: true });
mkdirSync("public/products", { recursive: true });

for (const { username } of users) {
  const color = COLORS[hash(username) % COLORS.length];
  writeFileSync(
    `public/avatars/${username}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96"><rect width="96" height="96" fill="${color}"/><text x="48" y="48" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="700" fill="#fff" text-anchor="middle" dominant-baseline="central">${initials(username)}</text></svg>\n`
  );
}

for (const [category, { emoji, from, to }] of Object.entries(CATEGORY_STYLE)) {
  writeFileSync(
    `public/products/${category}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="160" height="160" fill="url(#g)"/><text x="80" y="82" font-size="72" text-anchor="middle" dominant-baseline="central">${emoji}</text></svg>\n`
  );
}

console.log(`Wrote ${users.length} avatars and ${Object.keys(CATEGORY_STYLE).length} product images.`);
