"use client";
import { motion } from "framer-motion";

export default function ActiveIndicator() {
  return (
    <motion.span
      layoutId="active-indicator"
      className="absolute left-0 top-0 h-full w-1 rounded bg-black"
      transition={{ type: "spring", stiffness: 900, damping: 30 }}
    />
  );
}
