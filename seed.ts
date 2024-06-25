import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  // Create branches
  // const branches = [];
  // for (let i = 0; i < 5; i++) {
  //   const branch = await prisma.branch.create({
  //     data: {
  //       name: faker.company.name(),
  //       location: faker.address.city(),
  //       openingTime: new Date(2000, 1, 1, 8, 0, 0), // 8 AM
  //       closingTime: new Date(2000, 1, 1, 18, 0, 0), // 6 PM
  //     },
  //   });
  //   branches.push(branch);
  // }

  // Create services
  // const services = [];
  // for (let i = 0; i < 20; i++) {
  //   const service = await prisma.service.create({
  //     data: {
  //       name: faker.commerce.productName(),
  //       duration: faker.datatype.number({ min: 30, max: 120 }),
  //       branchId: branches[faker.datatype.number({ min: 0, max: branches.length - 1 })].id,
  //     },
  //   });
  //   services.push(service);
  // }

  // Create users
  // const users = [];
  // for (let i = 0; i < 50; i++) {
  //   const user = await prisma.user.create({
  //     data: {
  //       fullName: faker.name.fullName(),
  //       email: faker.internet.email(),
  //       phone: faker.phone.number(),
  //       password: faker.internet.password(),
  //       role: 'CUSTOMER',
  //     },
  //   });
  //   users.push(user);
  // }

  // Create reviews
  // for (let i = 0; i < 100; i++) {
  //   await prisma.review.create({
  //     data: {
  //       customerId: users[faker.datatype.number({ min: 0, max: users.length - 1 })].id,
  //       starRating: faker.datatype.number({ min: 1, max: 5 }),
  //       comment: faker.lorem.sentence(),
  //     },
  //   });
  // }

  // Create reservations
  // for (let i = 0; i < 200; i++) {
  //   await prisma.reservation.create({
  //     data: {
  //       userId: users[faker.datatype.number({ min: 0, max: users.length - 1 })].id,
  //       serviceId: services[faker.datatype.number({ min: 0, max: services.length - 1 })].id,
  //       date: faker.date.soon(),
  //     },
  //   });
  // }

  const hashedPassword = await bcrypt.hash('Admin123', 10); 

  const adminUser = await prisma.user.create({
    data: {
      fullName: 'Thomas N',
      email: 'thomas.n@compfest.id',
      phone: '08123456789',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log({ adminUser });

  console.log('Seed data has been created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
