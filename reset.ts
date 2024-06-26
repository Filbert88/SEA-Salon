import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function resetSequences() {
  const resetQueries = [
    'ALTER SEQUENCE "User_id_seq" RESTART WITH 1;',
    'ALTER SEQUENCE "Service_id_seq" RESTART WITH 1;',
    'ALTER SEQUENCE "Review_id_seq" RESTART WITH 1;',
    'ALTER SEQUENCE "Reservation_id_seq" RESTART WITH 1;',
    'ALTER SEQUENCE "Branch_id_seq" RESTART WITH 1;',
    'ALTER SEQUENCE "Stylist_id_seq" RESTART WITH 1;',
  ];

  try {
    for (const query of resetQueries) {
      await prisma.$executeRawUnsafe(query);
    }
    console.log("Sequences have been reset.");
  } catch (error) {
    console.error("Error resetting sequences:", error);
  } finally {
    await prisma.$disconnect();
  }
}

resetSequences()
  .catch((e) => {
    console.error("Error in resetSequences function:", e);
    process.exit(1);
  });
