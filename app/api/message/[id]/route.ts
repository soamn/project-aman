import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { params } = context;
  const id = (await params).id;
  try {
    const Messages = await prisma.message.findMany({
      where: {
        sender: id,
      },
    });
    return NextResponse.json({
      success: true,
      status: 200,
      message: Messages,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: "failed To complete reuest",
    });
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { params } = context;
  const id = (await params).id;
  const { message } = await req.json();
  try {
    const newMessage = await prisma.message.create({
      data: {
        message,
        sender: id,
        isAdmin: true,
      },
    });
    revalidatePath("/");
    revalidatePath(`/admin/chat${newMessage.sender}`);
    return NextResponse.json({
      success: true,
      status: 200,
      message: "Message sent",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: "failed To complete reuest",
    });
  }
}
