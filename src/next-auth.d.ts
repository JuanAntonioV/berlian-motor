import { Prisma, Roles, UserWithRoles } from '@prisma/client';
import NextAuth, { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

type UserWithRoles = Prisma.UserGetPayload<{
  include: {
    Roles: {
      include: {
        Role: true;
      };
    };
  };
}>;

declare module 'next-auth' {
  interface Session {
    id: number;
    Roles: UserWithRoles[];
    role: number[];
    joinDate: Date;
  }

  interface User {
    id: number;
    Roles: UserWithRoles[];
    role: number[];
    joinDate: Date;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: number;
    Roles: UserWithRoles[];
    role: number[];
    joinDate: Date;
  }
}
