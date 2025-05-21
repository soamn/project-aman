import {
  DecoratorNode,
  DOMConversionMap,
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  NodeKey,
} from "lexical";
import { JSX } from "react";

export const $createHtmlPreviewNode = ({ srcDoc }: { srcDoc: string }) => {
  return new HtmlPreviewNode({ srcDoc });
};

export class HtmlPreviewNode extends DecoratorNode<JSX.Element> {
  __srcDoc: string;

  constructor({ srcDoc }: { srcDoc: string }, key?: NodeKey) {
    super(key);
    this.__srcDoc = srcDoc;
  }

  static getType(): string {
    return "html-preview";
  }

  static clone(node: HtmlPreviewNode): HtmlPreviewNode {
    return new HtmlPreviewNode({ srcDoc: node.__srcDoc }, node.__key);
  }

  decorate(): JSX.Element {
    return (
      <iframe
        className="rounded-lg border w-full h-[300px]"
        sandbox="allow-scripts allow-same-origin"
        srcDoc={this.__srcDoc}
      />
    );
  }

  createDOM(): HTMLElement {
    const container = document.createElement("div");
    container.classList.add("html-preview-container");
    return container;
  }

  exportDOM(): DOMExportOutput {
    const container = document.createElement("iframe");
    container.setAttribute("srcdoc", this.__srcDoc);
    return { element: container };
  }

  static importDOM(): DOMConversionMap | null {
    return null;
  }

  updateDOM(): boolean {
    return false;
  }

  exportJSON() {
    return {
      type: "html-preview",
      version: 1,
      srcDoc: this.__srcDoc,
    };
  }

  static importJSON(serializedNode: any) {
    return new HtmlPreviewNode({ srcDoc: serializedNode.srcDoc });
  }
}
