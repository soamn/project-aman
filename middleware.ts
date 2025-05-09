import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(req: NextRequest) {
  const session = await auth();
  if (session) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
