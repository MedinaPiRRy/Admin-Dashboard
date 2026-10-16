// Sample data for the demo. Used by seed.mjs and generate-images.mjs.
// Everything is fictional. All users share the demo password (see seed.mjs).

const DAY = 24 * 60 * 60 * 1000;

// `joined` = how many days ago the account was created. A handful of accounts joined in the
// last two weeks so the dashboard's week-over-week user change has something to compare.
export const users = [
  // Administrators
  { username: "demo_recruiter", email: "recruiter@example.com", isAdmin: true, isActive: true, phone: "6475550100", address: "100 Demo Street, Toronto", joined: 340 },
  { username: "john_doe", email: "johndoe@example.com", isAdmin: true, isActive: true, phone: "6475556677", joined: 330 },
  { username: "daniel_medina", email: "danielmedina@example.com", isAdmin: true, isActive: true, phone: "6475556678", address: "811 Rayner Court", joined: 320 },
  { username: "maria_santos", email: "mariasantos@example.com", isAdmin: true, isActive: true, phone: "4165550141", address: "45 King St E, Toronto", joined: 250 },
  { username: "aisha_rahman", email: "aisharahman@example.com", isAdmin: true, isActive: true, phone: "9055550117", address: "310 Dundas St W, Mississauga", joined: 170 },
  { username: "liam_chen", email: "liamchen@example.com", isAdmin: true, isActive: true, phone: "6475550163", joined: 95 },
  { username: "kevin_oconnor", email: "kevinoconnor@example.com", isAdmin: true, isActive: false, phone: "4165550188", address: "9 Lakeshore Rd, Oakville", joined: 210 },
  // Clients
  { username: "leah_akai", email: "leahakai@example.com", isAdmin: false, isActive: true, joined: 300 },
  { username: "miguel_angel", email: "miguelangel@example.com", isAdmin: false, isActive: false, address: "1959 Zelinsky Drive", joined: 290 },
  { username: "aleks_manov", email: "aleksmanov@example.com", isAdmin: false, isActive: false, phone: "6475556679", address: "811 Rayner Court", joined: 270 },
  { username: "emma_wilson", email: "emmawilson@example.com", isAdmin: false, isActive: true, phone: "4165550102", address: "12 Elm Street, Toronto", joined: 255 },
  { username: "noah_brown", email: "noahbrown@example.com", isAdmin: false, isActive: true, joined: 240 },
  { username: "olivia_martin", email: "oliviamartin@example.com", isAdmin: false, isActive: true, phone: "9055550133", address: "77 Pine Ave, Brampton", joined: 225 },
  { username: "ethan_clark", email: "ethanclark@example.com", isAdmin: false, isActive: true, phone: "6475550154", joined: 205 },
  { username: "ava_lopez", email: "avalopez@example.com", isAdmin: false, isActive: true, address: "5 Harbour Sq, Toronto", joined: 190 },
  { username: "mason_lee", email: "masonlee@example.com", isAdmin: false, isActive: true, phone: "4165550176", joined: 180 },
  { username: "sophia_patel", email: "sophiapatel@example.com", isAdmin: false, isActive: true, phone: "9055550190", address: "88 Bloor St W, Toronto", joined: 160 },
  { username: "logan_nguyen", email: "logannguyen@example.com", isAdmin: false, isActive: true, joined: 150 },
  { username: "isabella_rossi", email: "isabellarossi@example.com", isAdmin: false, isActive: true, phone: "6475550121", address: "23 College St, Toronto", joined: 140 },
  { username: "jacob_cohen", email: "jacobcohen@example.com", isAdmin: false, isActive: true, joined: 128 },
  { username: "elijah_ahmed", email: "elijahahmed@example.com", isAdmin: false, isActive: false, phone: "4165550199", joined: 120 },
  { username: "charlotte_dubois", email: "charlottedubois@example.com", isAdmin: false, isActive: true, address: "4 Rue Saint-Denis, Montreal", joined: 105 },
  { username: "amelia_kowalski", email: "ameliakowalski@example.com", isAdmin: false, isActive: true, phone: "9055550145", joined: 80 },
  { username: "henry_oliveira", email: "henryoliveira@example.com", isAdmin: false, isActive: true, joined: 62 },
  { username: "grace_mensah", email: "gracemensah@example.com", isAdmin: false, isActive: false, phone: "6475550108", address: "61 Gerrard St E, Toronto", joined: 50 },
  { username: "benjamin_diaz", email: "benjamindiaz@example.com", isAdmin: false, isActive: true, phone: "4165550167", joined: 9 },
  { username: "omar_haddad", email: "omarhaddad@example.com", isAdmin: false, isActive: true, address: "7 Maple Ave", joined: 10 },
  { username: "sara_kim", email: "sarakim@example.com", isAdmin: false, isActive: true, phone: "4165550123", address: "22 Queen St W", joined: 12 },
  { username: "mia_tanaka", email: "miatanaka@example.com", isAdmin: false, isActive: true, joined: 6 },
  { username: "samuel_ito", email: "samuelito@example.com", isAdmin: false, isActive: false, phone: "9055550172", joined: 5 },
  { username: "priya_nair", email: "priyanair@example.com", isAdmin: false, isActive: true, address: "140 Yonge St, Toronto", joined: 4 },
  { username: "lucas_silva", email: "lucassilva@example.com", isAdmin: false, isActive: true, phone: "4165550188", joined: 2 },
];

