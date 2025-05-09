"use client";
import { motion } from "motion/react"; // Correct import for motion
import React from "react";

export default function Links() {
  return (
    <motion.div
      className="absolute flex   flex-col space-y-6 cabin-sketch-regular
       lg:left-40 lg:text-5xl lg:top-120 
      md:left-40 md:top-130
       left-0 text-xl top-80
        "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        staggerChildren: 0.3,
      }}
    >
      <motion.a
        className="group relative z-20 top-10"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        href={"/writings?category=project"}
      >
        Projects
        <span className="bg-red-300 absolute inset-0 lg:w-60 md:w-30 invisible md:visible h-full -left-9 -z-10 group-hover:translate-x-10 transition-1000 transition-all"></span>
      </motion.a>
      <motion.a
        className="group relative z-20 top-10"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        href={"/gallery"}
      >
        Visuals
        <span className="bg-blue-300 absolute inset-0 lg:w-60 md:w-30  invisible md:visible h-full -left-9 -z-10 group-hover:translate-x-9 transition-1000 transition-all"></span>
      </motion.a>
    </motion.div>
  );
}
