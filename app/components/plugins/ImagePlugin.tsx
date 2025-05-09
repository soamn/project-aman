import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ChevronDown, Image } from "lucide-react";
import React, { useRef, useState } from "react";
import { $createImageNode } from "../nodes/ImageNode";
import { $insertNodes } from "lexical";

const ImagePlugin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File>();
  const [maxWidth, setMaxWidth] = useState<number>(300);
  const inputRef = useRef<HTMLInputElement>(null);

  const [editor] = useLexicalComposerContext();
  const ImageAdd = () => {
    let src = "";
    if (url) src = url;
    if (file) src = URL.createObjectURL(file);
    editor.update(() => {
      const node = $createImageNode({
        src: src,
        altText: "image",
        maxWidth: maxWidth,
      });
      $insertNodes([node]);
    });
    setFile(undefined);
    setUrl("");
    setIsOpen(false);
    setMaxWidth(300);
  };

  return (
    <div>
      <button
        className="px-3 py-1 rounded cursor-pointer  hover:bg-gray-300"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {!isOpen ? <Image /> : <ChevronDown />}
      </button>
      {isOpen && (
        <div className="absolute  rounded-lg shadow text-black bg-white p-6 flex gap-4  flex-col">
          <input
            className="outline-1 p-2 rounded-lg"
            value={maxWidth}
            type="number"
            placeholder="Enter Max width"
            onChange={(e) => setMaxWidth(Number(e.target.value))}
          />
          <input
            className="p-2 outline-1 rounded-lg"
            placeholder="enter url"
            type="text"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
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
              }
            }}
          />
          <button
            className="p-2 bg-zinc-900 text-white rounded-lg"
            onClick={() => inputRef?.current?.click()}
          >
            {file ? file.name : "upload "}
          </button>
          <button
            disabled={!url && !file}
            className={`${
              !url && !file
                ? " text-black p-2  bg-gray-200 "
                : "bg-zinc-900 text-white cursor-pointer "
            }p-2 rounded-lg`}
            onClick={ImageAdd}
          >
            Add image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImagePlugin;
