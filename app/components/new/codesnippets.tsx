"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function CodeSnippets() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/code-posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading)
    return <p className="text-sm text-gray-500">Loading Code Snippets..</p>;

  return (
    <div className="flex flex-col space-y-5 overflow-y-auto p-1">
      {posts.length === 0 && (
        <p className="text-sm text-gray-500">No projects found</p>
      )}
      {posts.map((post) => (
        <Link
          href={post.slug}
          key={post.id}
          className="bg-white w-full rounded-md h-20 flex items-center justify-between cursor-pointer "
        >
          <div className="flex flex-col p-2">
            <p className="text-sm font-semibold">{post.title}</p>
            <p className="text-sm text-gray-500 line-clamp-1">{post.description}</p>
          </div>
          <div className="w-1/2 flex justify-end items-center p-1">
            <img
              src={post.thumbnail || "opengraph-image.png"}
              alt=""
              className="object-cover w-20 rounded-lg "
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
