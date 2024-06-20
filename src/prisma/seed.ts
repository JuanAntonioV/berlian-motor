import { PrismaClient } from '@prisma/client';
import { userSeed } from './seeders/userSeed';
import { roleSeed } from './seeders/roleSeed';
import { categorieSeed } from './seeders/categoriesSeed';
import { storeSeed } from './seeders/storeSeed';

const prisma = new PrismaClient();

async function main() {
  await roleSeed(prisma);
  await userSeed(prisma);
  await categorieSeed(prisma);
  await storeSeed(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
