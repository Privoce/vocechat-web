import { useEffect, useState, useRef, FC } from "react";
import "prismjs/themes/prism.css";
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
//@ts-ignore
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import { Viewer } from "@toast-ui/react-editor";

import ImagePreviewModal, { PreviewImageData } from "./ImagePreviewModal";
import { isDarkMode } from "../utils";


interface IProps {
  content: string;
}
const MarkdownRender: FC<IProps> = ({ content }) => {
  const mdContainer = useRef<HTMLDivElement | null>(null);
  const [previewImage, setPreviewImage] = useState<PreviewImageData | null>(null);

  useEffect(() => {
    const container = mdContainer?.current;
    if (!container) return;
    // 点击查看大图
    // todo: 事件代理
    container.addEventListener(
      "click",
      (evt) => {
        evt.stopPropagation();
        const target = evt.target as HTMLImageElement;
        if (!target) return;
        // 图片
        if (target.nodeName == "IMG") {
          const urlObj = new URL(target.src);
          const originUrl = `${urlObj.origin}${urlObj.pathname}?file_path=${urlObj.searchParams.get(
            "file_path"
          )}`;
          const data = { originUrl };
          setPreviewImage(data);
        }
      },
      true
    );
  }, []);

  const closePreviewModal = () => {
    setPreviewImage(null);
  };

  return (
    <>
      {previewImage && (
        <ImagePreviewModal download={false} data={previewImage} closeModal={closePreviewModal} />
      )}
      <div ref={mdContainer} id="MARKDOWN_CONTAINER">
        <Viewer initialValue={content} plugins={[codeSyntaxHighlight]} theme={isDarkMode() ? "dark" : "light"}></Viewer>
      </div>
    </>
  );
};

export default MarkdownRender;
