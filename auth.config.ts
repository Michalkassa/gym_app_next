import { NextAuthConfig } from "next-auth";
import prisma from '@/app/api/prisma'
import { PrismaAdapter } from "@auth/prisma-adapter"

export const authConfig = {
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: "/login"
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
          const isLoggedIn = !!auth?.user;
          console.log(isLoggedIn)
          const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
          if (isOnDashboard) {
            if (isLoggedIn) return true;
            return false; // Redirect unauthenticated users to login page
          } else if (isLoggedIn) {
            return Response.redirect(new URL('/dashboard', nextUrl));
          }
          return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
