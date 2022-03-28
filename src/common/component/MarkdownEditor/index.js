import { useRef, useEffect } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useUploadImageMutation } from "../../../app/services/message";

import styled from "styled-components";
import Button from "../../component/styled/Button";
const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  width: -webkit-fill-available;
  margin-top: 16px;
  .toastui-editor-defaultUI {
    border-bottom: none;
    border-radius: 0;
    border-top: 1px solid #d0d5dd;
    border-left: none;
    border-right: none;
  }
  .toastui-editor {
    padding: 16px 0;
    [contenteditable="true"] {
      padding: 0;
    }
  }
  .toastui-editor-md-preview {
    padding-top: 16px;
    .toastui-editor-contents {
      padding: 0;
    }
  }
  .toastui-editor-toolbar {
    display: none;
  }
  .send {
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
`;
export default function MarkdownEditor({ placeholder, sendMarkdown }) {
  const editorRef = useRef(null);
  const [uploadImage] = useUploadImageMutation();
  // const handleChange = (wtf) => {
  //   const edtr = editorRef.current.getInstance();

  //   console.log("md", wtf, edtr.getMarkdown());
  //   updateMarkdown(edtr.getMarkdown());
  // };
  useEffect(() => {
    if (editorRef) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.removeHook("addImageBlobHook");
      editorInstance.addHook("addImageBlobHook", async (blob, callback) => {
        const { data: url } = await uploadImage(blob);
        callback(url);
      });
    }
  }, []);

  const send = () => {
    const edtr = editorRef.current.getInstance();
    const md = edtr.getMarkdown().trim();
    if (md) {
      sendMarkdown(edtr.getMarkdown());
      edtr.reset();
    }
  };
  return (
    <StyledWrapper className="input">
      <Editor
        placeholder={placeholder}
        // onChange={handleChange}
        ref={editorRef}
        toolbarItems={[]}
        hideModeSwitch={true}
        // initialValue="hello world!"
        previewStyle="vertical"
        height="50vh"
        initialEditType="markdown"
        useCommandShortcut={true}
      />
      <Button className="send small" onClick={send}>
        Send
      </Button>
    </StyledWrapper>
  );
}
