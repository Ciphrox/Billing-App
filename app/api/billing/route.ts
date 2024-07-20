import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { getUserDailyBills } from "@/server/db/queries";
import { NextApiRequest } from "next";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 },
    );
  }

  const bills = await getUserDailyBills(user.id);

  return NextResponse.json({
    message: "Bill fetched successfully",
    data: bills,
  });
}