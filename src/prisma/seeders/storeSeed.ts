import type { Prisma, PrismaClient } from '@prisma/client';

export async function storeSeed(prisma: PrismaClient) {
  const stores: Prisma.StoreCreateInput[] = [
    {
      name: 'Berlian Motor',
      description: 'Toko utama',
      status: true,
    },
  ];

  for (const store of stores) {
    const isExist = await prisma.store.findFirst({
      where: {
        name: store.name,
      },
    });

    if (!isExist) {
      await prisma.store.create({
        data: store,
      });
    }
  }

  console.info('🚀 Store seed success');
}
