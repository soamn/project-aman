import { NextResponse } from "next/server";

export function checkApiKey(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (!key || key !== process.env.API_KEY) {
    return false;
  }

  return true;
}
