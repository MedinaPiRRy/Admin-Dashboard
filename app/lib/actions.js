"use server"
import { revalidatePath } from 'next/cache.js';
import { User, Product } from './models.js';
import { connectToDB } from './utils.js';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { signIn } from '../../auth.js';

// User functions

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
        redirect('/dashboard/users/add?error=passwordMismatch');
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
            if (error.code === 11000) {
                redirect('/dashboard/users/add?error=duplicateUser');
            } else {
                throw new Error(error);
            }
        }

        revalidatePath("/dashboard/users");
        redirect("/dashboard/users");
    }
}

export const updateUser = async (formData) => {

    const data = Array.from(formData.entries()).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value === 'true' ? true : value === 'false' ? false : value // Convert 'true'/'false' strings to booleans
    }), {});

    const { 
        id, username, email, password, phone, address, isAdmin, isActive, retype 
    } = data;

    if (password !== retype) {
        // create redirect to error page
        throw new Error("Passwords do not match");
    }

    if (password) {
        const salt = await bcrypt.genSalt(10);
        var hashedPassword = await bcrypt.hash(password, salt);
    } else {
        hashedPassword = null;
    }

    const newPass = hashedPassword || null;

    try {
        connectToDB();
        const updatedFields = {
            username,
            email,
            password: newPass,
            phone,
            address,
            isAdmin,
            isActive
        };

        Object.keys(updatedFields).forEach(key => {
            if (!updatedFields[key] || updatedFields[key] === "undefined" || updatedFields[key] === null) {
                delete updatedFields[key];
            }
        });

        await User.findByIdAndUpdate(id, updatedFields);
    } catch (error) {
        console.log("Failed to update user");
        throw new Error(error);
    }

    revalidatePath(`/dashboard/users/${id}`); // revalidate user page (/dashboard/users/[id]/page)
    redirect(`/dashboard/users/${id}`); // redirect to user page
}

export const deleteUser = async (formData) => {

    const { id } = Object.fromEntries(formData);

    try {
        connectToDB();
        const user = await User.findByIdAndDelete(id);
    } catch (error) {
        console.log("Failed to delete user");
        throw new Error(error);
    }

    revalidatePath("/dashboard/users");
}

// Products functions

export const createProduct = async (formData) => {

    const data = Array.from(formData.entries()).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value === 'true' ? true : value === 'false' ? false : value // Convert 'true'/'false' strings to booleans
    }), {});

    const { 
        title, cat, price, stock, color, size, desc 
    } = data;

    if (desc === "undefined" || desc === null || desc === "") {
        var newDesc = "No Description Available";
    } else {var newDesc = desc;}

    try {
        connectToDB();
        const newProduct = new Product({
            title,
            category: cat,
            price,
            stock,
            color,
            size,
            desc: newDesc
        });
        await newProduct.save();
    } catch (error) {
        console.log("Failed to create product");
        if (error.code === 11000) {
            redirect('/dashboard/products/add?error=duplicateProduct');
        } else {
            throw new Error(error);
        }
    }

    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
}

export const updateProduct = async (formData) => {

    const data = Array.from(formData.entries()).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value === 'true' ? true : value === 'false' ? false : value // Convert 'true'/'false' strings to booleans
    }), {});

    const { 
        id, title, cat, price, stock, color, size, desc 
    } = data;

    if (cat === "none") {var newCat = null;} else {var newCat = cat;}
    const updatedCat = newCat;

    try {
        connectToDB();

        const updatedFields = {
            title,
            category: updatedCat,
            price,
            stock,
            color,
            size,
            desc
        };

        Object.keys(updatedFields).forEach(key => {
            if (!updatedFields[key] || updatedFields[key] === "undefined" || updatedFields[key] === null) {
                delete updatedFields[key];
            }
        });

        await Product.findByIdAndUpdate(id, updatedFields);
    } catch (error) {
        console.log("Failed to update product");
        throw new Error(error);
    }

    revalidatePath(`/dashboard/products/${id}`); 
    redirect(`/dashboard/products/${id}`);
}

export const deleteProduct = async (formData) => {

    const { id } = Object.fromEntries(formData);

    try {
        connectToDB();
        const product = await Product.findByIdAndDelete(id);
    } catch (error) {
        console.log("Failed to delete product");
        throw new Error(error);
    }

    revalidatePath("/dashboard/products");
}

// Authentication functions

export const authenticate = async (prevState, formData) => {
    const data = Object.fromEntries(formData);

    const { 
        username, password,
    } = data;

    try {
        await signIn("credentials", {username, password});
    } catch (error) {
        if (error.message.includes("CredentialsSignin")) {
            return "Wrong credentials!";
        } else if (error.message.includes("NEXT_REDIRECT")) {
            return redirect("/dashboard");
        }
        console.log("Failed to authenticate user");
        throw new Error(error);
    }
}