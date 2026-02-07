"use client";

import { useRouter } from "next/navigation";
import ProjectForm, { ProjectFormData } from "@/app/components/ProjectForm";

export default function NewProjectPage() {
  const router = useRouter();

  async function handleCreate(data: ProjectFormData) {
    await fetch(`/api/project?key=${process.env.NEXT_PUBLIC_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    router.push("/admin/project");
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Create Project</h1>

      <ProjectForm submitLabel="Create" onSubmit={handleCreate} />
    </div>
  );
}
