import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: number }> }
) {
  const { params } = context;
  const id = (await params).id;
  try {
    const likedPost = await prisma.imagePiece.findFirst({
      where: {
        id: Number(id),
      },
    });

    let likes = likedPost?.Likes;
    if (!likes) {
      likes = 0;
    }
    likes++;
    const updatedPost = await prisma.imagePiece.update({
      where: { id: Number(id) },
      data: { Likes: likes },
      select: { Likes: true, id: true },
    });
    const res = {
      Likes: updatedPost.Likes,
      slug: `gallery/${updatedPost.id}`,
    };
    revalidatePath("/");
    revalidatePath("/gallery");

    return NextResponse.json({
      success: true,
      status: 200,
      message: res,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Failed to complete the request",
    });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: number }> }
) {
  const { params } = context;
  const id = (await params).id;

  try {
    const image = await prisma.imagePiece.delete({
      where: {
        id: Number(id),
      },
    });

    if (!image) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "Image not found",
      });
    }

    const publicUrl = image.Image;
    const publicPrefix = process.env.R2_PUBLIC_URL!;
    const key = publicUrl.replace(`${publicPrefix}/`, "");
    const objectKey = key;
    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: objectKey,
    });

    await r2.send(command);

    revalidatePath("/");
    revalidatePath("/gallery");

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Failed to delete",
    });
  }
}
