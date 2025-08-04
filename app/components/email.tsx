"use client";
import React, { useState } from "react";

const Email = () => {
  const [email, setEmail] = useState<string>();
  const [error, setError] = useState(false);
  const [status, setStatus] = useState<"success" | "warning" | null>(null);

  const handleEmailSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email as string)) {
      setError(true);
      setStatus(null);
      return;
    }

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      let response = await res.json();
      if (response.status == 200) {
        setStatus("success");
      } else {
        setStatus("warning");
      }
    } catch (err) {
      setStatus("warning");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        <input
          onChange={(e) => {
            setEmail(e.target.value);
            setError(false);
            setStatus(null);
          }}
          type="email"
          className={`rounded-sm outline-1 px-1 ${
            error ? "outline-red-500 " : ""
          }`}
          placeholder="Subscribe to get latest updates"
        />
        <button
          className="bg-zinc-800 rounded-md p-1 cursor-pointer text-white"
          onClick={handleEmailSubmit}
        >
          Submit
        </button>
      </div>

      {/* Status message */}
      {status === "success" && (
        <span className="text-green-600 text-xs">
          ✓ Subscribed successfully!
        </span>
      )}
      {status === "warning" && (
        <span className="text-yellow-600 text-xs">
          ⚠️ Something went wrong.
        </span>
      )}
    </div>
  );
};

export default Email;
