"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useRef, useState } from "react";
import { ChevronDown, Code2 } from "lucide-react";
import { $createHtmlPreviewNode } from "../nodes/HtmlPreviewNode";
import { $insertNodes } from "lexical";

const HtmlPreviewPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [isOpen, setIsOpen] = useState(false);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  const insertIframe = () => {
    const srcDoc = `
      <html>
        <head><style>${css}</style></head>
        <body>${html}<script>${js}</script></body>
      </html>
    `;

    editor.update(() => {
      const node = $createHtmlPreviewNode({ srcDoc });
      $insertNodes([node]);
    });

    setIsOpen(false);
    setHtml("");
    setCss("");
    setJs("");
  };

  return (
    <div className="relative">
      <button
        className="px-3 py-1 rounded cursor-pointer hover:bg-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {!isOpen ? <Code2 /> : <ChevronDown />}
      </button>

      {isOpen && (
        <div className="absolute z-50 bg-white p-6 rounded-lg shadow text-black flex flex-col gap-4 w-[300px]">
          <textarea
            className="border p-2 rounded"
            placeholder="HTML"
            rows={3}
            value={html}
            onChange={(e) => setHtml(e.target.value)}
          />
          <textarea
            className="border p-2 rounded"
            placeholder="CSS"
            rows={2}
            value={css}
            onChange={(e) => setCss(e.target.value)}
          />
          <textarea
            className="border p-2 rounded"
            placeholder="JavaScript"
            rows={2}
            value={js}
            onChange={(e) => setJs(e.target.value)}
          />
          <button
            className="bg-zinc-900 text-white p-2 rounded-lg"
            onClick={insertIframe}
            disabled={!html.trim()}
          >
            Insert Preview
          </button>
        </div>
      )}
    </div>
  );
};

export default HtmlPreviewPlugin;
