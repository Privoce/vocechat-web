import { useEffect, useState } from "react";
// import TextareaAutosize from "react-textarea-autosize";
import { useDispatch, useSelector } from "react-redux";
// import { useKey } from "rooks";
import { getPlateEditorRef } from "@udecode/plate";

import useSendMessage from "../../hook/useSendMessage";
import useAddLocalFileMessage from "../../hook/useAddLocalFileMessage";
import { removeReplyingMessage } from "../../../app/slices/message";
import { updateInputMode, updateUploadFiles } from "../../../app/slices/ui";
import { ContentTypes } from "../../../app/config";

import StyledSend from "./styled";
import UploadFileList from "./UploadFileList";
import Replying from "./Replying";
import Toolbar from "./Toolbar";
import EmojiPicker from "./EmojiPicker";

import MarkdownEditor from "../MarkdownEditor";
import MixedInput, { TEXT_EDITOR_PREFIX, setEditorFocus } from "../MixedInput";
const Types = {
  channel: "#",
  user: "@",
};
const Modes = {
  text: "text",
  markdown: "markdown",
};
function Send({
  name,
  context = "channel",
  members = [],
  // 发给谁，或者是channel，或者是user
  id = "",
}) {
  const [markdownEditor, setMarkdownEditor] = useState(null);
  const dispatch = useDispatch();
  const addLocalFileMesage = useAddLocalFileMessage({ context, to: id });
  // 谁发的
  const { from_uid, replying_mid = null, mode, uploadFiles } = useSelector(
    (store) => {
      return {
        mode: store.ui.inputMode,
        from_uid: store.authData.uid,
        replying_mid: store.message.replying[id],
        uploadFiles: store.ui.uploadFiles[`${context}_${id}`],
      };
    }
  );
  const { sendMessage } = useSendMessage({ context, from: from_uid, to: id });

  useEffect(() => {
    if (replying_mid) {
      const editorRef = getPlateEditorRef(
        `${TEXT_EDITOR_PREFIX}_${context}_${id}`
      );
      if (editorRef) {
        setEditorFocus(editorRef);
      }
    }
  }, [replying_mid]);

  const insertEmoji = (emoji) => {
    if (mode == Modes.markdown && markdownEditor) {
      // markdown insert emoji
      markdownEditor.insertText(emoji);
    } else {
      const editorRef = getPlateEditorRef(
        `${TEXT_EDITOR_PREFIX}_${context}_${id}`
      );
      if (editorRef) {
        // console.log("wtf", editorRef);
        editorRef.insertText(emoji);
      }
    }
  };
  const handleSendMessage = async (msgs = []) => {
    if (!id) return;
    if (msgs && msgs.length) {
      // send text msgs
      for await (const msg of msgs) {
        console.log("send msg", msg);
        const { type: content_type, content, properties = {} } = msg;
        properties.local_id = properties.local_id ?? new Date().getTime();
        await sendMessage({
          id,
          reply_mid: replying_mid,
          type: content_type,
          content,
          from_uid,
          properties,
        });
        if (replying_mid) {
          dispatch(removeReplyingMessage(id));
        }
      }
    }
    // send files
    if (uploadFiles && uploadFiles.length !== 0) {
      uploadFiles.forEach((fileInfo) => {
        const ts = new Date().getTime();
        const { url, name, size, type } = fileInfo;
        const tmpMsg = {
          mid: ts,
          content: url,
          content_type: ContentTypes.file,
          created_at: ts,
          properties: {
            content_type: type,
            name,
            size,
            local_id: ts,
          },
          from_uid,
          sending: true,
        };
        addLocalFileMesage(tmpMsg);
      });
      dispatch(updateUploadFiles({ context, id, operation: "reset" }));
    }
  };
  const sendMarkdown = async (content) => {
    sendMessage({
      id,
      reply_mid: replying_mid,
      type: "markdown",
      content,
      from_uid,
      properties: { local_id: new Date().getTime() },
    });
  };
  const toggleMode = () => {
    dispatch(updateInputMode(mode == Modes.text ? Modes.markdown : Modes.text));
  };
  const placeholder = `Send to ${Types[context]}${name} `;
  return (
    <StyledSend className={`send ${replying_mid ? "reply" : ""} ${context}`}>
      {replying_mid && <Replying mid={replying_mid} id={id} />}
      <UploadFileList context={context} id={id} />

      <div className={`send_box ${mode}`}>
        <EmojiPicker selectEmoji={insertEmoji} />
        {mode == Modes.text && (
          <MixedInput
            members={members}
            id={`${context}_${id}`}
            placeholder={placeholder}
            sendMessages={handleSendMessage}
          />
        )}
        <Toolbar
          context={context}
          to={id}
          mode={mode}
          toggleMode={toggleMode}
        />
        {mode == Modes.markdown && (
          <MarkdownEditor
            placeholder={placeholder}
            setEditorInstance={setMarkdownEditor}
            sendMarkdown={sendMarkdown}
          />
        )}
      </div>
    </StyledSend>
  );
}
export default Send;
// export default memo(Send, (prevs, nexts) => {
//   console.log("send name", prevs.name, nexts.name);
//   return prevs.name == nexts.name;
// });
