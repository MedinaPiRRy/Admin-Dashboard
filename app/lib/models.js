import mongoose from "mongoose";
import { ORDER_STATUSES } from "./constants.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    img: {
        type: String,
        default: '/no-avatar.jpg'
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    phone: {
        type: String,
        trim: true,
        minlength: 10,
        maxlength: 15
    },
    address: {
        type: String,
        trim: true,
        maxlength: 200
    },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2,
        maxlength: 60
    },
    desc: {
        type: String,
        maxlength: 1000
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        default: '/no-product.jpg'
    },
    color: {
        type: String,
    },
    size: {
        type: String,
    },
}, { timestamps: true });

// Orders are denormalised on purpose (customer name and product title are stored
// as text) so the transactions pages stay simple and survive user/product deletes.
const orderSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: true,
        trim: true,
    },
    product: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ORDER_STATUSES,
        default: "pending",
    },
}, { timestamps: true });

orderSchema.index({ createdAt: -1 });

export const User = mongoose.models.Users || mongoose.model('Users', userSchema);
export const Product = mongoose.models.Products || mongoose.model('Products', productSchema);
export const Order = mongoose.models.Orders || mongoose.model('Orders', orderSchema);
