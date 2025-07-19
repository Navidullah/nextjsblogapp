// /lib/authOptions.js
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb-adapter";
import User from "@/lib/models/User";
import { ConnectToDB } from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions = {
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
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await ConnectToDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!passwordMatch) return null;
        return {
          id: user._id.toString(),
          name: user.name || user.email.split("@")[0],
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      if (!token.role && token.email) {
        await ConnectToDB();
        const dbUser = await User.findOne({ email: token.email });
        token.role = dbUser?.role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role || "user";
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
};
