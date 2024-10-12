import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { getItems } from "@/server/db/queries";

export async function GET() {
  const headers = {
    "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_API_URL}`,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401, headers },
    );
  }

  try {
    const items = await getItems(user.id);

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items found for this user" },
        { status: 404, headers },
      );
    }

    return NextResponse.json(items, { headers });
  } catch (error) {
    // console.error("Error fetching items:", error);

    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500, headers },
    );
  }
}
