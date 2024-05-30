/*
  Warnings:

  - You are about to drop the column `details` on the `claims` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `claims` table. All the data in the column will be lost.
  - You are about to drop the column `lostDate` on the `claims` table. All the data in the column will be lost.
  - Added the required column `finderContactNumber` to the `claims` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "claims" DROP COLUMN "details",
DROP COLUMN "location",
DROP COLUMN "lostDate",
ADD COLUMN     "finderContactNumber" TEXT NOT NULL;
