import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidate } from "@/app/[slug]/page";
import { revalidatePath } from "next/cache";

// export async function GET() {
//   try {
//     const emails = await prisma.email.findMany();
//     return NextResponse.json({
//       status: 200,
//       success: true,
//       message: emails,
//     });
//   } catch (error) {
//     return NextResponse.json({
//       status: 500,
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// }

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body;
  const alreadyExist = await prisma.email.findFirst({
    where: {
      email: email,
    },
  });
  if (alreadyExist) {
    return NextResponse.json({
      status: 409,
      success: true,
      message: "already exists",
    });
  }
  await prisma.email.create({
    data: {
      email,
    },
  });
  return NextResponse.json({
    status: 200,
    success: true,
    message: "success",
  });
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;
    await prisma.email.delete({ where: { email } });
    revalidatePath("/admin/dashboard");
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "internal server error",
    });
  }
}
