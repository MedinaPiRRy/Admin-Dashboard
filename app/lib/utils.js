import mongoose from "mongoose";

// Cache the connection across hot reloads / serverless invocations
const cached = globalThis._mongoose || (globalThis._mongoose = { conn: null, promise: null });

export const connectToDB = async () => {
    if (!process.env.DB_URL) {
        throw new Error("DB_URL environment variable is not set");
    }
    if (cached.conn) return cached.conn;

    try {
        cached.promise = cached.promise || mongoose.connect(process.env.DB_URL);
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        cached.promise = null;
        throw new Error(error);
    }
};
