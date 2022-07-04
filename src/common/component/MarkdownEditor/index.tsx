import { useRef, useEffect } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";

import StyledWrapper from "./styled";
import useUploadFile from "../../hook/useUploadFile";

import Button from "../styled/Button";

function MarkdownEditor({
  updateDraft = null,
  initialValue = "",
  height = "50vh",
  placeholder,
  sendMarkdown,
  setEditorInstance
}) {
  const editorRef = useRef<Editor | undefined>(undefined);
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
        const md = editorInstance.getMarkdown();
        if (updateDraft) {
          updateDraft(md);
        }
        console.log("mmmm", md);
        editorInstance.destroy();
      }
    };
  }, []);

  const send = () => {
    if (!editorRef.current) return;
    const editor = editorRef.current.getInstance();
    const md = editor.getMarkdown().trim();
    if (md) {
      sendMarkdown(editor.getMarkdown());
      editor.reset();
    }
  };
  return (
    <StyledWrapper className="input">
      <Editor
        initialValue={initialValue}
        plugins={[codeSyntaxHighlight]}
        placeholder={placeholder}
        ref={editorRef}
        toolbarItems={[]}
        hideModeSwitch={true}
        previewStyle="vertical"
        height={height}
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
