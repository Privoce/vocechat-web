import { FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { ChatPrefixes, ContentTypes } from "@/app/config";
import { updateInputMode } from "@/app/slices/ui";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { ChatContext } from "@/types/common";
import MarkdownEditor from "@/components/MarkdownEditor";
import useAddLocalFileMessage from "@/hooks/useAddLocalFileMessage";
import useDraft from "@/hooks/useDraft";
import useSendMessage from "@/hooks/useSendMessage";
import useUploadFile from "@/hooks/useUploadFile";
import useUserOperation from "@/hooks/useUserOperation";
import StyledButton from "../styled/Button";
import TextInput from "../TextInput";
import Replying from "./Replying";
import Toolbar from "./Toolbar";
import UploadFileList from "./UploadFileList";
import { shallowEqual } from "react-redux";
import MessageInput from "../MessageInput";
import { Emoji } from "@udecode/plate-emoji";
import { EmojiInputPicker } from "../MessageInput/plate-ui/emoji-input-picker";
import { MessageWithMentions } from "@/types/message";
import { PlateEditor } from "@udecode/plate-common";

const Modes = {
  text: "text",
  markdown: "markdown"
};
interface IProps {
  context?: ChatContext;
  id: number;
}
const Send: FC<IProps> = ({
  // 发给谁，或者是 channel，或者是 user
  context = "channel",
  id
}) => {
  const editorRef = useRef<PlateEditor | null>(null);

  const { t } = useTranslation("chat");
  const { unblockThisContact, blocked } = useUserOperation({
    uid: context == "dm" ? id : undefined,
    cid: context == "channel" ? id : undefined
  });
  const { resetStageFiles } = useUploadFile({ context, id });
  const { getDraft, getUpdateDraft } = useDraft({ context, id });
  const [msg, setMsg] = useState<MessageWithMentions>({
    text: "",
    mentions: []
  });
  const [markdownEditor, setMarkdownEditor] = useState(null);
  const [markdownFullscreen, setMarkdownFullscreen] = useState(false);
  const dispatch = useAppDispatch();
  const addLocalFileMessage = useAddLocalFileMessage({ context, to: id });
  // 谁发的
  const from_uid = useAppSelector((store) => store.authData.user?.uid, shallowEqual);
  const replying_mid = useAppSelector(
    (store) => store.message.replying[`${context}_${id}`],
    shallowEqual
  );
  const mode = useAppSelector((store) => store.ui.inputMode, shallowEqual);
  const uploadFiles = useAppSelector(
    (store) => store.ui.uploadFiles[`${context}_${id}`] ?? [],
    shallowEqual
  );
  const uids = useAppSelector((store) => store.users.ids, shallowEqual);
  const channelsData = useAppSelector((store) => store.channels.byId, shallowEqual);
  const usersData = useAppSelector((store) => store.users.byId, shallowEqual);
  const { sendMessage } = useSendMessage({ context, from: from_uid, to: id });

  const insertEmoji = (emoji: Emoji) => {
    console.log({ emoji });

    if (mode == Modes.markdown && markdownEditor) {
      // markdown insert emoji
      const { native } = emoji.skins[0];
      markdownEditor.insertText(native);
    }
  };
  const handleSendMessage = async () => {
    if (!id || !msg.text.trim()) return;
    // send text msgs
    if (editorRef.current) {
      editorRef.current.reset();
    }
    const { text, mentions } = msg;
    const properties = { mentions };
    properties.local_id = +new Date();
    await sendMessage({
      id,
      reply_mid: replying_mid,
      type: "text",
      content: text,
      from_uid,
      properties
    });
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
  if (context == "dm" && blocked) {
    return (
      <div className="p-5 bg-gray-200 rounded-lg w-full dark:bg-gray-600 text-red-300">
        {t("contact_block_tip")}
        <StyledButton className="mini ml-4" onClick={unblockThisContact}>
          {t("unblock")}
        </StyledButton>
      </div>
    );
  }
  return (
    <>
      {/* mobile input */}
      <TextInput sendMessage={handleSendMessage} placeholder={placeholder} />
      {/* PC input */}
      <div
        className={clsx(
          `send hidden md:block relative bg-gray-200 rounded-lg w-full dark:bg-gray-600 ${mode} ${
            markdownFullscreen ? "fullscreen" : ""
          } ${replying_mid ? "reply" : ""} ${context}`,
          isMarkdownMode && markdownFullscreen && "-mt-9"
        )}
      >
        {replying_mid && <Replying context={context} mid={replying_mid} id={id} />}
        {mode == Modes.text && <UploadFileList context={context} id={id} />}

        <div
          className={clsx(
            `flex justify-between items-center px-4 py-3.5`,
            isMarkdownMode ? `grid grid-cols-[1fr_1fr] grid-rows-[auto_auto] gap-0` : "gap-4"
          )}
        >
          {mode == Modes.markdown && (
            <EmojiInputPicker options={{ closeOnSelect: false }} onSelectEmoji={insertEmoji} />
          )}
          {mode == Modes.text && (
            <MessageInput
              editorRef={editorRef}
              members={members}
              id={`${context}_${id}`}
              updateMessage={setMsg}
              sendMessage={handleSendMessage}
              placeholder={placeholder}
            />
          )}
          <Toolbar
            sendMessages={handleSendMessage}
            sendVisible={msg.text.trim().length > 0 || uploadFiles.length > 0}
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
// export default memo(Send, (prev, next) => {
//   console.log("send name", prev.name, next.name);
//   return prev.name == next.name;
// });
