"use server"
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User, Product } from './models.js';
import { connectToDB } from './utils.js';
import { PRODUCT_CATEGORIES, PROTECTED_USERNAME } from './constants.js';
import { auth, signIn } from '../../auth.js';

// Helpers

const requireSession = async () => {
    const session = await auth();
    if (!session?.user) throw new Error("Not authenticated");
    return session;
};

const text = (formData, key) => {
    const value = formData.get(key);
    return typeof value === 'string' ? value.trim() : '';
};

const toNumber = (value) => (value === '' ? NaN : Number(value));

// Maps a database error to one of the codes in ERROR_MESSAGES
const errorCode = (error, duplicateCode) => {
    if (error?.code === 11000) return duplicateCode;
    if (error?.name === 'ValidationError' || error?.name === 'CastError') return 'invalid';
    console.error(error);
    return 'failed';
};

const fail = (path, code) => redirect(`${path}?error=${code}`);

// User functions

export const createUser = async (formData) => {
    await requireSession();
    const addPath = '/dashboard/users/add';

    const username = text(formData, 'username');
    const email = text(formData, 'email');
    const password = formData.get('password') ?? '';
    const retype = formData.get('retype') ?? '';

    if (password !== retype) fail(addPath, 'passwordMismatch');
    if (password.length < 8) fail(addPath, 'passwordShort');

    let error = null;
    try {
        await connectToDB();
        await User.create({
            username,
            email,
            password: await bcrypt.hash(password, 10),
            phone: text(formData, 'phone') || undefined,
            address: text(formData, 'address') || undefined,
            isAdmin: formData.get('isAdmin') === 'true',
            isActive: formData.get('isActive') !== 'false',
        });
    } catch (err) {
        error = errorCode(err, 'duplicateUser');
    }
    if (error) fail(addPath, error);

    revalidatePath('/dashboard/users');
    redirect('/dashboard/users');
};

export const updateUser = async (formData) => {
    await requireSession();
    const id = text(formData, 'id');
    if (!mongoose.isValidObjectId(id)) fail('/dashboard/users', 'notFound');
    const editPath = `/dashboard/users/${id}`;

    const password = formData.get('password') ?? '';
    const retype = formData.get('retype') ?? '';
    if (password !== retype) fail(editPath, 'passwordMismatch');
    if (password && password.length < 8) fail(editPath, 'passwordShort');

    // Only touch the password when a new one was typed; everything else is saved as submitted
    // (so `isActive: false`, an empty phone or a stock of 0 are all valid values).
    const fields = {
        username: text(formData, 'username'),
        email: text(formData, 'email'),
        // An empty optional field clears the value (undefined unsets it in Mongoose)
        phone: text(formData, 'phone') || undefined,
        address: text(formData, 'address') || undefined,
        isAdmin: formData.get('isAdmin') === 'true',
        isActive: formData.get('isActive') === 'true',
    };
    if (password) fields.password = await bcrypt.hash(password, 10);

    let error = null;
    try {
        await connectToDB();
        const user = await User.findById(id).select('username');
        if (!user) {
            error = 'notFound';
        } else if (user.username === PROTECTED_USERNAME) {
            error = 'protectedUser';
        } else {
            user.set(fields);
            await user.save();
        }
    } catch (err) {
        error = errorCode(err, 'duplicateUser');
    }
    if (error) fail(editPath, error);

    revalidatePath('/dashboard/users');
    revalidatePath(editPath);
    redirect(`${editPath}?success=updated`);
};

export const deleteUser = async (formData) => {
    const session = await requireSession();
    const id = text(formData, 'id');
    const listPath = '/dashboard/users';
    if (!mongoose.isValidObjectId(id)) fail(listPath, 'notFound');

    let error = null;
    try {
        await connectToDB();
        const user = await User.findById(id).select('username');
        if (!user) {
            error = 'notFound';
        } else if (user.username === PROTECTED_USERNAME) {
            error = 'protectedUser';
        } else if (user.username === session.user.username) {
            error = 'selfDelete';
        } else {
            await user.deleteOne();
        }
    } catch (err) {
        error = errorCode(err);
    }
    if (error) fail(listPath, error);

    revalidatePath(listPath);
    redirect(listPath);
};

// Product functions

const readProduct = (formData) => ({
    title: text(formData, 'title'),
    category: text(formData, 'cat'),
    price: toNumber(text(formData, 'price')),
    stock: toNumber(text(formData, 'stock')),
    color: text(formData, 'color'),
    size: text(formData, 'size'),
    desc: text(formData, 'desc') || 'No Description Available',
});

const isValidProduct = (p) =>
    p.title &&
    p.category &&
    Number.isFinite(p.price) && p.price >= 0 &&
    Number.isInteger(p.stock) && p.stock >= 0;

export const createProduct = async (formData) => {
    await requireSession();
    const addPath = '/dashboard/products/add';
    const product = readProduct(formData);
    if (!isValidProduct(product) || !PRODUCT_CATEGORIES.some((c) => c.value === product.category)) fail(addPath, 'invalid');

    let error = null;
    try {
        await connectToDB();
        await Product.create(product);
    } catch (err) {
        error = errorCode(err, 'duplicateProduct');
    }
    if (error) fail(addPath, error);

    revalidatePath('/dashboard/products');
    redirect('/dashboard/products');
};

export const updateProduct = async (formData) => {
    await requireSession();
    const id = text(formData, 'id');
    if (!mongoose.isValidObjectId(id)) fail('/dashboard/products', 'notFound');
    const editPath = `/dashboard/products/${id}`;
    const product = readProduct(formData);
    if (!isValidProduct(product)) fail(editPath, 'invalid');

    let error = null;
    try {
        await connectToDB();
        const updated = await Product.findByIdAndUpdate(id, product, { runValidators: true });
        if (!updated) error = 'notFound';
    } catch (err) {
        error = errorCode(err, 'duplicateProduct');
    }
    if (error) fail(editPath, error);

    revalidatePath('/dashboard/products');
    revalidatePath(editPath);
    redirect(`${editPath}?success=updated`);
};

export const deleteProduct = async (formData) => {
    await requireSession();
    const id = text(formData, 'id');
    const listPath = '/dashboard/products';
    if (!mongoose.isValidObjectId(id)) fail(listPath, 'notFound');

    let error = null;
    try {
        await connectToDB();
        await Product.findByIdAndDelete(id);
    } catch (err) {
        error = errorCode(err);
    }
    if (error) fail(listPath, error);

    revalidatePath(listPath);
    redirect(listPath);
};

// Authentication

export const authenticate = async (prevState, formData) => {
    const username = text(formData, 'username');
    const password = formData.get('password');

    try {
        await signIn("credentials", { username, password, redirectTo: "/dashboard" });
    } catch (error) {
        // A successful sign-in finishes by throwing a redirect, which must be re-thrown.
        if (typeof error?.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")) throw error;
        // This NextAuth beta reports bad credentials as an Error whose message is "CredentialsSignin".
        if (String(error?.message).includes("CredentialsSignin")) return "Wrong credentials!";
        console.error("Failed to authenticate user", error);
        return "Something went wrong. Please try again.";
    }
};
