/*
  Warnings:

  - You are about to drop the column `femaleCutPrice` on the `Stylist` table. All the data in the column will be lost.
  - You are about to drop the column `maleCutPrice` on the `Stylist` table. All the data in the column will be lost.
  - Added the required column `phone` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stylistId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guest" ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "stylistId" INTEGER NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Stylist" DROP COLUMN "femaleCutPrice",
DROP COLUMN "maleCutPrice";

-- CreateIndex
CREATE INDEX "Reservation_stylistId_idx" ON "Reservation"("stylistId");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_stylistId_fkey" FOREIGN KEY ("stylistId") REFERENCES "Stylist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
