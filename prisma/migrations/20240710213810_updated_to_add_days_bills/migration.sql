/*
  Warnings:

  - You are about to drop the column `billDate` on the `BillItem` table. All the data in the column will be lost.
  - The primary key for the `Billing` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Billing` table. All the data in the column will be lost.
  - Added the required column `billId` to the `BillItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billDate` to the `Billing` table without a default value. This is not possible if the table is not empty.
  - Made the column `price` on table `Items` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `Items` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BillItem" DROP CONSTRAINT "BillItem_billDate_fkey";

-- DropForeignKey
ALTER TABLE "Billing" DROP CONSTRAINT "Billing_userId_fkey";

-- AlterTable
ALTER TABLE "BillItem" DROP COLUMN "billDate",
ADD COLUMN     "billId" INTEGER NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "type" SET DATA TYPE TEXT,
ALTER COLUMN "expiry" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "batchId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Billing" DROP CONSTRAINT "Billing_pkey",
DROP COLUMN "date",
DROP COLUMN "userId",
ADD COLUMN     "billDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Billing_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Items" ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" DROP DEFAULT,
ALTER COLUMN "type" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "DayBilling" (
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DayBilling_pkey" PRIMARY KEY ("date")
);

-- AddForeignKey
ALTER TABLE "BillItem" ADD CONSTRAINT "BillItem_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Billing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_billDate_fkey" FOREIGN KEY ("billDate") REFERENCES "DayBilling"("date") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DayBilling" ADD CONSTRAINT "DayBilling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
