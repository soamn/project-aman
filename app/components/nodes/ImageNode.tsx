import {
  DecoratorNode,
  DOMConversionMap,
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  NodeKey,
} from "lexical";
import { JSX } from "react";

export const $createImageNode = ({
  altText,
  height,
  width,
  maxWidth = 400,
  src,
}: {
  src: string;
  altText: string;
  height?: number;
  width?: number;
  maxWidth?: number;
}) => {
  return new ImageNode({ altText, src, height, width, maxWidth });
};
const convertImageElement = (domNode: HTMLElement) => {
  return {
    conversion: (domNode: HTMLElement) => {
      if (domNode instanceof HTMLImageElement) {
        const { src, alt } = domNode;
        return {
          node: $createImageNode({ src, altText: alt }),
        };
      }
      return null;
    },
    priority: 1 as const,
  };
};

export class ImageNode extends DecoratorNode<JSX.Element> {
  src: string;
  altText: string;
  height: "inherit" | number;
  width: "inherit" | number;
  maxWidth: number;
  constructor({
    src,
    altText,
    width,
    maxWidth,
    height,
    key,
  }: {
    src: string;
    altText: string;
    maxWidth: number;
    width?: "inherit" | number;
    height?: "inherit" | number;
    key?: NodeKey;
  }) {
    super(key);
    (this.src = src),
      (this.altText = altText),
      (this.width = width || "inherit"),
      (this.height = height || "inherit"),
      (this.maxWidth = maxWidth);
  }

  static getType(): string {
    return "image";
  }
  static clone(_node: ImageNode): ImageNode {
    return new ImageNode({
      altText: _node.altText,
      src: _node.src,
      width: _node.width,
      height: _node.height,
      maxWidth: _node.maxWidth,
      key: _node.__key,
    });
  }

  decorate(): JSX.Element {
    return (
      <img
        src={this.src}
        alt={this.altText}
        style={{
          width: this.width,
          height: this.height,
          maxWidth: this.maxWidth,
        }}
      ></img>
    );
  }
  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const span = document.createElement("span");
    span.classList.add("img-container");
    return span;
  }
  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const image = document.createElement("img");
    image.setAttribute("src", this.src);
    image.setAttribute("alt", this.altText);
    return { element: image };
  }
  static importDOM(): DOMConversionMap | null {
    return {
      img: convertImageElement,
    };
  }
  updateDOM(
    prevNode: ImageNode,
    dom: HTMLElement,
    config: EditorConfig
  ): boolean {
    return false;
  }
  exportJSON() {
    return {
      type: "image",
      version: 1,
      src: this.src,
    };
  }
  static importJSON(serializedNode: any) {
    const { src } = serializedNode;
    return new ImageNode(src);
  }
}
