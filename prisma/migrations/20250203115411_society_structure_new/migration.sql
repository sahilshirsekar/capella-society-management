/*
  Warnings:

  - You are about to drop the column `residentId` on the `Room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roomId]` on the table `Resident` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_residentId_fkey";

-- DropIndex
DROP INDEX "Room_residentId_key";

-- AlterTable
ALTER TABLE "Resident" ADD COLUMN     "roomId" TEXT;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "residentId";

-- CreateIndex
CREATE UNIQUE INDEX "Resident_roomId_key" ON "Resident"("roomId");

-- AddForeignKey
ALTER TABLE "Resident" ADD CONSTRAINT "Resident_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
