"use client";

import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";
import { FORMAT_ELEMENT_COMMAND } from "lexical";
import { $isElementNode } from "lexical";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isHeadingNode } from "@lexical/rich-text";

import { useEffect, useState } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Link,
  List,
  ListOrdered,
  ListX,
} from "lucide-react";
import ImagePlugin from "./plugins/ImagePlugin";
import CodeBlockPlugin from "./plugins/CodeBlockPlugin";
import { $isCodeNode, getDefaultCodeLanguage } from "@lexical/code";
import SandboxPlugin from "./plugins/SandboxPlugin";
export function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isLeftAligned, setIsLeftAligned] = useState(false);
  const [isRightAligned, setIsRightAligned] = useState(false);
  const [isCenterAligned, setIsCenterAligned] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showUrl, setShowUrl] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");
  const [codeLanguage, setCodeLanguage] = useState(getDefaultCodeLanguage());
  const [selectedElementKey, setSelectedElementKey] = useState("");

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsBold(selection.hasFormat("bold"));
          setIsItalic(selection.hasFormat("italic"));
          setIsUnderline(selection.hasFormat("underline"));
          const nodes = selection.getNodes();
          let alignment = null;
          for (const node of nodes) {
            if ($isElementNode(node)) {
              const format = node.getFormatType?.();
              if (
                format === "left" ||
                format === "center" ||
                format === "right"
              ) {
                alignment = format;
                break;
              }
            }
          }
          setIsLeftAligned(alignment === "left");
          setIsCenterAligned(alignment === "center");
          setIsRightAligned(alignment === "right");

          const element = selection.anchor.getNode();
          const elementKey = element.getKey();
          setSelectedElementKey(elementKey);
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
          }
        }
      });
    });
  }, [editor]);

  return (
    <>
      <div className="absolute left-5 top-2 flex gap-2 mb-2 px-2">
        <button
          className={`px-3 py-1 rounded cursor-pointer ${
            isBold ? "bg-black text-white" : "bg-zinc-200 hover:bg-gray-300"
          }`}
          onClick={() => {
            setIsBold(!Bold);
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
          }}
        >
          <strong>B</strong>
        </button>
        <button
          className={`px-3 py-1 rounded cursor-pointer ${
            isItalic ? "bg-black text-white" : "bg-zinc-200 hover:bg-gray-300"
          }`}
          onClick={() => {
            setIsItalic(!isItalic);
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
          }}
        >
          <em>I</em>
        </button>
        <button
          className={`px-3 py-1 rounded cursor-pointer ${
            isUnderline
              ? "bg-black text-white"
              : "bg-zinc-200 hover:bg-gray-300"
          }`}
          onClick={() => {
            setIsUnderline(!isUnderline);
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
          }}
        >
          <u>U</u>
        </button>
        <button
          className={`px-3 py-1 rounded cursor-pointer ${
            isLeftAligned
              ? "bg-black text-white"
              : "bg-zinc-200 hover:bg-gray-300"
          }`}
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
          }}
        >
          <AlignLeft />
        </button>
        <button
          className={`px-3 py-1 rounded cursor-pointer ${
            isCenterAligned
              ? "bg-black text-white"
              : "bg-zinc-200 hover:bg-gray-300"
          }`}
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
          }}
        >
          <AlignCenter />
        </button>
        <button
          className={`px-3 py-1 rounded cursor-pointer ${
            isRightAligned
              ? "bg-black text-white"
              : "bg-zinc-200 hover:bg-gray-300"
          }`}
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
          }}
        >
          <AlignRight />
        </button>
        <button
          className={`px-3 py-1 rounded cursor-pointer`}
          onClick={() => {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
          }}
        >
          <List />
        </button>
        <button
          className={`px-3 py-1 rounded cursor-pointer `}
          onClick={() => {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
          }}
        >
          <ListOrdered />
        </button>

        <button
          className={`px-3 py-1 rounded cursor-pointer `}
          onClick={() => {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
          }}
        >
          <ListX />
        </button>

        <button
          className="px-3 py-1 rounded cursor-pointer  hover:bg-gray-300"
          onClick={() => {
            setShowUrl(true);
          }}
        >
          <Link />
        </button>
        <SandboxPlugin />
        <ImagePlugin />
        <CodeBlockPlugin
          blockType={blockType}
          selectedElementKey={selectedElementKey}
          codeLanguage={codeLanguage}
        />
        <div
          className="absolute top-10 left-70 bg-zinc-200 shadow p-2 rounded-2xl flex"
          hidden={!showUrl}
        >
          <input
            onChange={(e) => {
              setLinkUrl(e.target.value);
            }}
            type="text"
            placeholder="https://example.com"
            className="border rounded-lg p-2 h-full outline-0 bg-white"
          />
          <button
            onClick={() => {
              setShowUrl(false);
              editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
            }}
            className="bg-zinc-800 p-2 rounded-lg text-white ml-2 cursor-pointer"
          >
            Done/Exit
          </button>
        </div>
      </div>
    </>
  );
}
