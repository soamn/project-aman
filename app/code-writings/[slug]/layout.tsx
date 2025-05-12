import ActiveIndicator from "@/app/components/activeindicator";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import AsideComponent from "./aside-component";
export default async function CodeWritingsLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const posts = await prisma.post.findMany({
    where: { category: "code" },
    select: { slug: true, title: true },
    orderBy: { id: "asc" },
  });

  const currentSlug = (await params).slug;

  return (
    <div className="flex min-h-screen p-2 ">
      <aside className="lg:w-fit  p-4 fixed invisible lg:visible w-0">
        <h2 className="text-lg font-bold mb-4">Code Writings</h2>
        <ul className="space-y-2">
          {posts.map(
            (post: { slug: Key | null | undefined; title: string }) => (
              <li key={post.slug}>
                <Link
                  href={`/code-writings/${post.slug}`}
                  className={`relative block px-2 py-1 pl-3 w-64 rounded transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis
                    ${
                      post.slug === currentSlug
                        ? "text-zinc-900 font-medium"
                        : "text-zinc-400 hover:text-zinc-600"
                    }`}
                >
                  {post.slug === currentSlug && <ActiveIndicator />}
                  {post.title}
                </Link>
              </li>
            )
          )}
        </ul>
      </aside>
      <AsideComponent posts={posts} currentSlug={currentSlug} />{" "}
      <main className="flex-1 p-6 m-auto ">{children}</main>
    </div>
  );
}
