"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LinkNode } from "@lexical/link";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode.js";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { Toolbar } from "./toolbar";
import { ImageNode } from "./nodes/ImageNode";
import LoadHtmlPlugin from "./plugins/LoadHtmlPlugin";
import SavePlugin from "./plugins/SavePlugin";
import UpdatePlugin from "./plugins/UpdatePlugin";
import { theme } from "./theme";
import { HtmlPreviewNode } from "./nodes/HtmlPreviewNode";

function onError(error: Error) {
  // console.error(error);
}

function Editor({ html, isUpdate }: { html: string; isUpdate: boolean }) {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [
      LinkNode,
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      HorizontalRuleNode,
      CodeNode,
      ImageNode,
      CodeHighlightNode,
      HtmlPreviewNode,
    ],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            className="h-fit min-h-40 m-5 p-2 py-10 rounded-xl border outline-none 
          prose prose-sm max-w-none leading-relaxed selection:bg-blue-200 
          [&_u]:underline [&_strong]:font-bold [&_em]:italic [&_ul]:list-disc [&_ol]:list-decimal 
    [&_ul]:pl-6 [&_ol]:pl-6 
    [&_li]:list-inside 
    [&_li]:text-left
    [&_p]:text-inherit
     [&_h1]:text-6xl [&_h2]:text-5xl [&_h3]:text-4xl  [&_h4]:text-3xl 
    [&_h1]:font-bold [&_h2]:font-semibold [&_h3]:font-semibold [&_h4]:font-medium
    [&_blockquote]:font-extrabold 
    "
            aria-placeholder={"Enter some text..."}
            placeholder={
              <div className="absolute  left-8 top-10">Enter some text...</div>
            }
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      {isUpdate ? <UpdatePlugin /> : <SavePlugin />}
      <Toolbar />
      <HistoryPlugin />
      <LinkPlugin />
      <ListPlugin />
      <MarkdownShortcutPlugin />
      <LoadHtmlPlugin html={html} />
    </LexicalComposer>
  );
}

export default Editor;
