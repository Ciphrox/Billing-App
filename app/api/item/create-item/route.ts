import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod";

import { createItem, getItems } from "@/server/db/queries";
import { revalidatePath } from "next/cache";

const itemSchema = z.object({
  itemName: z.string().min(1, { message: "Item name is required" }),
  itemType: z.string().min(1, { message: "Item type is required" }),
  itemPrice: z
    .number()
    .min(0, { message: "Item price must be a non-negative number" }),
});

export async function POST(request: Request) {
  try {
    const { itemName, itemType, itemPrice } = itemSchema.parse(
      await request.json(),
    );

    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    const item = {
      name: itemName,
      type: itemType,
      price: itemPrice,
    };

    await createItem(user.id, item);

    const data = await getItems(user.id);

    // revalidatePath("/items");

    return NextResponse.json({
      data: data,
      message: "Item created successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle Zod validation errors
      return NextResponse.json(
        { error: error.errors.map((e) => e.message).join(", ") },
        { status: 400 },
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
