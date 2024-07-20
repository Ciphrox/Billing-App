-- DropForeignKey
ALTER TABLE "DayBilling" DROP CONSTRAINT "DayBilling_userId_fkey";

-- AddForeignKey
ALTER TABLE "DayBilling" ADD CONSTRAINT "DayBilling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
