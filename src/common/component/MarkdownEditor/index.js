import { useRef, useEffect, useState, memo } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import StyledWrapper from "./styled";
import { useUploadImageMutation } from "../../../app/services/message";

import Button from "../../component/styled/Button";

function MarkdownEditor({ placeholder, sendMarkdown, setEditorInstance }) {
  const editorRef = useRef(null);
  // const [pHolder, setPHolder] = useState(placeholder);
  const [uploadImage] = useUploadImageMutation();
  useEffect(() => {
    if (editorRef) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.removeHook("addImageBlobHook");
      editorInstance.addHook("addImageBlobHook", async (blob, callback) => {
        const { data: url } = await uploadImage(blob);
        callback(url);
      });
      setEditorInstance(editorInstance);
    }
    return () => {
      if (editorRef) {
        const editorInstance = editorRef.current.getInstance();
        editorInstance.destroy();
      }
    };
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
export default MarkdownEditor;
// export default memo(MarkdownEditor, (prevs, nexts) => {
//   return prevs.placeholder == nexts.placeholder;
// });
