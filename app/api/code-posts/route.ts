import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { category: "code" },
    select: { slug: true, title: true },
    orderBy: { id: "asc" },
  });

  return NextResponse.json(posts);
}
