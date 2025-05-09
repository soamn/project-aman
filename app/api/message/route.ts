import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message, sender } = await req.json();
  try {
    const newMessage = await prisma.message.create({
      data: {
        message,
        sender,
        isAdmin: false,
      },
    });
    revalidatePath("/");
    revalidatePath(`/admin/chat${newMessage.sender}`);
    return NextResponse.json({
      success: true,
      status: 200,
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "failed to complete request",
    });
  }
}
