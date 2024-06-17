import type { Prisma, PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { format } from 'date-fns';

export async function roleSeed(prisma: PrismaClient) {
  const roles: Prisma.RolesCreateInput[] = [
    {
      name: 'Admin',
      status: true,
    },
    {
      name: 'Karyawan',
      status: true,
    },
  ];

  for (const role of roles) {
    const isExist = await prisma.roles.findFirst({
      where: {
        name: role.name,
      },
    });

    if (!isExist) {
      await prisma.roles.create({
        data: role,
      });
    }
  }

  console.info('🚀 Role seed success');
}
