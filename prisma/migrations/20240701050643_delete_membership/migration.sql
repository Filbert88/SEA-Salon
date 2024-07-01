/*
  Warnings:

  - You are about to drop the column `isMember` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `membershipExpiry` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isMember",
DROP COLUMN "membershipExpiry";
