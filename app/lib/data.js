import mongoose from 'mongoose';
import { User, Product, Order } from './models.js';
import { connectToDB } from './utils.js';
import { ITEMS_PER_PAGE, LOW_STOCK_THRESHOLD } from './constants.js';

const DAY = 24 * 60 * 60 * 1000;

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const parsePage = (page) => {
    const parsed = parseInt(page, 10);
    return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
};

// Lean documents -> plain objects with a string `id`
const toPlain = (doc) => {
    if (!doc) return null;
    const { _id, ...rest } = doc;
    delete rest.__v;
    return { id: String(_id), ...rest };
};

const paginate = (page) => (parsePage(page) - 1) * ITEMS_PER_PAGE;

// Users

export const getUsers = async (q = '', page = 1) => {
    await connectToDB();
    const regex = new RegExp(escapeRegex(q), 'i');
    const filter = { $or: [{ username: regex }, { email: regex }] };

    const [count, users] = await Promise.all([
        User.countDocuments(filter),
        User.find(filter, '-password').sort({ createdAt: -1, _id: 1 }).skip(paginate(page)).limit(ITEMS_PER_PAGE).lean(),
    ]);
    return { users: users.map(toPlain), count };
};

export const getUser = async (id) => {
    if (!mongoose.isValidObjectId(id)) return null;
    await connectToDB();
    return toPlain(await User.findById(id, '-password').lean());
};

export const getTeam = async () => {
    await connectToDB();
    const [admins, clients] = await Promise.all([
        User.find({ isAdmin: true }, '-password').sort({ createdAt: 1 }).lean(),
        User.countDocuments({ isAdmin: false }),
    ]);
    return { admins: admins.map(toPlain), clients };
};

// Products

export const getProducts = async (q = '', page = 1) => {
    await connectToDB();
    const filter = { title: { $regex: new RegExp(escapeRegex(q), 'i') } };

    const [count, products] = await Promise.all([
        Product.countDocuments(filter),
        Product.find(filter).sort({ createdAt: -1, _id: 1 }).skip(paginate(page)).limit(ITEMS_PER_PAGE).lean(),
    ]);
    return { products: products.map(toPlain), count };
};

export const getProduct = async (id) => {
    if (!mongoose.isValidObjectId(id)) return null;
    await connectToDB();
    return toPlain(await Product.findById(id).lean());
};

// Orders (transactions)

export const getOrders = async (q = '', status = '', page = 1) => {
    await connectToDB();
    const filter = { customer: { $regex: new RegExp(escapeRegex(q), 'i') } };
    if (status) filter.status = status;

    const [count, orders] = await Promise.all([
        Order.countDocuments(filter),
        Order.find(filter).sort({ createdAt: -1, _id: 1 }).skip(paginate(page)).limit(ITEMS_PER_PAGE).lean(),
    ]);
    return { orders: orders.map(toPlain), count };
};

export const getLatestOrders = async (limit = 5) => {
    await connectToDB();
    const orders = await Order.find().sort({ createdAt: -1, _id: 1 }).limit(limit).lean();
    return orders.map(toPlain);
};

// Dashboard / analytics

export const getDashboardStats = async () => {
    await connectToDB();
    const now = Date.now();
    const weekStart = new Date(now - 7 * DAY);
    const prevWeekStart = new Date(now - 14 * DAY);

    const [users, activeUsers, newUsers, prevUsers, productCount, lowStock, inventory, revenue, orderCount] = await Promise.all([
        User.countDocuments(),
        User.countDocuments({ isActive: true }),
        User.countDocuments({ createdAt: { $gte: weekStart } }),
        User.countDocuments({ createdAt: { $gte: prevWeekStart, $lt: weekStart } }),
        Product.countDocuments(),
        Product.countDocuments({ stock: { $lt: LOW_STOCK_THRESHOLD } }),
        Product.aggregate([{ $group: { _id: null, units: { $sum: '$stock' }, value: { $sum: { $multiply: ['$price', '$stock'] } } } }]),
        Order.aggregate([
            { $match: { status: 'done' } },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' },
                    orders: { $sum: 1 },
                    thisWeek: { $sum: { $cond: [{ $gte: ['$createdAt', weekStart] }, '$amount', 0] } },
                    prevWeek: { $sum: { $cond: [{ $and: [{ $gte: ['$createdAt', prevWeekStart] }, { $lt: ['$createdAt', weekStart] }] }, '$amount', 0] } },
                },
            },
        ]),
        Order.countDocuments(),
    ]);

    return {
        users: { total: users, active: activeUsers, newThisWeek: newUsers, newPrevWeek: prevUsers },
        products: { total: productCount, lowStock, units: inventory[0]?.units ?? 0, value: inventory[0]?.value ?? 0 },
        revenue: {
            total: revenue[0]?.total ?? 0,
            completedOrders: revenue[0]?.orders ?? 0,
            thisWeek: revenue[0]?.thisWeek ?? 0,
            prevWeek: revenue[0]?.prevWeek ?? 0,
            allOrders: orderCount,
        },
    };
};

