import type { Prisma, PrismaClient, User } from '@prisma/client';
import { hash } from 'bcrypt';
import { format } from 'date-fns';

export async function userSeed(prisma: PrismaClient) {
  const users: Prisma.UserCreateInput[] = [
    {
      name: 'Admin',
      email: 'admin@email.com',
      password: await hash('admin123', 10),
      emailVerified: new Date(),
      image: null,
      joinDate: new Date(),
      username: 'admin',
      status: true,
    },
    {
      name: 'User',
      email: 'user@email.com',
      password: await hash('user123', 10),
      emailVerified: new Date(),
      image: null,
      joinDate: new Date(),
      username: 'user',
      status: true,
    },
  ];

  const adminRole = await prisma.roles.findFirst({
    where: {
      name: 'Admin',
    },
  });

  for (const user of users) {
    const isExist = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (!isExist) {
      const userData = await prisma.user.create({
        data: user,
      });

      if (userData && adminRole) {
        await prisma.userRoles.create({
          data: {
            userId: userData.id,
            roleId: adminRole.id,
          },
        });
      }
    }
  }

  console.info('🚀 User seed success');
}
