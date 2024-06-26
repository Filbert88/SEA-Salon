/*
  Warnings:

  - Added the required column `femaleCutPrice` to the `Stylist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maleCutPrice` to the `Stylist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stylist" ADD COLUMN     "femaleCutPrice" INTEGER NOT NULL,
ADD COLUMN     "maleCutPrice" INTEGER NOT NULL;
