import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const file = formData.get("image") as File;

  try {
    let publicUrl = "";

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = `${Date.now()}-${file.name}`;
      const command = new PutObjectCommand({
        Bucket: "skeched-down-images",
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
        ACL: "public-read",
      });
      await r2.send(command);
      publicUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;
    }

    await prisma.imagePiece.create({
      data: {
        title,
        Image: publicUrl,
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
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Failed To complete the request",
    });
  }
}
