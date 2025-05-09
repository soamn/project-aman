import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { category: "code" },
    select: { slug: true },
  });

  return posts.map((post: { slug: any }) => ({ slug: post.slug }));
}

export default async function CodePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    select: { content: true },
  });

  if (!post) return notFound();

  return (
    <article className="prose max-w-8xl   lg:max-w-5xl m-auto p-10 article">
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
