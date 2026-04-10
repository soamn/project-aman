"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HoverVideoPreviewProvider from "../HoverVideoPreviewProvider";

type Project = {
  id: number;
  name: string;
  description?: string | null;
  highlights: string[];
  startDate?: string | null;
  endDate?: string | null;
  imageURL?: string | null;
  repoUrl?: string | null;
  liveUrl?: string | null;
  videoUrl?: string | null;
};

function formatDateRange(start?: string | null, end?: string | null) {
  if (!start && !end) return null;

  const startLabel = start
    ? new Date(start).toLocaleDateString(undefined, {
        month: "short",
        year: "numeric",
      })
    : "—";

  const endLabel = end
    ? new Date(end).toLocaleDateString(undefined, {
        month: "short",
        year: "numeric",
      })
    : "Present";

  return `${startLabel} – ${endLabel}`;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `/api/project?isPublic=true&key=${process.env.NEXT_PUBLIC_API_KEY}`,
        );

        const data = await res.json();

        const sorted = data.sort((a: Project, b: Project) => {
          if (!a.startDate) return 1;
          if (!b.startDate) return -1;
          return (
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
        });

        setProjects(sorted);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading projects...</p>;
  }

  return (
    <div className="flex flex-col space-y-8 p-2">
      {projects.length === 0 && (
        <p className="text-sm text-gray-500">No projects found</p>
      )}
      {projects.map((project, index) => {
        const isActive = activeIndex !== null && index <= activeIndex;

        return (
          <div
            key={project.id}
            className="flex gap-4"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {/* timeline */}
            <div className="flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full transition-colors duration-200
            ${isActive ? "bg-blue-500" : "bg-gray-400"}`}
              />
              <div
                className={`flex-1 w-0.5 transition-colors duration-200
            ${isActive ? "text-transparent bg-linear-to-b from-blue-400 via-pink-200 " : "bg-gray-300"}`}
              />
            </div>

            {/* content */}
            <div className="flex flex-col w-full border-b pb-6 overflow-visible">
              <HoverVideoPreviewProvider videoUrl={project.videoUrl}>
                <p className="font-semibold text-sm w-fit">{project.name}</p>
              </HoverVideoPreviewProvider>

              {project.description && (
                <p className="text-sm text-gray-500 mt-1">
                  {project.description}
                </p>
              )}

              {formatDateRange(project.startDate, project.endDate) && (
                <p className="text-xs text-gray-400 mt-1">
                  {formatDateRange(project.startDate, project.endDate)}
                </p>
              )}

              {project.highlights?.length > 0 && (
                <ul className="mt-3 list-disc list-inside text-sm text-gray-600 space-y-1">
                  {project.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
              <div className="flex gap-4 mt-3 text-xs">
                {project.repoUrl && (
                  <Link
                    href={project.repoUrl}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    Repo
                  </Link>
                )}
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    Live
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
