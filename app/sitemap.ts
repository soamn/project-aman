import { prisma } from "@/lib/prisma";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: {
      slug: true,
    },
  });

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://amannegi.online/${post.slug}`,
  }));

  return [
    {
      url: `https://amannegi.online/`,
      lastModified: new Date(),
    },
    ...postEntries,
  ];
}
