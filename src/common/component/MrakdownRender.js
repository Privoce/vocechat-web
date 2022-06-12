import { useEffect, useState, useRef } from "react";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";

// import "prismjs/themes/prism.css";
// import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
// import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
// Import prismjs
// import Prism from "prismjs";

import { Viewer } from "@toast-ui/react-editor";
import styled from "styled-components";
import ImagePreviewModal from "../../common/component/ImagePreviewModal";

const Styled = styled.div`
  * {
    user-select: text;
  }
  .toastui-editor-contents {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;
export default function MrakdownRender({ content }) {
  const mdContainer = useRef(undefined);
  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    const container = mdContainer?.current;
    if (container) {
      // 点击查看大图
      container.addEventListener(
        "click",
        (evt) => {
          console.log(evt);
          evt.stopPropagation();
          const { target } = evt;
          // 图片
          if (target.nodeName == "IMG") {
            const urlObj = new URL(target.src);
            const originUrl = `${urlObj.origin}${
              urlObj.pathname
            }?file_path=${urlObj.searchParams.get("file_path")}`;
            const data = { originUrl };
            setPreviewImage(data);
          }
        },
        true
      );
    }
  }, []);
  const closePreviewModal = () => {
    setPreviewImage(null);
  };
  return (
    <>
      {previewImage && (
        <ImagePreviewModal download={false} data={previewImage} closeModal={closePreviewModal} />
      )}
      <Styled ref={mdContainer}>
        <Viewer
          initialValue={content}
          // eslint-disable-next-line no-undef
          plugins={[codeSyntaxHighlight]}
        ></Viewer>
      </Styled>
    </>
  );
}
