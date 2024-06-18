import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import db from './db';
import { Adapter } from 'next-auth/adapters';
import authConfig from '@/config/authConfig';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  pages: {
    signIn: '/auth/login',
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (user) {
        return {
          ...token,
          id: parseInt(String(user.id)),
          role: user.Roles.map((role) => role.Role.id),
          Roles: user.Roles,
          joinDate: user.joinDate,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session?.user) {
        return {
          ...session,
          user: {
            ...session.user,
            id: String(token.id),
            role: token.role,
            Roles: token.Roles,
            joinDate: token.joinDate,
          },
        };
      }
      return session;
    },
  },
  ...authConfig,
});
