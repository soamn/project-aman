import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const slug = formData.get("slug") as string;
  const tags = formData.get("tags") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const file = formData.get("thumbnail") as File;

  try {
    const exisitingPost = await prisma.post.findFirst({
      where: {
        slug: slug,
      },
    });
    if (exisitingPost) {
      return NextResponse.json({
        status: 403,
        success: false,
        message: "Post already exist with this slug",
      });
    }
    let thumbnailPath = "";
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const baseName = path.parse(file.name).name;
      const webpFileName = `${baseName}.webp`;
      const filePath = path.join(
        process.cwd(),
        "uploads/thumbnails",
        webpFileName
      );

      await sharp(buffer).webp({ quality: 100 }).toFile(filePath);

      thumbnailPath = `/api/uploads/thumbnails/${webpFileName}`;
    }
    await prisma.post.create({
      data: {
        title,
        description,
        slug,
        tags,
        content,
        category,
        publishedAt: new Date(),
        thumbnail: thumbnailPath,
      },
    });
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Post created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Failed to complete the request",
    });
  }
}
