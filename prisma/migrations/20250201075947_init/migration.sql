/*
  Warnings:

  - You are about to drop the column `password` on the `CommitteeMember` table. All the data in the column will be lost.
  - You are about to drop the `Shop` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `number` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_buildingId_fkey";

-- AlterTable
ALTER TABLE "CommitteeMember" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "number",
ADD COLUMN     "number" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Society" ADD COLUMN     "number" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Shop";

-- CreateTable
CREATE TABLE "Resident" (
    "id" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "Resident_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resident_roomId_key" ON "Resident"("roomId");

-- AddForeignKey
ALTER TABLE "Resident" ADD CONSTRAINT "Resident_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "Society"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resident" ADD CONSTRAINT "Resident_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
