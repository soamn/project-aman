import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkApiKey } from "@/lib/apiKey";

export async function GET(req: Request) {
  if (!checkApiKey(req)) {
    return NextResponse.json([]);
  }

  try {
    const { searchParams } = new URL(req.url);
    const isPublicParam = searchParams.get("isPublic");

    const where =
      isPublicParam === null ? undefined : { isPublic: isPublicParam === "true" };

    const projects = await prisma.project.findMany({
      where,
      orderBy: { startDate: "desc" },
    });

    return NextResponse.json(projects);
  } catch (err) {
    console.error(err);
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    // 🔐 simple API key check
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (key !== process.env.NEXT_PUBLIC_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    // 🧼 normalize dates
    const startDate =
      data.startDate && data.startDate !== "" ? new Date(data.startDate) : null;

    const endDate =
      data.endDate && data.endDate !== "" ? new Date(data.endDate) : null;

    const project = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        highlights: data.highlights ?? [],
        isPublic: data.isPublic ?? false,
        startDate,
        endDate,
        repoUrl: data.repoUrl || null,
        liveUrl: data.liveUrl || null,
        videoUrl: data.videoUrl || null,
        imageURL: data.imageURL || null,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Create project error:", error);

    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
