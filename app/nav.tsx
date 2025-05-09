"use client";
import { motion } from "motion/react";
import Link from "next/link";
import React from "react";

const Navigation = () => {
  return (
    <motion.header
      initial={{ y: -30 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
      className=" p-2 flex justify-center mt-2 cabin-sketch-regular"
    >
      <nav>
        <ul className="flex space-x-20 hover:underline">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/code-writings/code"}>Code</Link>
          </li>
          <li>
            <Link href={"/writings"}>Writings</Link>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
};

export default Navigation;
2;
