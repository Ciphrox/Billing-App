import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { deleteItem, getItems } from "@/server/db/queries";

interface RequestBody {
  itemId: number;
}

export async function DELETE(request: NextRequest) {
  const { itemId }: RequestBody = await request.json();

  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 },
    );
  }

  await deleteItem(itemId, user.id);

  const data = await getItems(user.id);

  return NextResponse.json({
    data: data,
    message: "Item created successfully",
  });
}
