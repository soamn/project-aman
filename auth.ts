import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        user = await prisma.user.findFirst({
          where: {
            email: credentials.email || "",
          },
        });

        if (!user) {
          return null;
        }
        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    error: "/signin",
  },
  trustHost: true,
});
