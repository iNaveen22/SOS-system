/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserLocation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `relation` to the `EmergencyContact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmergencyContact" ADD COLUMN     "relation" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserLocation_userId_key" ON "UserLocation"("userId");
