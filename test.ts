import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function updateStylistPrices() {
  // Array of prices for stylists with IDs from 2 to 28
  const prices = [
    100000, // price for stylist with ID 2
    105000, // price for stylist with ID 3
    110000, // price for stylist with ID 4
    200000,
    300000,
    150000,
    188000,
    188000,
    169000,
    95000,
    100000,
    100000,
    120000,
    125000,
    125000,
    140000,
    150000,
    165000,
    120000,
    100000, // price for stylist with ID 2
    105000, // price for stylist with ID 3
    110000, // price for stylist with ID 4
    200000,
    300000,
    150000,
    178000,
    100000,

    // Add more prices for each stylist up to ID 28
  ];

  try {
    // Loop through each price and update the corresponding stylist
    for (let i = 0; i < prices.length; i++) {
      const stylistId = i + 2; // Since array index starts at 0 and stylist IDs start at 2
      await prisma.stylist.update({
        where: { id: stylistId },
        data: { price: prices[i] },
      });
    }
    console.log("Prices updated successfully.");
  } catch (error) {
    console.error("Error updating stylist prices:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateStylistPrices();
