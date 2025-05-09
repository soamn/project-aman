"use client";
import React, { useRef, useState } from "react";

const page = () => {
  const [file, setFile] = useState<File>();
  const [error, setError] = useState<string>("");
  const [preview, setPreview] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState<string>();
  async function saveImage() {
    if (!title || !file) {
      setError("All fields required");
      return;
    }
    const data = new FormData();
    data.append("image", file);
    data.append("title", title);
    const res = await fetch("/api/gallery", {
      method: "POST",
      body: data,
    });
    const response = await res.json();
    alert(response.message);
  }
  return (
    <div className="w-full m-auto max-w-3xl p-5">
      <div className="flex flex-col gap-4">
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="outline p-2 px-3 rounded-lg"
        />
        <input
          type="file"
          className="p-2 outline-1 rounded-lg"
          ref={inputRef}
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFile(file);
              setPreview(URL.createObjectURL(file));
            }
          }}
        />

        <button
          className="p-2 bg-zinc-900 text-white rounded-lg cursor-pointer"
          onClick={() => inputRef?.current?.click()}
        >
          {file ? file.name : "upload "}
        </button>
        {preview && <img src={preview} width={100} className="w-full" />}
        <button
          onClick={saveImage}
          className="p-2 bg-zinc-900 text-white rounded-lg cursor-pointer"
        >
          Save
        </button>
      </div>

      {error && <span className="text-red-500">*{error}</span>}
    </div>
  );
};

export default page;
