"use client";

import { useEffect, useState } from "react";

export default function AboutAdminPage() {
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchAbout();
  }, []);
  // 👉 fetch existing about
  const fetchAbout = async () => {
    setFetching(true);
    setMessage(null);

    try {
      const res = await fetch("/api/user");
      const data = await res.json();

      if (res.ok && data?.about !== undefined) {
        setAbout(data.about ?? "");
      } else {
        setMessage(data.error || "Failed to fetch about");
      }
    } catch {
      setMessage("Failed to fetch about");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);

    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        key: process.env.NEXT_PUBLIC_API_KEY,
        about,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Something went wrong");
    } else {
      setMessage("✅ About updated successfully");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-lg font-semibold mb-4">Update About</h1>

      <label className="block text-sm mb-1">Email</label>
      <input
        type="email"
        className="w-full border rounded p-2 mb-2"
        placeholder="admin@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => fetchAbout()} // 👈 fetch when email entered
      />

      {fetching && (
        <p className="text-xs text-gray-500 mb-3">Loading existing about…</p>
      )}

      <label className="block text-sm mb-1">About</label>
      <textarea
        className="w-full border rounded p-2 mb-4 h-40"
        placeholder="Write something about yourself..."
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-black"
        }`}
      >
        {loading ? "Saving..." : "Save"}
      </button>

      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>
  );
}
