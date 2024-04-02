import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "@/app/authconfig";
import { connectToDB } from "@/lib/utils";
import { User } from "@/lib/models";
import bcrypt from "bcrypt";

const login = async (credentials) => {
    try {
        connectToDB();
        const user = await User.findOne({username:credentials.username});

        if (!user) {throw new Error("No user found!");}

        const isPasswordCorrect = await bcrypt.comparePassword(credentials.password, user.password);

        if (!isPasswordCorrect) {throw new Error("Invalid Password!");}

        return user;

    } catch (error) {
        console.log(error);
        throw new Error("Failed to Login!");
    }

}

export const {signIn, singOut, auth} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (error) {
                    console.log(error);
                    return null;
                }
            },
        }),
    ], 
});