import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import { revalidatePath } from "next/cache";
import sharp from "sharp";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2"; 
import { randomUUID } from "crypto";

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
        message: "Post already exists with this slug",
      });
    }

    let thumbnailPath = "";

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const webpBuffer = await sharp(buffer).webp({ quality: 100 }).toBuffer();
      const uniqueFileName = `${randomUUID()}.webp`;

      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: uniqueFileName,
        Body: webpBuffer,
        ContentType: "image/webp",
      });

      await r2.send(command);
      thumbnailPath = `${process.env.R2_PUBLIC_URL}/${uniqueFileName}`;
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
    console.error("Upload failed:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Failed to complete the request",
    });
  }
}
