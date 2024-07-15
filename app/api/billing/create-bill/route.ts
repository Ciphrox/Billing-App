import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { createBill } from "@/server/db/queries";

export async function POST(request: NextRequest) {
  // console.log(request.body);
  // return request.body;
  const data = await request.json();

  // console.log(data);

  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 },
    );
  }
  await createBill(user.id, data, user.id);

  return NextResponse.json({ message: "Bill created successfully" });
}
