/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `DayBilling` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[date,userId]` on the table `DayBilling` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DayBilling_date_key" ON "DayBilling"("date");

-- CreateIndex
CREATE UNIQUE INDEX "DayBilling_date_userId_key" ON "DayBilling"("date", "userId");
