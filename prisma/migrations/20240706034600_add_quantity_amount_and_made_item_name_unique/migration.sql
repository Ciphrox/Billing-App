/*
  Warnings:

  - You are about to drop the column `billId` on the `BillItem` table. All the data in the column will be lost.
  - The primary key for the `Billing` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Billing` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Items` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `BillItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billDate` to the `BillItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `BillItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BillItem" DROP CONSTRAINT "BillItem_billId_fkey";

-- AlterTable
ALTER TABLE "BillItem" DROP COLUMN "billId",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "billDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Billing" DROP CONSTRAINT "Billing_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Billing_pkey" PRIMARY KEY ("date");

-- CreateIndex
CREATE UNIQUE INDEX "Items_name_key" ON "Items"("name");

-- AddForeignKey
ALTER TABLE "BillItem" ADD CONSTRAINT "BillItem_billDate_fkey" FOREIGN KEY ("billDate") REFERENCES "Billing"("date") ON DELETE NO ACTION ON UPDATE NO ACTION;
