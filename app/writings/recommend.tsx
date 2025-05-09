"use client";
import { useRouter } from "next/navigation";
import React from "react";

const More = ({ currentLength }: { currentLength: number }) => {
  const router = useRouter();
  const nextLength = currentLength + 6;

  const loadMore = () => {
    router.push(`/writings/?length=${nextLength}`);
  };

  return (
    <div className="w-full m-auto flex justify-center mt-4">
      <button
        onClick={loadMore}
        className="cursor-pointer hover:bg-gray-50 rounded-lg px-3 py-2 border border-zinc-800"
      >
        More
      </button>
    </div>
  );
};

export default More;
