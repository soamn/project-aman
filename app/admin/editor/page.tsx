import Editor from "@/app/components/editor";
import React from "react";

const page = () => {
  const html = ``;
  return (
    <div className="relative overflow-clip m-auto max-w-5xl">
      <Editor html={html} isUpdate={false} />
    </div>
  );
};

export default page;
