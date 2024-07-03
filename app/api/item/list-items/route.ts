import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { getItems } from "@/server/db/queries";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 },
    );
  }

  const items = await getItems(user.id);
//   console.log(items)
//   console.log(typeof items);
//   if (items) console.log(items[0]);

  return NextResponse.json(items);
}
