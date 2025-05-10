import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const file = formData.get("image") as File;

  try {
    let thumbnailPath = "";

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      const baseName = path.parse(file.name).name;
      const webpFileName = `${baseName}.webp`;
      const dir = path.join(process.cwd(), `uploads/gallery/${year}/${month}`);
      const filePath = path.join(dir, webpFileName);
      fs.mkdirSync(dir, { recursive: true });
      await sharp(buffer).webp({ quality: 100 }).toFile(filePath);
      thumbnailPath = `/api/uploads/gallery/${year}/${month}/${webpFileName}`;
    }

    await prisma.imagePiece.create({
      data: {
        title,
        Image: thumbnailPath,
      },
    });
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return NextResponse.json({
      status: 200,
      success: true,
      message: "uploaded successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Failed To complete the request",
    });
  }
}
