import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User
  }

  interface User {
    id: string,
    email: string,
    oauth: boolean, // Created using Oauth
    image?: string,
    bio?: string,
    phone?: string,
    name?: string,
    password?: string,
  }
}