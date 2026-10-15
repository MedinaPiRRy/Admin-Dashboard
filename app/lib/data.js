import { User, Product } from './models.js';
import { connectToDB } from './utils.js';

// User function

export const getUsers = async (q,page) => {

    const regex = new RegExp(q, 'i');

    const ITEM_PER_PAGE = 5;

    try {
        await connectToDB();
        const count = await User.find({username: {$regex: regex}}).count();
        const users = await User.find({username: {$regex: regex}}).limit(ITEM_PER_PAGE).skip((page - 1) * ITEM_PER_PAGE);
        return {users, count};
    } catch (error) {
        console.log("Failed to fetch users");
        throw Error(error);
    }
}

export const getUser = async (id) => {
    try {
        await connectToDB();
        const user = await User.findById(id);
        return user;
    } catch (error) {
        console.log("Failed to fetch user");
        throw new Error(error);
    }
}

// Product function

export const getProducts = async (q, page) => {

    const regex = new RegExp(q, 'i');

    const ITEM_PER_PAGE = 5;

    try {
        await connectToDB();
        const count = await Product.find({title: {$regex: regex}}).count();
        const products = await Product.find({title: {$regex: regex}}).limit(ITEM_PER_PAGE).skip((page - 1) * ITEM_PER_PAGE);
        return {products, count};
    } catch (error) {
        console.log("Failed to fetch products");
        throw new Error(error);
    }
}

export const getProduct = async (id) => {
    try {
        await connectToDB();
        const product = await Product.findById(id);
        return product;
    } catch (error) {
        console.log("Failed to fetch product");
        throw new Error(error);
    }
}