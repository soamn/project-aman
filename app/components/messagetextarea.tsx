"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode.js";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { theme } from "./theme";
import { ImageNode } from "./nodes/ImageNode";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useState } from "react";
import { Link } from "lucide-react";
import { $getRoot } from "lexical";

const editorConfig = {
  namespace: "MessageEditor",
  theme,
  onError: (error: Error) => {
    console.error(error);
  },
  nodes: [
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    CodeNode,
    CodeHighlightNode,
    HorizontalRuleNode,
    LinkNode,
    ImageNode,
  ],
};

function InnerEditor({ onSend }: { onSend: (html: string) => void }) {
  const [linkUrl, setLinkUrl] = useState("");
  const [showUrl, setShowUrl] = useState(false);
  const [editor] = useLexicalComposerContext();

  const handleClick = () => {
    const html = editor.getEditorState().read(() => {
      return $generateHtmlFromNodes(editor, null);
    });
    onSend(html);
    editor.update(() => {
      const root = $getRoot();
      root.clear();
    });
  };

  return (
    <>
      <div className="relative   shadow p-2 rounded-2xl flex" hidden={!showUrl}>
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
      <button
        className="px-3 py-1 rounded cursor-pointer  hover:bg-gray-100 "
        onClick={() => {
          setShowUrl(!showUrl);
        }}
      >
        <Link />
      </button>
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="outline prose h-fit min-h-10 py-2 px-1 rounded-lg message" />
        }
        placeholder={<span className=""></span>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <LinkPlugin />

      <button
        onClick={handleClick}
        className="bg-zinc-800 rounded-lg w-full mt-2 text-white px-3 p-2 cursor-pointer"
      >
        Send
      </button>
    </>
  );
}

function MessageEditor({ onSend }: { onSend: (html: string) => void }) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <InnerEditor onSend={onSend} />
    </LexicalComposer>
  );
}

export default MessageEditor;
