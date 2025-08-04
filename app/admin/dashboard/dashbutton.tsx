"use client";
import React from "react";

enum ACTION {
  Delete,
  Copy,
}

interface Props {
  action: ACTION;
  string: string;
}

const DashButton = ({ action, string }: Props) => {
  const handleClick = async () => {
    if (action === ACTION.Copy) {
      if (string) {
        navigator.clipboard.writeText(string);
      }
    } else if (action === ACTION.Delete) {
      const res = await fetch("/api/newsletter", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: string }),
      });
      const data = await res.json();
      return;
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-zinc-400 cursor-pointer hover:bg-zinc-300 active:bg-zinc-500 w-full rounded-md"
    >
      {action === ACTION.Copy ? "Copy" : "Delete"}
    </button>
  );
};

export default DashButton;
