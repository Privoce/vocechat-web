import { useEffect, useState } from "react";
import useSendMessage from "../../hook/useSendMessage";
import useAddLocalFileMessage from "../../hook/useAddLocalFileMessage";
import { updateInputMode } from "../../../app/slices/ui";
import { ContentTypes, ChatPrefixs } from "../../../app/config";

import StyledSend from "./styled";
import UploadFileList from "./UploadFileList";
import Replying from "./Replying";
import Toolbar from "./Toolbar";
import EmojiPicker from "./EmojiPicker";

import MarkdownEditor from "../MarkdownEditor";
import MixedInput, { useMixedEditor } from "../MixedInput";
import useDraft from "../../hook/useDraft";
import useUploadFile from "../../hook/useUploadFile";
import { useAppDispatch, useAppSelector } from "../../../app/store";

const Modes = {
  text: "text",
  markdown: "markdown"
};
function Send({
  // 发给谁，或者是channel，或者是user
  context = "channel",
  id = ""
}) {
  const { resetStageFiles } = useUploadFile({ context, id });
  const { getDraft, getUpdateDraft } = useDraft({ context, id });
  const editor = useMixedEditor(`${context}_${id}`);
  const [markdownEditor, setMarkdownEditor] = useState(null);
  const [markdownFullscreen, setMarkdownFullscreen] = useState(false);
  const dispatch = useAppDispatch();
  const addLocalFileMesage = useAddLocalFileMessage({ context, to: id });
  // 谁发的
  const {
    from_uid,
    replying_mid = null,
    mode,
    uploadFiles,
    channelsData,
    usersData,
    uids
  } = useAppSelector((store) => {
    return {
      channelsData: store.channels.byId,
      uids: store.users.ids,
      usersData: store.users.byId,
      mode: store.ui.inputMode,
      from_uid: store.authData.user?.uid,
      replying_mid: store.message.replying[`${context}_${id}`],
      uploadFiles: store.ui.uploadFiles[`${context}_${id}`]
    };
  });
  const { sendMessage } = useSendMessage({ context, from: from_uid, to: id });

  useEffect(() => {
    if (replying_mid) {
      editor.focus();
    }
  }, [replying_mid]);

  const insertEmoji = (emoji) => {
    if (mode == Modes.markdown && markdownEditor) {
      // markdown insert emoji
      markdownEditor.insertText(emoji);
    } else {
      console.log("emojii", emoji);
      editor.insertText(emoji);
    }
  };
  const handleSendMessage = async (msgs = []) => {
    if (!id) return;
    if (msgs && msgs.length) {
      // send text msgs
      for await (const msg of msgs) {
        console.log("send msg", msg);
        const { type: content_type, content, properties = {} } = msg;
        properties.local_id = properties.local_id ?? +new Date();
        await sendMessage({
          id,
          reply_mid: replying_mid,
          type: content_type,
          content,
          from_uid,
          properties
        });
      }
    }
    // send files
    if (uploadFiles && uploadFiles.length !== 0) {
      uploadFiles.forEach((fileInfo) => {
        const ts = +new Date();
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
            local_id: ts
          },
          from_uid,
          sending: true
        };
        addLocalFileMesage(tmpMsg);
      });
      resetStageFiles();
    }
  };
  const sendMarkdown = async (content) => {
    sendMessage({
      id,
      reply_mid: replying_mid,
      type: "markdown",
      content,
      from_uid,
      properties: { local_id: +new Date() }
    });
  };
  const toggleMode = () => {
    dispatch(updateInputMode(mode == Modes.text ? Modes.markdown : Modes.text));
  };
  const toggleMarkdownFullscreen = () => {
    setMarkdownFullscreen((prev) => !prev);
  };
  const name = context == "channel" ? channelsData[id]?.name : usersData[id]?.name;
  const placeholder = `Send to ${ChatPrefixs[context]}${name} `;
  const members =
    context == "channel" ? (channelsData[id]?.is_public ? uids : channelsData[id]?.members) : [];
  return (
    <StyledSend
      className={`send ${mode} ${markdownFullscreen ? "fullscreen" : ""} ${
        replying_mid ? "reply" : ""
      } ${context}`}
    >
      {replying_mid && <Replying context={context} mid={replying_mid} id={id} />}
      {mode == Modes.text && <UploadFileList context={context} id={id} />}

      <div className={`send_box ${mode}`}>
        <EmojiPicker selectEmoji={insertEmoji} />
        {mode == Modes.text && (
          <MixedInput
            updateDraft={getUpdateDraft()}
            initialValue={getDraft()}
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
          fullscreen={markdownFullscreen}
          toggleMarkdownFullscreen={toggleMarkdownFullscreen}
        />
        {mode == Modes.markdown && (
          <MarkdownEditor
            updateDraft={getUpdateDraft("markdown")}
            initialValue={getDraft("markdown")}
            height={markdownFullscreen ? `calc(100vh - 168px)` : `30vh`}
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
