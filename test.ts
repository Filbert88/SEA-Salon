import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      fullName: 'filbert',
      email: 'filbert@gmail.com',
      phone: '1234567890',
      password: 'securepassword',
      role: 'CUSTOMER',
    },
  });
  console.log('New User:', newUser);

  // Fetch all users
  const allUsers = await prisma.user.findMany();
  console.log('All Users:', allUsers);

  // Update a user
  const updatedUser = await prisma.user.update({
    where: { id: newUser.id },
    data: { phone: '0987654321' },
  });
  console.log('Updated User:', updatedUser);

  // Delete a user
  const deletedUser = await prisma.user.delete({
    where: { id: newUser.id },
  });
  console.log('Deleted User:', deletedUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
