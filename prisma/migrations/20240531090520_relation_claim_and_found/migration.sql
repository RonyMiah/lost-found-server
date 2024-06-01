/*
  Warnings:

  - Added the required column `foundId` to the `claims` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "claims" ADD COLUMN     "foundId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "claims" ADD CONSTRAINT "claims_foundId_fkey" FOREIGN KEY ("foundId") REFERENCES "founditems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
