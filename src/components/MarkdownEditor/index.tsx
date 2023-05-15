import { useRef, useEffect, FC } from "react";
import { Editor } from "@toast-ui/react-editor";
import "prismjs/themes/prism.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";

import useUploadFile from "@/hooks/useUploadFile";
import Button from "../styled/Button";
import { isDarkMode } from "@/utils";

type Props = {
  updateDraft?: (draft: string) => void;
  initialValue: string;
  height: string;
  placeholder: string;
  sendMarkdown: (md: string) => void;
  setEditorInstance: () => void;
};
const MarkdownEditor: FC<Props> = ({
  updateDraft = null,
  initialValue = "",
  height = "50vh",
  placeholder,
  sendMarkdown,
  setEditorInstance
}) => {
  const editorRef = useRef<Editor>();
  const { uploadFile } = useUploadFile();
  // const [pHolder, setPHolder] = useState(placeholder);
  useEffect(() => {
    const editor = editorRef?.current;
    if (editor) {

      const editorInstance = editor.getInstance();
      editorInstance.removeHook("addImageBlobHook");
      editorInstance.addHook("addImageBlobHook", async (blob, callback) => {
        const { thumbnail = "" } = (await uploadFile(blob)) || {};
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
        // console.log("mmmm", md);
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
    <div className="input md-editor">
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
        theme={isDarkMode() ? "dark" : "light"}
      />
      <Button className="send small" onClick={send}>
        Send
      </Button>
    </div>
  );
};
export default MarkdownEditor;
// prosemirror-mode version error https://github.com/ueberdosis/tiptap/issues/577
