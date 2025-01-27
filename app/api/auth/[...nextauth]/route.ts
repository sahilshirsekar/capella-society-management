import GoogleProvider from "next-auth/providers/google";

import { compare } from "bcrypt";
import NextAuth from "next-auth";


if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth environment variables");
}

export const AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret : process.env.AUTH_SECRET,
};

const handler = NextAuth(AuthOptions);
export {handler as GET, handler as POST};