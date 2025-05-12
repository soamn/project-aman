import React from "react";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import Likes from "../components/likes";

export const revalidate = 7200;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug: slug, published: true },
  });
  return {
    title: {
      absolute: post?.title || "Happy Reading",
    },
    description: post?.description || "Post description",
    keywords: post?.tags,

    openGraph: {
      images: [
        {
          url: post?.thumbnail || "",
        },
      ],
    },
  };
}
const posts = await prisma.post.findMany({
  where: {
    featured: true,
    published: true,
  },
  orderBy: {
    Likes: "desc",
  },
  take: 6,
});

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    select: { slug: true },
  });

  return posts.map((post) => ({ slug: post.slug }));
}

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const article = await prisma.post.findUnique({
    where: { slug: slug, published: true },
  });
  if (!article) {
    return notFound();
  }
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: article.thumbnail,
    author: {
      "@type": "Person",
      name: "Readosphere",
    },
    datePublished: article.createdAt.toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://readosphere.com/${article.slug}`,
    },
  };

  return (
    <>
      <div className="w-full flex flex-col items-center px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-3xl mt-10">
          <div className="mb-2">
            <Likes
              likes={article.Likes || 0}
              url={`${article.slug}`}
              isPost={true}
            />
          </div>

          {article.thumbnail && (
            <img
              alt={article.title}
              src={article.thumbnail}
              className="mb-10 w-full rounded-md object-cover"
            />
          )}

          <article
            className="prose prose-sm sm:prose md:prose-base lg:prose-lg max-w-none article"
            dangerouslySetInnerHTML={{ __html: article?.content || "" }}
          ></article>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-20">
            {posts.map((post, key) => (
              <Link
                href={`/${post.slug}`}
                key={key}
                className="min-h-20 p-2 cursor-pointer flex flex-col border rounded-md hover:shadow-md transition"
              >
                <img
                  src={post.thumbnail || "opengraph-image.png"}
                  className="w-full h-40 object-cover rounded"
                  alt={post.title}
                />
                <h3 className="text-lg font-semibold mt-2">{post.title}</h3>
                <p className="truncate text-sm text-gray-600">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <Script
          type="application/ld+json"
          suppressHydrationWarning
          key="blog-jsonld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </>
  );
};

export default PostPage;
