import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import More from "./recommend";
const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ length: string; category: string }>;
}) => {
  const length = parseInt((await searchParams)?.length || "6", 10);
  const category = (await searchParams)?.category;

  const posts = await prisma.post.findMany({
    take: length,
    ...(category && { where: { category } }),
    orderBy: {
      Likes: "desc",
    },
  });

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-medium font-Times mt-10 mb-6">
          Highlights
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 sm:gap-6">
          {posts.map((post: any) => (
            <Link
              href={`/${post.slug}`}
              key={post.slug}
              className="group p-4 bg-white rounded-xl shadow hover:shadow-md transition duration-200 flex flex-col"
            >
              <img
                src={post.thumbnail || "/base.gif"}
                alt={post.title}
                className="rounded-lg h-48 object-cover w-full mb-3"
              />
              <h3 className="text-lg font-medium group-hover:text-black text-zinc-800 mb-1">
                {post.title}
              </h3>
              <p className="text-sm text-zinc-500 truncate">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="my-10">
        <More currentLength={length} />
      </div>
    </>
  );
};

export default page;
