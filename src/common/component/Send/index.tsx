import { useEffect, useState, FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import useSendMessage from "../../hook/useSendMessage";
import useAddLocalFileMessage from "../../hook/useAddLocalFileMessage";
import { updateInputMode } from "../../../app/slices/ui";
import { ContentTypes, ChatPrefixes } from "../../../app/config";

// import StyledSend from "./styled";
import UploadFileList from "./UploadFileList";
import Replying from "./Replying";
import Toolbar from "./Toolbar";
import EmojiPicker from "./EmojiPicker";

import MarkdownEditor from "../MarkdownEditor";
import MixedInput, { useMixedEditor } from "../MixedInput";
import useDraft from "../../hook/useDraft";
import useUploadFile from "../../hook/useUploadFile";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import TextInput from "../TextInput";
import useUserOperation from "../../hook/useUserOperation";
import StyledButton from "../styled/Button";

const Modes = {
  text: "text",
  markdown: "markdown"
};
interface IProps {
  context?: "channel" | "user";
  id: number;
}
const Send: FC<IProps> = ({
  // 发给谁，或者是channel，或者是user
  context = "channel",
  id
}) => {
  const { t } = useTranslation("chat");
  const { unblockThisContact, blocked } = useUserOperation({ uid: context == "user" ? id : undefined, cid: context == "channel" ? id : undefined });
  const { resetStageFiles } = useUploadFile({ context, id });
  const { getDraft, getUpdateDraft } = useDraft({ context, id });
  const editor = useMixedEditor(`${context}_${id}`);
  const [msgs, setMsgs] = useState([]);
  const [markdownEditor, setMarkdownEditor] = useState(null);
  const [markdownFullscreen, setMarkdownFullscreen] = useState(false);
  const dispatch = useAppDispatch();
  const addLocalFileMessage = useAddLocalFileMessage({ context, to: id });
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
      uploadFiles: store.ui.uploadFiles[`${context}_${id}`] ?? []
    };
  });
  const { sendMessage } = useSendMessage({ context, from: from_uid, to: id });

  useEffect(() => {
    if (replying_mid) {
      editor.focus();
    }
  }, [replying_mid]);

  const insertEmoji = (emoji: string) => {
    if (mode == Modes.markdown && markdownEditor) {
      // markdown insert emoji
      markdownEditor.insertText(emoji);
    } else {
      editor.insertText(emoji);
    }
  };
  const handleSendMessage = async () => {
    if (!id) return;
    editor.resetInput();
    if (msgs && msgs.length) {
      // send text msgs
      for await (const msg of msgs) {
        const { type: content_type, content, properties = {} } = msg;
        if ((content as string).trim() === '') continue; // 空消息不发送
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
    if (uploadFiles.length !== 0) {
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
        addLocalFileMessage(tmpMsg);
      });
      resetStageFiles();
    }
  };
  const sendMarkdown = async (content: string) => {
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
  const placeholder = `${t("send_to")} ${ChatPrefixes[context]}${name} `;
  const members =
    context == "channel" ? (channelsData[id]?.is_public ? uids : channelsData[id]?.members) : [];
  const isMarkdownMode = mode == Modes.markdown;
  if (context == "user" && blocked) {
    return <div className="p-5 bg-gray-200 rounded-lg w-full dark:bg-gray-600 text-red-300">
      {t("contact_block_tip")}
      <StyledButton className="mini ml-4" onClick={unblockThisContact}>{t("unblock")}</StyledButton>
    </div>;
  }
  return (
    <>
      {/* mobile input */}
      <TextInput sendMessage={handleSendMessage} placeholder={placeholder} />
      {/* PC input */}
      <div
        className={clsx(`send hidden md:block relative bg-gray-200 rounded-lg w-full dark:bg-gray-600 ${mode} ${markdownFullscreen ? "fullscreen" : ""} ${replying_mid ? "reply" : ""
          } ${context}`, isMarkdownMode && markdownFullscreen && '-mt-9')}
      >
        {replying_mid && <Replying context={context} mid={replying_mid} id={id} />}
        {mode == Modes.text && <UploadFileList context={context} id={id} />}

        <div className={clsx(`flex justify-between items-center gap-4 px-4 py-3.5`, isMarkdownMode && `grid grid-cols-[1fr_1fr] grid-rows-[auto_auto] gap-0`)}>
          <EmojiPicker selectEmoji={insertEmoji} />
          {mode == Modes.text && (
            <MixedInput
              updateMessages={setMsgs}
              updateDraft={getUpdateDraft()}
              initialValue={getDraft()}
              members={members}
              id={`${context}_${id}`}
              placeholder={placeholder}
              sendMessages={handleSendMessage}
            />
          )}
          <Toolbar
            sendMessages={handleSendMessage}
            sendVisible={msgs.length > 0 || uploadFiles.length > 0}
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
      </div>
    </>
  );
};

export default Send;
// export default memo(Send, (prevs, nexts) => {
//   console.log("send name", prevs.name, nexts.name);
//   return prevs.name == nexts.name;
// });
