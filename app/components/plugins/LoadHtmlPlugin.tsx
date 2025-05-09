import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateNodesFromDOM } from "@lexical/html";
import { $getRoot } from "lexical";

const LoadHtmlPlugin = ({ html }: { html: string }) => {
  const [editor] = useLexicalComposerContext();
  editor.update(() => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(html, "text/html");
    const nodes = $generateNodesFromDOM(editor, dom);
    const root = $getRoot();
    root.clear();
    const selection = root.select();
    selection.removeText();
    selection.insertNodes(nodes);
  });

  return <></>;
};

export default LoadHtmlPlugin;
