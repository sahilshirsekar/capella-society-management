/*
  Warnings:

  - You are about to drop the column `roomId` on the `Resident` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Society` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[residentId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `societyNumber` to the `Society` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Resident" DROP CONSTRAINT "Resident_roomId_fkey";

-- DropIndex
DROP INDEX "CommitteeMember_email_key";

-- DropIndex
DROP INDEX "Resident_roomId_key";

-- AlterTable
ALTER TABLE "Resident" DROP COLUMN "roomId";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "residentId" TEXT;

-- AlterTable
ALTER TABLE "Society" DROP COLUMN "number",
ADD COLUMN     "societyNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Room_residentId_key" ON "Room"("residentId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE CASCADE ON UPDATE CASCADE;
