import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { category: "code", published: true },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(posts);
}
