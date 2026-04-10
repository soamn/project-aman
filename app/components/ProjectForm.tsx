"use client";

import { useState } from "react";

export type ProjectFormData = {
  name: string;
  description?: string;
  highlights: string[];
  isPublic: boolean;
  startDate?: string;
  endDate?: string;
  repoUrl?: string;
  liveUrl?: string;
  videoUrl?: string;
  imageURL?: string;
};

type Props = {
  initialData?: ProjectFormData;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  submitLabel?: string;
};

export default function ProjectForm({
  initialData,
  onSubmit,
  submitLabel = "Save",
}: Props) {
  const [form, setForm] = useState<ProjectFormData>({
    name: initialData?.name ?? "",
    description: initialData?.description ?? "",
    highlights: initialData?.highlights ?? [],
    isPublic: initialData?.isPublic ?? false,
    startDate: initialData?.startDate ?? "",
    endDate: initialData?.endDate ?? "",
    repoUrl: initialData?.repoUrl ?? "",
    liveUrl: initialData?.liveUrl ?? "",
    videoUrl: initialData?.videoUrl ?? "",
    imageURL: initialData?.imageURL ?? "",
  });

  function update<K extends keyof ProjectFormData>(
    key: K,
    value: ProjectFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          ...form,
          highlights: form.highlights.filter(Boolean),
        });
      }}
    >
      {/* Name */}
      <input
        className="border p-2 w-full"
        placeholder="Project name"
        value={form.name}
        required
        onChange={(e) => update("name", e.target.value)}
      />

      {/* Description */}
      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        value={form.description}
        onChange={(e) => update("description", e.target.value)}
      />

      {/* Highlights */}
      <textarea
        className="border p-2 w-full"
        placeholder="Highlights (one per line)"
        value={form.highlights.join("\n")}
        onChange={(e) =>
          update(
            "highlights",
            e.target.value.split("\n").map((h) => h.trim()),
          )
        }
      />

      {/* Public */}
      <label className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={form.isPublic}
          onChange={(e) => update("isPublic", e.target.checked)}
        />
        Public
      </label>

      {/* Dates */}
      <div className="flex gap-4">
        <label>start</label>
        <input
          type="date"
          className="border p-2"
          value={form.startDate}
          onChange={(e) => update("startDate", e.target.value)}
        />
        <label>end</label>

        <input
          type="date"
          className="border p-2"
          value={form.endDate}
          onChange={(e) => update("endDate", e.target.value)}
        />
      </div>

      {/* URLs */}
      <input
        type="url"
        className="border p-2 w-full"
        placeholder="Repository URL"
        value={form.repoUrl}
        onChange={(e) => update("repoUrl", e.target.value)}
      />

      <input
        type="url"
        className="border p-2 w-full"
        placeholder="Live URL"
        value={form.liveUrl}
        onChange={(e) => update("liveUrl", e.target.value)}
      />

      <input
        type="url"
        className="border p-2 w-full"
        placeholder="Preview Video URL"
        value={form.videoUrl}
        onChange={(e) => update("videoUrl", e.target.value)}
      />

      <input
        type="url"
        className="border p-2 w-full"
        placeholder="Image URL"
        value={form.imageURL}
        onChange={(e) => update("imageURL", e.target.value)}
      />

      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        {submitLabel}
      </button>
    </form>
  );
}
