import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import { UrlObject } from "url";

const FeaturedArticles = async () => {
  const articles = await prisma.post.findMany({
    where: {
      featured: true,
      published: true,
    },
  });

  return (
    <div className="w-full mt-40 px-4  ">
      <h2 className="text-4xl ml-4 md:text-7xl font-Times text-zinc-800">
        Featured Readings
      </h2>
      <div className="grid  lg:grid-cols-3 p-5 gap-4 h-fit">
        {articles.slice(0, 3).map(
          (
            article: {
              title:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              description:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              slug: string | UrlObject;
            },
            key: React.Key | null | undefined
          ) => (
            <div
              key={key}
              className="bg-offwhite drop-shadow-xl   border-2 rounded-lg p-5 flex flex-col"
            >
              <h3 className="bold text-3xl   w-fit  font-Times flex-1">
                {article.title}
              </h3>
              <p className="w-[85%] mx-2 line-clamp-2 overflow-hidden text-ellipsis">
                {article.description}
              </p>
              <Link
                href={article.slug}
                className="bg-red-400 absolute p-2 right-0 bottom-2 cursor-pointer"
              >
                Read More
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FeaturedArticles;
