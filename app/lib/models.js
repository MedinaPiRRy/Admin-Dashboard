import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 20
    },
    password: {
        type: String,
        required: true,
        min: 5,
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
        minlength: 10,
        maxlength: 15
    },
    address: {
        type: String,
    },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 20
    },
    desc: {
        type: String,
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

export const User = mongoose.models.Users || mongoose.model('Users', userSchema);
export const Product = mongoose.models.Products || mongoose.model('Products', productSchema);