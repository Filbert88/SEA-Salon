import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete all records in the correct order to avoid foreign key constraints issues
  await prisma.review.deleteMany({});
  // await prisma.reservation.deleteMany({});
  await prisma.stylist.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.branch.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.stylist.deleteMany({});

  console.log('All data deleted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
