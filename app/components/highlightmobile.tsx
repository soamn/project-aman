"use client";
import React, { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "motion/react";

const HighlightMobileSection = () => {
  const text = "That's the workflow";
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
        },
        {
          duration: 0.2,
          ease: "easeInOut",
          delay: stagger(0.3),
        }
      );
    }
  }, [isInView]);

  return (
    <div
      className="flex flex-col items-center
    cabin-sketch-regular
    justify-center  p-4 space-y-8 text-center md:hidden "
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="text-xl md:text-3xl ">Hello, I'm Aman</p>
        <p className="text-md">Developer from India</p>
        <p className="text-md">Creating digital products</p>
        <p className="text-md">for over 2+ years</p>
      </motion.div>

      <motion.div
        className=" w-full  text-zinc-800 flex  flex-col space-y-4 "
        style={{ fontFamily: "Times" }}
      >
        <p className=" text-5xl relative text-left  font-bold text-wrap bg-red-400 p-2 ">
          Design
          <motion.span
            whileInView={{ x: [0, 200] }}
            transition={{ duration: 1, type: "spring", delay: 0.3 }}
            className=" absolute w-full h-full left-0 top-0   bg-[#FAF9F6]"
          ></motion.span>
        </p>
        <p className="font-bold relative text-6xl  text-left  bg-amber-400 p-3 ">
          Develop
          <motion.span
            whileInView={{ x: [0, 270] }}
            transition={{ duration: 1, type: "spring", delay: 0.4 }}
            className=" absolute w-full h-full left-0 top-0   bg-[#FAF9F6]"
          ></motion.span>
        </p>
        <p className="font-bold relative text-7xl text-left bg-pink-600 p-3 ">
          Deploy
          <motion.span
            whileInView={{ x: [0, 320] }}
            transition={{ duration: 1, type: "spring", delay: 0.5 }}
            className=" absolute w-full h-full left-0 top-0   bg-[#FAF9F6] "
          ></motion.span>
        </p>
      </motion.div>

      <motion.p ref={scope} className="text-4xl font-caveat pt-4">
        {text.split(" ").map((word, index) => (
          <motion.span
            style={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            key={word + index}
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};

export default HighlightMobileSection;
