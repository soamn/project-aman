"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Project = {
  id: number;
  name: string;
  isPublic: boolean;
};

export default function ProjectListPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch(`/api/project?isPublic=false&key=${process.env.NEXT_PUBLIC_API_KEY}`)
      .then(async (res) => {
        const text = await res.text();
        return text ? JSON.parse(text) : [];
      })
      .then(setProjects)
      .catch(() => setProjects([]));
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>

        <Link
          href="/admin/project/new"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + New Project
        </Link>
      </div>

      <ul className="space-y-2">
        {projects.map((p) => (
          <li
            key={p.id}
            className="border p-3 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-gray-500">
                {p.isPublic ? "Public" : "Private"}
              </p>
            </div>

            <Link href={`/admin/project/${p.id}`} className="text-blue-600">
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
