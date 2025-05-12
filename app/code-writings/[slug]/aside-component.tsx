"use client";
import React, { useState } from "react";
import Link from "next/link";
import ActiveIndicator from "@/app/components/activeindicator";
import { Menu } from "lucide-react";

const AsideComponent = ({
  posts,
  currentSlug,
}: {
  posts: any[];
  currentSlug: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden fixed top-3 left-0 z-40 text-zinc-800 px-3 py-1 "
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu />
      </button>

      {/* Sidebar - slide in/out */}
      <aside
        className={`fixed top-0 left-0 h-full w-64  bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="p-4">
          <h2 className="text-md font-bold mb-4 ">Code Writings</h2>
          <ul className="space-y-2">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/code-writings/${post.slug}`}
                  className={`relative block px-2 py-1 pl-3 w-full rounded transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis
                    ${
                      post.slug === currentSlug
                        ? "text-zinc-900 font-medium"
                        : "text-zinc-400 hover:text-zinc-600"
                    }`}
                  onClick={() => setIsOpen(false)} // auto close on link click
                >
                  {post.slug === currentSlug && <ActiveIndicator />}
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AsideComponent;
