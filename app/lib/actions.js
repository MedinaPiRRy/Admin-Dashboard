"use server"
import { revalidatePath } from 'next/cache.js';
import { User, Product } from './models.js';
import { connectToDB } from './utils.js';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';

// User functions

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

export const createUser = async (formData) => {

    const data = Array.from(formData.entries()).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value === 'true' ? true : value === 'false' ? false : value // Convert 'true'/'false' strings to booleans
    }), {});

    const { 
        username, email, password, phone, address, isAdmin, isActive, retype 
    } = data;

    if (password !== retype) {
        // create redirect to error page
        throw new Error("Passwords do not match");
    } else {
        try {
            connectToDB();

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                phone,
                address,
                isAdmin: !!isAdmin,
                isActive: !!isActive
            });
            await newUser.save();
        } catch (error) {
            console.log("Failed to create user");
            throw new Error(error);
        }

        revalidatePath("/dashboard/users");
        redirect("/dashboard/users");
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

// Products functions

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

export const createProduct = async (formData) => {

    const data = Array.from(formData.entries()).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value === 'true' ? true : value === 'false' ? false : value // Convert 'true'/'false' strings to booleans
    }), {});

    const { 
        title, cat, price, stock, color, size, desc 
    } = data;
    try {
        connectToDB();
        const newProduct = new Product({
            title,
            category: cat,
            price,
            stock,
            color,
            size,
            desc
        });
        await newProduct.save();
    } catch (error) {
        console.log("Failed to create product");
        throw new Error(error);
    }

    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
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
