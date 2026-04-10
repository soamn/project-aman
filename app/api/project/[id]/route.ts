import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkApiKey } from "@/lib/apiKey";

/* GET one */
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!checkApiKey(req)) {
    return NextResponse.json(null);
  }
  const { params } = context;
  const id = Number((await params).id);
  if (isNaN(id)) return NextResponse.json(null);

  const project = await prisma.project.findUnique({
    where: { id },
  });

  return NextResponse.json(project);
}

/* UPDATE one */
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!checkApiKey(req)) {
    return NextResponse.json(null);
  }

  const { params } = context;
  const id = Number((await params).id);
  if (isNaN(id)) return NextResponse.json(null);

  try {
    const data = await req.json();

    const updated = await prisma.project.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        highlights: data.highlights,
        isPublic: data.isPublic,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        repoUrl: data.repoUrl || null,
        liveUrl: data.liveUrl || null,
        videoUrl: data.videoUrl || null,
        imageURL: data.imageURL || null,
      },
    });

    return NextResponse.json(updated);
  } catch (er) {
    console.log(er);

    return NextResponse.json(null);
  }
}

/* DELETE one */
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!checkApiKey(req)) {
    return NextResponse.json(null);
  }
  const { params } = context;
  const id = Number((await params).id);
  if (isNaN(id)) return NextResponse.json(null);

  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(null);
  }
}
