/*
  Warnings:

  - You are about to drop the column `billDate` on the `Billing` table. All the data in the column will be lost.
  - The primary key for the `DayBilling` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[date,userId]` on the table `DayBilling` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,userId]` on the table `Items` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `DayBillingId` to the `Billing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Billing" DROP CONSTRAINT "Billing_billDate_fkey";

-- DropIndex
DROP INDEX "Items_name_key";

-- AlterTable
ALTER TABLE "Billing" DROP COLUMN "billDate",
ADD COLUMN     "DayBillingId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DayBilling" DROP CONSTRAINT "DayBilling_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "DayBilling_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Items" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "DayBilling_date_userId_key" ON "DayBilling"("date", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Items_name_userId_key" ON "Items"("name", "userId");

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_DayBillingId_fkey" FOREIGN KEY ("DayBillingId") REFERENCES "DayBilling"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
