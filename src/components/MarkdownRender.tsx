import { FC, useRef, useEffect } from "react";

import "prismjs/themes/prism.css";
// @ts-ignore
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import { Viewer } from "@toast-ui/react-editor";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";
// import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
// import '@toast-ui/editor/dist/toastui-editor.css';
// import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
//@ts-ignore

import { isDarkMode } from "../utils";
import ImagePreview from "./ImagePreview";

interface IProps {
  content: string;
}
const MarkdownRender: FC<IProps> = ({ content }) => {
  const mdContainer = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (mdContainer.current) {
      const links = mdContainer.current.querySelectorAll("a");
      [...links].forEach((link) => {
        link.setAttribute("target", "_blank");
      });
    }
  }, [mdContainer]);

  return (
    <>
      <ImagePreview container={mdContainer.current} context="markdown" />
      <div ref={mdContainer} id="MARKDOWN_CONTAINER">
        <Viewer
          initialValue={content}
          plugins={[codeSyntaxHighlight]}
          theme={isDarkMode() ? "dark" : "light"}
        ></Viewer>
      </div>
    </>
  );
};

export default MarkdownRender;