export const CATEGORY_STYLE = {
  phone: { emoji: "📱", from: "#4f46e5", to: "#818cf8" },
  computer: { emoji: "💻", from: "#0e7490", to: "#22d3ee" },
  kitchen: { emoji: "🍳", from: "#c2410c", to: "#fb923c" },
  clothes: { emoji: "👕", from: "#be185d", to: "#f472b6" },
  electronics: { emoji: "🎧", from: "#6d28d9", to: "#a78bfa" },
  home: { emoji: "🛋️", from: "#15803d", to: "#4ade80" },
  sports: { emoji: "🚴", from: "#b91c1c", to: "#f87171" },
  books: { emoji: "📚", from: "#a16207", to: "#facc15" },
};

// `age` = days since the product was added.
export const products = [
  { title: "iPhone 13", price: 999.99, stock: 89, color: "Blue", size: "R", category: "phone", desc: "Smartphone with a 6.1-inch display and dual camera.", age: 300 },
  { title: "Pixel 8", price: 799.0, stock: 41, color: "Obsidian", size: "R", category: "phone", desc: "Android smartphone with a great camera.", age: 260 },
  { title: "Galaxy S23", price: 899.99, stock: 12, color: "Phantom Black", size: "R", category: "phone", desc: "Flagship Android phone with a 120 Hz display.", age: 240 },
  { title: "OnePlus 12", price: 699.0, stock: 27, color: "Green", size: "R", category: "phone", desc: "Fast charging phone with a large battery.", age: 120 },
  { title: "iPhone SE", price: 429.0, stock: 8, color: "Midnight", size: "S", category: "phone", desc: "Compact iPhone with a powerful chip.", age: 90 },
  { title: "iMac", price: 1999.99, stock: 9, color: "White", size: "R", category: "computer", desc: "All-in-one desktop computer.", age: 290 },
  { title: "Dell XPS 13", price: 1299.0, stock: 32, color: "Silver", size: "M", category: "computer", desc: "13-inch ultrabook with an edge-to-edge display.", age: 280 },
  { title: "MacBook Air M2", price: 1199.0, stock: 18, color: "Space Gray", size: "M", category: "computer", desc: "Thin and light laptop with all-day battery life.", age: 200 },
  { title: "ThinkPad X1 Carbon", price: 1649.0, stock: 5, color: "Black", size: "M", category: "computer", desc: "Business laptop with a legendary keyboard.", age: 170 },
  { title: "Logitech MX Keys", price: 119.99, stock: 64, color: "Graphite", size: "R", category: "computer", desc: "Wireless illuminated keyboard.", age: 150 },
  { title: "ASUS 27-inch Monitor", price: 279.0, stock: 22, color: "Black", size: "L", category: "computer", desc: "27-inch QHD IPS monitor.", age: 60 },
  { title: "Samsung Fridge", price: 1420.99, stock: 67, color: "Gray", size: "L", category: "kitchen", desc: "Double-door refrigerator.", age: 295 },
  { title: "Air Fryer", price: 129.5, stock: 54, color: "Black", size: "M", category: "kitchen", desc: "5-litre digital air fryer.", age: 230 },
  { title: "Instant Pot Duo", price: 99.95, stock: 37, color: "Stainless", size: "M", category: "kitchen", desc: "7-in-1 electric pressure cooker.", age: 210 },
  { title: "KitchenAid Stand Mixer", price: 449.0, stock: 3, color: "Red", size: "L", category: "kitchen", desc: "Tilt-head stand mixer for baking.", age: 185 },
  { title: "Breville Espresso Machine", price: 599.0, stock: 0, color: "Brushed Steel", size: "M", category: "kitchen", desc: "Semi-automatic espresso machine with a built-in grinder.", age: 110 },
  { title: "LV Shirt", price: 840.99, stock: 14, color: "Purple", size: "M", category: "clothes", desc: "Designer cotton shirt.", age: 275 },
  { title: "Denim Jacket", price: 89.99, stock: 6, color: "Blue", size: "L", category: "clothes", desc: "Classic denim jacket.", age: 220 },
  { title: "Running Shoes", price: 129.0, stock: 48, color: "White", size: "M", category: "clothes", desc: "Lightweight running shoes with extra cushioning.", age: 165 },
  { title: "501 Original Jeans", price: 69.5, stock: 75, color: "Indigo", size: "32", category: "clothes", desc: "Straight-fit jeans, a timeless cut.", age: 140 },
  { title: "Wool Winter Coat", price: 249.0, stock: 11, color: "Charcoal", size: "L", category: "clothes", desc: "Warm wool coat for cold winters.", age: 75 },
  { title: "Bose Headphones", price: 350.99, stock: 140, color: "Black", size: "R", category: "electronics", desc: "Noise-cancelling headphones.", age: 285 },
  { title: "Sony WH-1000XM5", price: 399.99, stock: 52, color: "Silver", size: "R", category: "electronics", desc: "Over-ear headphones with industry-leading noise cancelling.", age: 195 },
  { title: "Apple Watch SE", price: 279.0, stock: 33, color: "Starlight", size: "S", category: "electronics", desc: "Smartwatch with fitness and safety features.", age: 155 },
  { title: "GoPro Hero 12", price: 399.0, stock: 16, color: "Black", size: "S", category: "electronics", desc: "Waterproof 5.3K action camera.", age: 100 },
  { title: "JBL Flip 6", price: 129.95, stock: 88, color: "Teal", size: "S", category: "electronics", desc: "Portable waterproof Bluetooth speaker.", age: 45 },
  { title: "Dyson V15 Vacuum", price: 749.99, stock: 7, color: "Yellow", size: "L", category: "home", desc: "Cordless vacuum with laser dust detection.", age: 235 },
  { title: "Philips Hue Starter Kit", price: 199.99, stock: 29, color: "White", size: "S", category: "home", desc: "Smart bulbs with a bridge for app control.", age: 180 },
  { title: "Standing Desk", price: 399.0, stock: 15, color: "Walnut", size: "L", category: "home", desc: "Electric height-adjustable desk.", age: 130 },
  { title: "Weighted Blanket", price: 89.0, stock: 60, color: "Gray", size: "L", category: "home", desc: "15 lb weighted blanket for better sleep.", age: 55 },
  { title: "Yoga Mat", price: 34.99, stock: 120, color: "Purple", size: "M", category: "sports", desc: "Non-slip 6 mm yoga mat.", age: 265 },
  { title: "Exercise Bike", price: 1445.0, stock: 4, color: "Black", size: "L", category: "sports", desc: "Indoor cycling bike with a touchscreen.", age: 215 },
  { title: "Adjustable Dumbbells", price: 349.0, stock: 19, color: "Black", size: "M", category: "sports", desc: "Pair of dumbbells, 5 to 52.5 lb each.", age: 145 },
  { title: "Mountain Bike", price: 899.0, stock: 9, color: "Orange", size: "L", category: "sports", desc: "Hardtail mountain bike with 29-inch wheels.", age: 85 },
  { title: "Atomic Habits", price: 18.99, stock: 200, color: "Blue", size: "R", category: "books", desc: "An easy and proven way to build good habits.", age: 270 },
  { title: "Clean Code", price: 39.99, stock: 45, color: "White", size: "R", category: "books", desc: "A handbook of agile software craftsmanship.", age: 160 },
  { title: "The Pragmatic Programmer", price: 49.99, stock: 17, color: "Red", size: "R", category: "books", desc: "Your journey to mastery, 20th anniversary edition.", age: 70 },
];

