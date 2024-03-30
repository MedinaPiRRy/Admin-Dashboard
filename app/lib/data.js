import { User, Product } from './models.js';
import { connectToDB } from './utils.js';

// User functions

export const getUsers = async (q,page) => {

    const regex = new RegExp(q, 'i');

    const ITEM_PER_PAGE = 2;

    try {
        connectToDB();
        const count = await User.find({username: {$regex: regex}}).count();
        const users = await User.find({username: {$regex: regex}}).limit(ITEM_PER_PAGE).skip((page - 1) * ITEM_PER_PAGE);
        return {users, count};
    } catch (error) {
        console.log("Failed to fetch users");
        throw new Error(error);
    }
}

export const getUser = async (id) => {
    try {
        connectToDB();
        const user = await User.findById(id);
        return user;
    } catch (error) {
        console.log("Failed to fetch user");
        throw new Error(error);
    }
}

export const createUser = async (data) => {
    try {
        connectToDB();
        const user = await User.create(data);
        return user;
    } catch (error) {
        console.log("Failed to create user");
        throw new Error(error);
    }
}

export const updateUser = async (id, data) => {
    try {
        connectToDB();
        const user = await User.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });
        return user;
    } catch (error) {
        console.log("Failed to update user");
        throw new Error(error);
    }
}

export const deleteUser = async (id) => {
    try {
        connectToDB();
        const user = await User.findByIdAndDelete(id);
        return user;
    } catch (error) {
        console.log("Failed to delete user");
        throw new Error(error);
    }
}

// Product functions

export const getProducts = async (q, page) => {

    const regex = new RegExp(q, 'i');

    const ITEM_PER_PAGE = 2;

    try {
        connectToDB();
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
        connectToDB();
        const product = await Product.findById(id);
        return product;
    } catch (error) {
        console.log("Failed to fetch product");
        throw new Error(error);
    }
}

export const createProduct = async (data) => {
    try {
        connectToDB();
        const product = await Product.create(data);
        return product;
    } catch (error) {
        console.log("Failed to create product");
        throw new Error(error);
    }
}

export const updateProduct = async (id, data) => {
    try {
        connectToDB();
        const product = await Product.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });
        return product;
    } catch (error) {
        console.log("Failed to update product");
        throw new Error(error);
    }
}

export const deleteProduct = async (id) => {
    try {
        connectToDB();
        const product = await Product.findByIdAndDelete(id);
        return product;
    } catch (error) {
        console.log("Failed to delete product");
        throw new Error(error);
    }
}