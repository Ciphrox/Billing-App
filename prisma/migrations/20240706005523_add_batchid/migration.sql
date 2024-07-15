/*
  Warnings:

  - Added the required column `batchId` to the `BillItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BillItem" ADD COLUMN     "batchId" VARCHAR(255) NOT NULL;
