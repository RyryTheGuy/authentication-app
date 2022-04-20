import NextAuth from "next-auth/next";
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import { User } from "next-auth";

interface AuthorizationResponse {
  user: null | User;
  message: string;
}

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
    maxAge: 2 * 24 * 60 * 60, // 2 days
  },
  pages: {
    signIn: '/signUp',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        id: { label: 'New User Id', type: 'text' }
      }, 
      async authorize(credentials, request) {
        const nextAuthUrl = process.env.NEXTAUTH_URL;
        // Take credentials and send them to the backend to get the user
        // Credentials will either have a username & password or the id of the inserted user
        const res = await fetch(`${nextAuthUrl}/api/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        });
        const returnedData: AuthorizationResponse = await res.json();
        // console.log('USER:', returnedData);
        
        // If no error and we have user data, return it
        if (res.ok && returnedData.user) {
          return returnedData.user;
        }
        // Return null if user data could not be retrieved
        return null;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          password: null,
          image: profile.picture,
          bio: null,
          phone: null,
        }
      }
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (account && user) {
        // Change _id to id so it matches the next auth user interface
        user.id = user._id as string;
        
        // Return all the user properties from the database except the password
        delete user._id;
        delete user.password;
        token.accessToken = account.access_token;
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as User;

      return session;
    }
  }
});