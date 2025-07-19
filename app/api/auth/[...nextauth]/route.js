/*import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace this with your real DB logic
        if (
          credentials.email === "admin@example.com" &&
          credentials.password === "admin123"
        ) {
          return {
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
          };
        }
        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login", // custom login page
  },
});

export { handler as GET, handler as POST };*/
/*
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb-adapter";
import User from "@/lib/models/User";
import { connectToDB } from "@/lib/db";
import bcrypt from "bcrypt";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        await connectToDB();
        console.log("🔐 Logging in with:", credentials);

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          console.log("❌ User not found");
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!passwordMatch) {
          console.log("❌ Invalid password");
          return null;
        }
        console.log("✅ Authenticated:", user.email);

        // ✅ Return plain object, not Mongoose document
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  // ✅ These callbacks are MANDATORY for credentials to work with sessions
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("🟢 session callback triggered");
      console.log("token:", token); // Debug here
      console.log("session before mutation:", session);
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      console.log("session after mutation:", session);
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };*/

// app/api/auth/[...nextauth]/route.js
import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
