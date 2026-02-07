import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const email = process.env.EMAIL_ID || "";
    const user = await prisma.user.findUnique({
      where: { email },
      select: { about: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch about" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { email, key, about } = await req.json();

    // basic validation
    if (!email || !key) {
      return NextResponse.json(
        { error: "Email and API key are required" },
        { status: 400 },
      );
    }

    if (key !== process.env.API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (typeof about !== "string") {
      return NextResponse.json(
        { error: "`about` must be a string" },
        { status: 400 },
      );
    }

    // update about
    const user = await prisma.user.update({
      where: { email },
      data: { about },
      select: { about: true },
    });

    return NextResponse.json({
      success: true,
      about: user.about,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to update about" },
      { status: 500 },
    );
  }
}
