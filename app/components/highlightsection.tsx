"use client";
import React, { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "motion/react";

const HighlightSection = () => {
  const text = "That's the workflow";
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { amount: 0.5 });
  useEffect(() => {
    if (isInView) {
      startAnimating();
    }
  }, [isInView]);
  const startAnimating = () => {
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
  };
  return (
    <>
      <div className=" w-full flex h-0 invisible md:visible md:h-fit">
        <div className=" w-full ">
          <motion.img
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1, originX: -1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            width={800}
            className=" relative z-0 select-none rotate-15 left-[-20] -top-60 w-full "
            src="./hand.svg"
            alt="Music Animation"
          />
        </div>
        <div className=" w-full flex flex-col  h-fit ">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className=" w-full text-center  top-10 cabin-sketch-regular "
          >
            <p className="text-3xl">Hello, My name Is Aman</p>
            <p>Im a developer From India</p>
            <p>I've been Creating digital products from</p>
            <p>more than 3+ years.</p>
          </motion.div>
          <svg
            className=" z-50 ml-10 w-fit "
            width="500"
            height={900}
            stroke="black"
            strokeWidth={2}
            fill="none"
          >
            <motion.path
              animate={{ pathLength: [0, 1.4, 1] }}
              transition={{ duration: 10, delay: 0.5 }}
              d=" M240 10 L240  265 L319  265 L319 405 L400 405 L400 700"
            />
          </svg>
        </div>
        <div className=" w-full flex items-center relative lg:top-70 md:top-80  h-fit ">
          <motion.div
            className="absolute -top-4  flex-wrap  lg:-left-[50%] md:-left-[200%]  w-full  text-zinc-800 flex  flex-col  lg:space-y-4 md: space-y-20 "
            style={{ fontFamily: "Times" }}
          >
            <p className=" relative md:text-3xl lg:text-7xl font-bold text-wrap bg-red-400 p-3 w-[200%] min-w-0">
              Design
              <motion.span
                whileInView={{ x: [0, 680] }}
                transition={{ duration: 1, type: "spring", delay: 0.3 }}
                className=" absolute w-full h-25 left-0 top-0  bg-[#FAF9F6]"
              ></motion.span>
            </p>
            <p className="relative  md:text-4xl lg:text-8xl font-bold  -right-20 bg-amber-400 p-3 w-[200%]">
              Develop
              <motion.span
                whileInView={{ x: [0, 670] }}
                transition={{ duration: 1, type: "spring", delay: 0.4 }}
                className=" absolute w-full h-30 left-0 top-0   bg-[#FAF9F6]"
              ></motion.span>
            </p>
            <p className="relative md:text-5xl lg:text-9xl font-bold  -right-40 bg-pink-600 p-3 w-[200%]">
              Deploy
              <motion.span
                whileInView={{ x: [0, 645] }}
                transition={{ duration: 1, type: "spring", delay: 0.5 }}
                className=" absolute w-full h-40 left-0 top-0   bg-[#FAF9F6] "
              ></motion.span>
            </p>
          </motion.div>
        </div>
      </div>
      <motion.p
        ref={scope}
        className="text-7xl font-caveat relative w-full left-[50%] -top-30 h-0 invisible md:visible md:h-full"
      >
        {text.split(" ").map((word, index) => (
          <motion.span
            style={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            key={word + index}
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.p>
    </>
  );
};

export default HighlightSection;
