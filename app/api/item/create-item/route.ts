import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { createItem, getItems } from "@/server/db/queries";

interface RequestBody {
  itemName: string;
  itemType: string;
  itemPrice: number;
}

export async function POST(request: Request) {
  const { itemName, itemType, itemPrice }: RequestBody = await request.json();

  if (!itemName || !itemType || !itemPrice) {
    return NextResponse.json(
      { error: "Incomplete Request" },
      { status: 400 },
    );
  }

  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 },
    );
  }
  const item = {
    name: itemName as string,
    type: itemType as string,
    price: itemPrice as number,
  };

  await createItem(user.id, item);

  const data = await getItems(user.id);

  return NextResponse.json({
    data: data,
    message: "Item created successfully",
  });
}
