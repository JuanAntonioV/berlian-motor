import { PrismaClient } from '@prisma/client';
import { userSeed } from './seeders/userSeed';
import { roleSeed } from './seeders/roleSeed';

const prisma = new PrismaClient();

async function main() {
  await roleSeed(prisma);
  await userSeed(prisma);
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