// Orders and completed revenue per day for the last `days` days (zero-filled)
export const getDailyOrders = async (days = 7) => {
    await connectToDB();
    const start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    start.setTime(start.getTime() - (days - 1) * DAY);

    const rows = await Order.aggregate([
        { $match: { createdAt: { $gte: start } } },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                orders: { $sum: 1 },
                revenue: { $sum: { $cond: [{ $eq: ['$status', 'done'] }, '$amount', 0] } },
            },
        },
    ]);
    const byDay = new Map(rows.map((r) => [r._id, r]));

    return Array.from({ length: days }, (_, i) => {
        const date = new Date(start.getTime() + i * DAY);
        const row = byDay.get(date.toISOString().slice(0, 10));
        return {
            name: date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' }),
            orders: row?.orders ?? 0,
            revenue: Math.round(row?.revenue ?? 0),
        };
    });
};

// Completed revenue per month for the last `months` months (zero-filled)
export const getMonthlyRevenue = async (months = 6) => {
    await connectToDB();
    const today = new Date();
    const first = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - (months - 1), 1));

    const rows = await Order.aggregate([
        { $match: { status: 'done', createdAt: { $gte: first } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, revenue: { $sum: '$amount' }, orders: { $sum: 1 } } },
    ]);
    const byMonth = new Map(rows.map((r) => [r._id, r]));

    return Array.from({ length: months }, (_, i) => {
        const date = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + i, 1));
        const row = byMonth.get(date.toISOString().slice(0, 7));
        return {
            name: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit', timeZone: 'UTC' }),
            revenue: Math.round(row?.revenue ?? 0),
            orders: row?.orders ?? 0,
        };
    });
};

export const getRevenueSummary = async () => {
    await connectToDB();
    const rows = await Order.aggregate([{ $group: { _id: '$status', count: { $sum: 1 }, amount: { $sum: '$amount' } } }]);
    const byStatus = Object.fromEntries(rows.map((r) => [r._id, r]));
    const done = byStatus.done ?? { count: 0, amount: 0 };
    return {
      byStatus,
      completedRevenue: done.amount,
      completedOrders: done.count,
      pendingRevenue: byStatus.pending?.amount ?? 0,
      averageOrder: done.count ? done.amount / done.count : 0,
    };
};

export const getReportData = async () => {
    await connectToDB();
    const [categories, lowStock, roles, statuses] = await Promise.all([
        Product.aggregate([
            { $group: { _id: '$category', products: { $sum: 1 }, units: { $sum: '$stock' }, value: { $sum: { $multiply: ['$price', '$stock'] } } } },
            { $sort: { value: -1 } },
        ]),
        Product.find({ stock: { $lt: LOW_STOCK_THRESHOLD } }).sort({ stock: 1, title: 1 }).limit(10).lean(),
        User.aggregate([{ $group: { _id: '$isAdmin', count: { $sum: 1 } } }]),
        User.aggregate([{ $group: { _id: '$isActive', count: { $sum: 1 } } }]),
    ]);

    const countFor = (rows, key) => rows.find((r) => r._id === key)?.count ?? 0;
    return {
        categories: categories.map((c) => ({ category: c._id, products: c.products, units: c.units, value: c.value })),
        lowStock: lowStock.map(toPlain),
        users: {
            admins: countFor(roles, true),
            clients: countFor(roles, false),
            active: countFor(statuses, true),
            inactive: countFor(statuses, false),
        },
    };
};
