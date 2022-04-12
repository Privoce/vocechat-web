import { useRef, useEffect } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";

import StyledWrapper from "./styled";
import useUploadFile from "../../hook/useUploadFile";

import Button from "../../component/styled/Button";

function MarkdownEditor({ placeholder, sendMarkdown, setEditorInstance }) {
  const editorRef = useRef(undefined);
  const { uploadFile } = useUploadFile();
  // const [pHolder, setPHolder] = useState(placeholder);
  useEffect(() => {
    const editor = editorRef?.current;
    if (editor) {
      const editorInstance = editor.getInstance();
      editorInstance.removeHook("addImageBlobHook");
      editorInstance.addHook("addImageBlobHook", async (blob, callback) => {
        const { thumbnail = "" } = await uploadFile(blob);
        callback(thumbnail);
      });
      setEditorInstance(editorInstance);
    }
    return () => {
      if (editor) {
        const editorInstance = editor.getInstance();
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
        plugins={[codeSyntaxHighlight]}
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
