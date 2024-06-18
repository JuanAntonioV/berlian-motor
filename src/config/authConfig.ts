import db from '@/lib/db';
import { compare } from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const authConfig = {
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
} satisfies NextAuthConfig;

export default authConfig;
