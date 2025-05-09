"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function BannerSection() {
  const bannerimages = [
    {
      text: "Code",
      gif: "samurai.gif",
      img: "samurai.webp",
      link: "/code-writings/code",
    },
    {
      text: "Articles",
      gif: "./office.gif",
      img: "./office.webp",
      link: "/writings",
    },
    {
      text: "Discover",
      gif: "./music_anim.gif",
      img: "./music_anim.webp",
      link: "/gallery",
    },
    {
      text: "Characters",
      gif: "./base.gif",
      img: "./base.webp",
      link: "#",
    },
  ];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div className="w-full overflow-x-auto  relative mt-40">
      <div className="flex ">
        {bannerimages.map((img, index) => (
          <Link
            href={img.link}
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(1)}
            className="md:h-[100dvh] h-50 w-1/4 border-r-4 border-b-4 border-t-3 bg-inherit z-20 overflow-clip cursor-pointer"
          >
            <motion.img
              whileHover={{ y: -100 }}
              animate={{ y: 0 }}
              whileTap={{ scale: 5 }}
              transition={{ duration: 0.4 }}
              src={hoveredIndex === index ? img.gif : img.img}
              alt={`Banner ${index + 1}`}
              className={`h-full w-full  object-cover md:object-scale-down bg-offwhite
                 brightness-95 grayscale hover:grayscale-0 hover:brightness-100${
                   hoveredIndex === index ? " brightness-100 grayscale-0" : ""
                 }`}
            />
            <p
              className="relative 
              bottom-20 lg:left-30 px-4 -z-20  text-white  bg-black text-3xl  w-full "
              style={{ fontFamily: "Times" }}
            >
              {img.text}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
