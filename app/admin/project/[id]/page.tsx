"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProjectForm, { ProjectFormData } from "@/app/components/ProjectForm";

type Project = ProjectFormData & {
  id: number;
};

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch(`/api/project/${id}?key=${process.env.NEXT_PUBLIC_API_KEY}`)
      .then((res) => res.json())
      .then(setProject);
  }, [id]);

  if (!project) return null;

  async function handleUpdate(data: ProjectFormData) {
    await fetch(`/api/project/${id}?key=${process.env.NEXT_PUBLIC_API_KEY}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  async function handleDelete() {
    if (!confirm("Delete this project?")) return;

    await fetch(`/api/project/${id}?key=${process.env.NEXT_PUBLIC_API_KEY}`, {
      method: "DELETE",
    });

    router.push("/admin/project");
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">Edit Project</h1>

      <ProjectForm
        initialData={{
          ...project,
          startDate: project.startDate?.slice(0, 10),
          endDate: project.endDate?.slice(0, 10),
        }}
        submitLabel="Update"
        onSubmit={handleUpdate}
      />

      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Delete Project
      </button>
    </div>
  );
}
