import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { deleteDayBill } from "@/server/db/queries";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { dayBillingId: string } },
) {
  // console.log(params);
  const dayBillingId = parseInt(params.dayBillingId);

  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 },
    );
  }

  await deleteDayBill(user.id, dayBillingId);

  revalidatePath("/billing");

  return NextResponse.json({
    message: "Bill deleted successfully",
  });
}
