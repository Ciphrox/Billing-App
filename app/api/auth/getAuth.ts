import type { NextApiRequest, NextApiResponse } from "next";

import { getAuth } from "@clerk/nextjs/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId } = getAuth(req);

  // Add logic that retrieves the data for the API route

  return res.status(200).json({ userId: userId });
}
