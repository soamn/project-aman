"use client";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Code } from "lucide-react";
import React, { useEffect } from "react";
import {
  $createCodeNode,
  getCodeLanguages,
  registerCodeHighlighting,
  $isCodeNode,
} from "@lexical/code";
import { $getNodeByKey, $getSelection, $isRangeSelection } from "lexical";
import { $wrapNodes } from "@lexical/selection";
interface CodeBlockPlugin {
  codeLanguage: string;
  blockType: string;
  selectedElementKey: string;
}
const CodeBlockPlugin = ({
  codeLanguage,
  blockType,
  selectedElementKey,
}: CodeBlockPlugin) => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    registerCodeHighlighting(editor);
  }, [editor]);
  const AddCodeblock = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createCodeNode());
      }
    });
  };
  const languages = getCodeLanguages();
  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value;
    editor.update(() => {
      if (!selectedElementKey) return;
      const node = $getNodeByKey(selectedElementKey);
      if ($isCodeNode(node)) {
        node.setLanguage(language);
      }
    });
  };
  return (
    <div className="flex">
      <button
        className="px-3 py-1 rounded cursor-pointer  hover:bg-gray-300"
        onClick={AddCodeblock}
      >
        <Code />
      </button>
      {blockType === "code" && (
        <select
          className=" cursor-pointer  p-1 relative -left-2 w-fit"
          value={codeLanguage}
          onChange={(e) => {
            changeLanguage(e);
          }}
        >
          {languages.map((language, key) => (
            <option key={key} value={language}>
              {language}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CodeBlockPlugin;
