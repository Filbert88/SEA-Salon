/*
  Warnings:

  - Added the required column `price` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "price" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Stylist" ADD COLUMN     "price" BIGINT NOT NULL DEFAULT 0;
