import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import db from './db';
import { Adapter } from 'next-auth/adapters';
import authConfig from '@/config/authConfig';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
