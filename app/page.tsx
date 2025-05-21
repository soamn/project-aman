"use client";

import React from "react";
import { motion } from "framer-motion";
import Message from "./components/message";
import Projects from "./components/new/projects";
import Articles from "./components/new/articles";
import CodeSnippets from "./components/new/codesnippets";
import { Github } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const [activeTab, setActiveTab] = React.useState("projects");

  const tabs = [
    { name: "projects", label: "Projects" },
    { name: "articles", label: "Articles" },
    { name: "code-snippets", label: "Code Snippets" },
  ];

  const fullText = "developer";
  const [typedText, setTypedText] = React.useState("");
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div className="flex flex-col overflow-x-clip h-screen">
      <Message />
      <div className="flex justify-center items-center p-2 h-full">
        <div className="rounded-md flex flex-col w-full max-w-lg p-2 h-full">
          {/* Header */}
          <div className="pb-5 p-2 relative flex gap-1 border-b border-gray-300">
            <div className="w-full">
              <div className="text-xl font-bold">Hi, I’m Aman Negi</div>
              <p className="text-lg text-gray-500">
                I’m a{" "}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-blue-500 font-bold "
                >
                  {typedText}
                </motion.span>{" "}
                from India and I have been developing digital products for more
                than <br />
                <span className="font-bold text-emerald-500">2+ years</span>.
              </p>
              <p className="pt-1 text-xs">
                <Link
                  href="https://github.com/soamn"
                  target="_blank"
                  className="group relative"
                >
                  <Github className="w-6 h-6 rounded-md cursor-pointer p-1" />
                  <span className="bg-gray-200 rounded-md p-1 top-0 left-5 invisible absolute group-hover:visible text-md">
                    Github
                  </span>
                </Link>
              </p>
            </div>
            <div className="w-fit flex justify-end items-center flex-shrink-0">
              <div className="rounded-full ring-2">
                <motion.img
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.1, ease: "easeInOut" }}
                  viewport={{ once: true }}
                  src="https://media.licdn.com/dms/image/v2/D5603AQEczudmYK1kXg/profile-displayphoto-shrink_200_200/B56ZbtQrXdGgAY-/0/1747737296040?e=1753315200&v=beta&t=QSKXzuNAf0LTnPvhF0vTvERcoYyJ-YnFKYgzVX-32Po"
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
          <div className="flex-1 z-10 overflow-y-auto rounded-md">
            {activeTab === "projects" && <Projects />}
            {activeTab === "articles" && <Articles />}
            {activeTab === "code-snippets" && <CodeSnippets />}
          </div>
        </div>
      </div>
    </div>
  );
}
