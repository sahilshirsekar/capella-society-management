import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret : process.env.AUTH_SECRET,
  session: {
    strategy: "jwt", // Use JWT strategy for sessions
  },
  pages: {
    signIn: "/signin", // Custom sign-in page
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),  

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if both email and password are provided
        if (!credentials?.email || !credentials?.password) {
          console.log("Email or password is missing.");
          return null; // Missing credentials
        }

        // Find the user by email
        const existingUser = await db.user.findUnique({
          where: {
            email: credentials.email, // Use email to find the user
          },
        });

        if (!existingUser) {
          console.log("User not found with email:", credentials.email);
          return null; // User not found
        }

        // Compare the provided password with the stored hashed password
        if(existingUser.password){
          const passwordMatch = await compare(credentials.password, existingUser.password);
          if (!passwordMatch) {
            console.log("Password mismatch for email:", credentials.email);
            return null; // Password mismatch
          }
        }

        // Return the user object to include in the JWT
        return {
          id: String(existingUser.id),
          username: existingUser.username,
          email: existingUser.email,
          image : existingUser.image || null
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user}) {
      if(user){
        return {
          ...token, 
          username : user.username
        }
      }
      return token
    },
    async session({ session, token }) {
      console.log(token, session)
      return {
        ...session, 
        user : {
          ...session.user,
          username : token.username
        }
      }
    }
  }
};
