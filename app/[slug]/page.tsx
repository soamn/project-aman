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
      <div className=" w-full  flex flex-col  items-center ">
        <div className="max-w-3xl mt-10">
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
              className="mb-20"
              width={1200}
              height={800}
            ></img>
          )}
          <article
            className="prose prose-sm sm:prose md:prose-base lg:prose-lg max-w-none article"
            dangerouslySetInnerHTML={{ __html: article?.content || "" }}
          ></article>
          <div className="w-full grid grid-cols-2 mt-20">
            {posts.map((post, key) => (
              <Link
                href={`/${post.slug}`}
                key={key}
                className=" min-h-20 p-2 cursor-pointer flex flex-col"
              >
                <img
                  src={post.thumbnail || "base.gif"}
                  className="max-h-50 w-full object-cover"
                />
                <h3 className="text-xl flex-1">{post.title}</h3>
                <p className="truncate flex-end">{post.description}</p>
              </Link>
            ))}
          </div>
          s
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
