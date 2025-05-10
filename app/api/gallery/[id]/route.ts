import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { revalidatePath } from "next/cache";

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

    const imageRelativePath = image.Image.replace(/^\/api/, "");
    const filePath = path.join(process.cwd(), imageRelativePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    revalidatePath("/");
    revalidatePath("/gallery");
    return NextResponse.json({
      success: true,
      status: 200,
      message: "deleted successfully",
    });
  } catch {
    return NextResponse.json({
      success: false,
      status: 500,
      message: "failed to delete",
    });
  }
}
