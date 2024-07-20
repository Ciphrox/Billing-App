-- DropForeignKey
ALTER TABLE "Billing" DROP CONSTRAINT "Billing_DayBillingId_fkey";

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_DayBillingId_fkey" FOREIGN KEY ("DayBillingId") REFERENCES "DayBilling"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
