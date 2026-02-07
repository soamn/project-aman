"use client";

import React from "react";
import { motion } from "framer-motion";
import Message from "./components/message";
import Projects from "./components/new/projects";
import Articles from "./components/new/articles";
import CodeSnippets from "./components/new/codesnippets";
import Link from "next/link";

export default function Page() {
  const [activeTab, setActiveTab] = React.useState("projects");

  const tabs = [
    { name: "projects", label: "Projects" },
    { name: "articles", label: "Articles" },
    { name: "code-snippets", label: "Code Snippets" },
  ];

  return (
    <div className="flex flex-col overflow-x-clip h-screen">
      <Message />
      <div className="flex justify-center items-center p-2 h-full">
        <div className="rounded-md flex flex-col w-full max-w-3xl p-2 h-full">
          {/* Header */}
          <div className="pb-5 p-2 relative flex gap-1 border-b border-gray-300">
            <div className="w-full">
              <div className="text-xl font-bold">
                Hi, Im{" "}
                <span
                  className=" text-transparent bg-clip-text
              bg-linear-to-r from-indigo-400 via-pink-400 to-blue-300"
                >
                  Aman Negi
                </span>
              </div>
              <p className="text-md text-gray-500">
                Cross-platform application developer, works include designing
                user interfaces, creating APIs, deploying applications, version
                control and code maintenance.
              </p>
              <p className="pt-4 text-xs flex space-x-5">
                <Link
                  href="https://github.com/soamn"
                  target="_blank"
                  className="group relative"
                >
                  <span className="bg-gray-200 rounded-md p-1 text-md">
                    Github
                  </span>
                </Link>
                <Link
                  href="/resume/resume.html"
                  target="_blank"
                  className="group relative"
                >
                  <span className="bg-gray-200 rounded-md p-1  text-md">
                    Resume
                  </span>
                </Link>
              </p>
            </div>
            <div className="w-fit flex justify-end items-center shrink-0">
              <div className="rounded-full ring-2">
                <motion.img
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.1, ease: "easeInOut" }}
                  viewport={{ once: true }}
                  src="https://avatars.githubusercontent.com/u/134830116?v=4"
                  alt="Aman Negi"
                  className="object-cover w-20 h-20 rounded-full ring-1 ring-white"
                />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="relative flex items-center space-x-6 mb-4 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className="relative pb-2 cursor-pointer"
              >
                <span
                  className={`transition-colors ${
                    activeTab === tab.name
                      ? "text-black font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {tab.label}
                </span>

                {activeTab === tab.name && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div
            className="flex-1 z-10 overflow-y-auto  rounded-md"
            style={{ scrollbarWidth: "thin" }}
          >
            {activeTab === "projects" && <Projects />}
            {activeTab === "articles" && <Articles />}
            {activeTab === "code-snippets" && <CodeSnippets />}
          </div>
        </div>
      </div>
    </div>
  );
}
