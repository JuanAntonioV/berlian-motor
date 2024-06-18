import type { Prisma, PrismaClient } from '@prisma/client';

export async function categorieSeed(prisma: PrismaClient) {
  const categories: Prisma.CategoryCreateInput[] = [
    {
      name: 'Aksesoris',
    },
    {
      name: 'Oli',
    },
    {
      name: 'Ban',
    },
    {
      name: 'Sparepart',
    },
  ];

  for (const category of categories) {
    const isExist = await prisma.category.findFirst({
      where: {
        name: category.name,
      },
    });

    if (!isExist) {
      await prisma.category.create({
        data: category,
      });
    }
  }

  console.info('🚀 Category seed success');
}
