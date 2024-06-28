-- DropForeignKey
ALTER TABLE "Stylist" DROP CONSTRAINT "Stylist_branchId_fkey";

-- AlterTable
ALTER TABLE "Stylist" ALTER COLUMN "branchId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Stylist" ADD CONSTRAINT "Stylist_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
