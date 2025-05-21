import { prisma } from "@/lib/prisma";
import React from "react";
import Likes from "../components/likes";

const page = async () => {
  const images = await prisma.imagePiece.findMany({
    orderBy: { Likes: "desc" },
  });

  return (
    <>
      <div className="w-full max-w-7xl m-auto p-5 mt-10">
        <div className="columns-2 sm:columns-2 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((image, key) => (
            <div key={key} className="break-inside-avoid group relative">
              <img
                src={image.Image || ""}
                alt={`Image ${key}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
              <div className="absolute bottom-0 transition-all transition-400 p-1 bg-white w-full invisible group-hover:visible">
                <Likes
                  likes={image.Likes || 0}
                  url={`${image.id}`}
                  isPost={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
