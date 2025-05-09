import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";

const Gallery = async () => {
  const images = await prisma.imagePiece.findMany({
    orderBy: {
      Likes: "desc",
    },
  });

  return (
    <div className=" px-4 py-20 bg-neutral-50">
      <h2 className="text-4xl md:text-6xl font-Times text-center text-zinc-800 mb-16">
        Collections
      </h2>

      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 max-w-7xl mx-auto ">
        {images.slice(0, 10).map((image:any, index:number) => (
          <div className="group" key={index}>
            <Link href="/gallery" className="break-inside-avoid mb-4 block ">
              <img
                src={image.Image}
                alt={image.title}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-[1.02]"
              />
              <p className="text-center text-base font-caveat text-zinc-700 mt-2 invisible group-hover:visible">
                {image.title}
              </p>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-16 flex justify-center text-zinc-500 text-3xl">
        . . .
      </div>

      <div className="mt-6 flex justify-center">
        <Link
          href={"/gallery"}
          className="text-base font-medium border px-4 py-2 border-zinc-400 hover:bg-black hover:text-white transition-all"
        >
          Explore
        </Link>
      </div>
    </div>
  );
};

export default Gallery;
