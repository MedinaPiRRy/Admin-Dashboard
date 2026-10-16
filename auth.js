import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { authConfig } from "@/authconfig";
import { connectToDB } from "@/lib/utils";
import { User } from "@/lib/models";

export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            // Returning null means "wrong credentials". Unexpected errors (e.g. the
            // database being unreachable) are thrown so the login form can show a
            // generic error instead of claiming the password was wrong.
            async authorize(credentials) {
                const { username, password } = credentials ?? {};
                if (typeof username !== "string" || typeof password !== "string" || !username || !password) {
                    return null;
                }

                await connectToDB();
                const user = await User.findOne({ username }).lean();
                if (!user || user.isActive === false) return null;

                const isPasswordCorrect = await bcrypt.compare(password, user.password);
                if (!isPasswordCorrect) return null;

                return {
                    id: String(user._id),
                    name: user.username,
                    username: user.username,
                    img: user.img,
                    isAdmin: user.isAdmin,
                };
            },
        }),
    ],
    callbacks: {
        ...authConfig.callbacks,
        async jwt({ token, user }) {
            if (user) {
                token.username = user.username;
                token.img = user.img;
                token.isAdmin = user.isAdmin;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.username = token.username;
                session.user.img = token.img;
                session.user.isAdmin = token.isAdmin;
            }
            return session;
        },
    },
});
