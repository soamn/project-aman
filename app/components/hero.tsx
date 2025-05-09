"use client";
import { motion } from "motion/react";
import React from "react";

const Hero = () => {
  return (
    <>
      <section className="w-full flex justify-center relative cabin-sketch-regular ">
        <div className="absolute top-0">
          <svg width="500" height="300" viewBox="0 0 500 300">
            <defs>
              <path
                id="curve"
                d="M 50 150 A 200 100 0 1 1 450 150"
                fill="transparent"
              />
            </defs>
            <text
              width="500"
              style={{ fill: "none", stroke: "#333", strokeWidth: 1 }}
            >
              <motion.textPath
                href="#curve"
                startOffset="50%"
                textAnchor="middle"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                style={{
                  fontSize: "40px",
                  stroke: "#333",
                  strokeWidth: 2,
                  fill: "none",
                }}
              >
                Sketched Down
              </motion.textPath>
            </text>
          </svg>
        </div>
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          width={600}
          height={600}
          className="object-cover relative z-10 select-none"
          src="./music_anim.gif"
          alt="Music Animation"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute top-80 text-justify text-wrap w-[300]"
        >
          "Anything and everything sketched down" refers to the total
          documentation of thoughts, visuals, and concepts, typically in a rough
          or exploratory form, to ensure nothing is forgotten, ignored, or left
          out during a creative or planning process.
        </motion.p>
      </section>
    </>
  );
};

export default Hero;
