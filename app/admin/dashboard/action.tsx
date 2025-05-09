"use client";
import { Trash } from "lucide-react";
import React from "react";
interface Props {
  url: string | number;
  isPost: boolean;
}
const Action = ({ url, isPost }: Props) => {
  const handleDelete = async () => {
    try {
      let fetchUrl = "";
      if (isPost) {
        fetchUrl = `/api/post/${url}`;
      } else {
        fetchUrl = `/api/gallery/${url}`;
      }
      const res = await fetch(fetchUrl, { method: "DELETE" });
      const response = await res.json();
      alert(response.message);
    } catch (error) {
      alert("Error deleting !");
    }
  };

  return (
    <button onClick={handleDelete} className="inline-flex">
      <Trash className="inline text-red-500 cursor-pointer" />
    </button>
  );
};

export default Action;