const SEED = 221; // chosen so the dashboard shows healthy week-over-week growth

// Deterministic pseudo-random numbers, so every seed run produces the same orders.
export const makeRandom = (seed = 2026) => {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
};

// Roughly 300 orders over the last 180 days. Volume grows over time, only customers
// who had already joined can order, and recent orders are more likely to be pending.
export const buildOrders = (now = Date.now(), seed = SEED) => {
  const random = makeRandom(seed);
  const pick = (list) => list[Math.floor(random() * list.length)];
  const customers = users.filter((u) => !u.isAdmin && u.isActive);
  const orders = [];

  for (let daysAgo = 179; daysAgo >= 0; daysAgo--) {
    const progress = (179 - daysAgo) / 179;
    let count = Math.floor(0.5 + 1.8 * progress + random() * 1.4);
    if (daysAgo < 7) count = Math.max(count, 2 + Math.floor(random() * 2)); // keep the last week busy

    for (let i = 0; i < count; i++) {
      const eligible = customers.filter((c) => c.joined >= daysAgo);
      if (eligible.length === 0) continue;
      const product = pick(products);
      const quantity = random() < 0.7 ? 1 : 2 + Math.floor(random() * 2);
      const roll = random();
      let status;
      if (daysAgo < 7) status = roll < 0.55 ? "done" : roll < 0.85 ? "pending" : "cancelled";
      else if (daysAgo < 14) status = roll < 0.8 ? "done" : roll < 0.9 ? "pending" : "cancelled";
      else status = roll < 0.88 ? "done" : "cancelled";

      const createdAt = new Date(now - daysAgo * DAY - Math.floor(random() * 20 * 60 * 60 * 1000));
      orders.push({
        customer: pick(eligible).username,
        product: product.title,
        quantity,
        amount: Math.round(product.price * quantity * 100) / 100,
        status,
        createdAt,
      });
    }
  }
  return orders;
};
