"use client";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useRef, useState } from "react";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useRouter } from "next/navigation";

const SavePlugin = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File>();
  const [category, setCategory] = useState<string>("general");
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const [editor] = useLexicalComposerContext();

  const saveHtml = () => {
    if (!title || !description || !slug || !tags) {
      setError("All fields are required");
      return;
    }
    editor.update(async () => {
      const htmlString = $generateHtmlFromNodes(editor, null);
      const data = new FormData();
      if (thumbnail) {
        data.append("thumbnail", thumbnail);
      }
      data.append("title", title);
      data.append("description", description);
      data.append("tags", tags);
      data.append("slug", slug);
      data.append("content", htmlString);
      data.append("category", category);
      try {
        const res = await fetch("/api/post", {
          method: "POST",
          body: data,
        });
        const response = await res.json();
        alert(response.message);
        setError("");
        router.refresh();
      } catch (error) {
        alert(error);
      }
    });
  };

  return (
    <div className="relative left-6 max-w-3xl m-auto">
      <div className="w-full grid grid-cols-2 place-items-center gap-4">
        <div>
          <label htmlFor="title" className="block font-bold">
            Enter Meta Title?
          </label>
          <input
            onChange={(e) => {
              setSlug(
                e.target.value
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "")
              );
              setTitle(e.target.value);
            }}
            name="title"
            id="title"
            type="text"
            placeholder="Enter meta title"
            className="outline p-2 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="description" className="block font-bold">
            Enter Meta Description?
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            id="description"
            placeholder="Enter meta description"
            className="outline p-2 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="tags" className="block font-bold">
            Enter Meta Tags ?
          </label>
          <input
            onChange={(e) => setTags(e.target.value)}
            name="tags"
            id="tags"
            type="text"
            placeholder="Enter meta tags"
            className="outline p-2 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block font-bold">
            Enter Slug ?
          </label>
          <input
            onChange={(e) => {
              setSlug(
                e.target.value
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "")
              );
            }}
            name="slug"
            id="slug"
            type="text"
            value={slug}
            placeholder="Enter Slugs"
            className="outline p-2 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block font-bold">
            Select Category?
          </label>
          <select
            className="outline p-2 rounded-lg"
            name="category"
            id="Category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="general">General</option>
            <option value="code">Code</option>
            <option value="project">Project</option>
          </select>
        </div>

        <div>
          <input
            hidden
            ref={thumbnailRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setThumbnail(file);
              }
            }}
            name="thumbnail"
            id="thumbnail"
            type="file"
            accept="image/*"
            className="outline p-2 rounded-lg hidden"
          />
          <button
            className="p-2 bg-zinc-900 text-white rounded-lg"
            onClick={() => thumbnailRef?.current?.click()}
          >
            {thumbnail ? thumbnail.name : "Upload Thumbnail "}
          </button>
        </div>
      </div>
      <div className=" w-full flex justify-center items-center mt-5 space-x-2">
        <button
          onClick={saveHtml}
          className="bg-zinc-800 rounded-lg text-white px-3 p-2 cursor-pointer  "
        >
          Save
        </button>
      </div>
      {error && <div className="text-red-500">* {error}</div>}
    </div>
  );
};

export default SavePlugin;
