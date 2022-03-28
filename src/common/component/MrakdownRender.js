import { useEffect, useState, useRef } from "react";
import { Viewer } from "@toast-ui/react-editor";
// import showdown from "showdown";
// import showdownHighlight from "showdown-highlight";
import styled from "styled-components";
import ImagePreviewModal from "../../common/component/ImagePreviewModal";

// const { codeSyntaxHighlight } = Editor.plugin;
const Styled = styled.div`
  * {
    user-select: text;
  }
  /* p {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #475467;
  }
  ul {
    list-style-type: disc;
  }
  ul,
  ol {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #475467;
    list-style-position: inside;
  }
  i,
  em {
    font-style: italic;
  }
  strong {
    font-weight: 700;
  }
  h1,
  h2,
  h3 {
    font-weight: 700;
    color: #475467;
  }
  h1 {
    font-size: 24px;
    line-height: 32px;
  }
  h2 {
    font-size: 20px;
    line-height: 30px;
  }
  h3 {
    font-size: 16px;
    line-height: 24px;
  }
  blockquote {
    display: flex;
    margin-bottom: 10px;
    color: #98a2b3;
    opacity: 0.8;
    box-shadow: inset 2px 0px 0px #a8b0bd;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    padding: 16px;
  }
  pre .hljs {
    background-color: #eee;
  } */
  /* pre {
    user-select: text;
    padding: 16px;
    background-color: #0d1117;
    code {
      user-select: text;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #f5feff;
    }
  } */
`;
export default function MrakdownRender({ content }) {
  const mdContainer = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    if (mdContainer) {
      const container = mdContainer.current;
      // 点击查看大图
      container.addEventListener(
        "click",
        (evt) => {
          console.log(evt);
          const { target } = evt;
          // 图片
          if (target.nodeType == 1) {
            setPreviewImage(target.dataset.origin || target.src);
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
        <ImagePreviewModal
          image={previewImage}
          closeModal={closePreviewModal}
        />
      )}
      <Styled ref={mdContainer}>
        <Viewer
          initialValue={content}
          // plugins={[[codeSyntaxHighlight]]}
        ></Viewer>
      </Styled>
    </>
  );
}
