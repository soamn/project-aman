"use client";
import { delay, motion } from "framer-motion";
import { ReactNode } from "react";

const animationProps = {
  initial: { scale: 0.2 },
  whileInView: { scale: 1 },
  transition: { duration: 2 },
};

interface FramedSectionProps {
  children: ReactNode;
}

export default function FramedSection({ children }: FramedSectionProps) {
  return (
    <div className="relative w-full h-dvh overflow-hidden ">
      <div className="invisible md:visible ">
        <motion.div
          {...animationProps}
          className="w-full border-t-4 sketch-border absolute top-5 left-0"
        />
        <motion.div
          {...animationProps}
          className="w-full border-t-4 sketch-border absolute bottom-30 left-0"
        />
        <motion.div
          {...animationProps}
          className="border-l-4 sketch-border h-[calc(100vh-9rem)] absolute top-5 left-30"
        />
        <motion.div
          {...animationProps}
          className="border-r-4 sketch-border h-[calc(100vh-9rem)] absolute top-5 right-30 "
        />
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center top-[-20%]">
        {children}
      </div>
    </div>
  );
}
