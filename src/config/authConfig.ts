import db from '@/lib/db';
import { compare } from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, req): Promise<any> => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        let user = null;

        if (!email || !password) {
          return null;
        }

        user = await db.user.findFirst({
          where: {
            email,
          },
          include: {
            Roles: {
              include: {
                Role: true,
              },
            },
          },
        });

        if (!user) {
          return null;
        }

        const isValid = await compare(password, user.password!);

        if (!isValid) {
          return null;
        }

        const { password: _, ...userWithoutPassword } = user;
        userWithoutPassword.id = parseInt(String(userWithoutPassword.id));

        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === 'update') {
        const userData = await db.user.findUnique({
          where: { id: token.id },
        });

        token.name = userData?.name;
        token.email = userData?.email;
        token.image = userData?.image;
      }

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
            name: token.name,
            email: token.email,
            image: token.image as string | null,
          },
        };
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;
