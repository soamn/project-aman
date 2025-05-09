import Editor from "@/app/components/editor";
import { prisma } from "@/lib/prisma";
import { number } from "motion/react";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const content = await prisma.post.findFirst({
    where: {
      id: parseInt(id, 10),
    },
    select: {
      content: true,
    },
  });
  let html = "Hi";
  if (content) {
    html = content.content;
  }
  return (
    <div className="relative overflow-clip m-auto max-w-5xl ">
      <Editor html={html} isUpdate={true} />
    </div>
  );
};

export default page;
