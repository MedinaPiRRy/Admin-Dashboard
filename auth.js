import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "@/authconfig";
import { connectToDB } from "@/lib/utils";
import { User } from "@/lib/models";
import bcrypt from "bcrypt";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/dist/server/api-utils";

const login = async (credentials) => {
    try {
      await connectToDB();
      const user = await User.findOne({ username: credentials.username });
  
      if (!user) throw new Error("Wrong credentials!");
  
      const isPasswordCorrect = await bcrypt.compare(
        credentials.password,
        user.password
      );
  
      if (!isPasswordCorrect) throw new Error("Wrong credentials!");
  
      return user;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to login!");
    }
  };

export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
        async authorize(credentials) {
            try {
            const user = await login(credentials);
            return user;
            } catch (err) {
            // error while re-directing
            if (isRedirectError(err)) {
                console.error(err);
                throw err;
              }
            }
        },
        }),
    ],
    callbacks: {
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
        }
    }
});