import { memo } from "react";
// import TextareaAutosize from "react-textarea-autosize";
import { useDispatch, useSelector } from "react-redux";
// import { useKey } from "rooks";
import { getPlateEditorRef } from "@udecode/plate";
import { updateInputMode } from "../../../app/slices/ui";
import { removeReplyingMessage } from "../../../app/slices/message";
import { useSendChannelMsgMutation } from "../../../app/services/channel";
import { useSendMsgMutation } from "../../../app/services/contact";
import { useReplyMessageMutation } from "../../../app/services/message";
import StyledSend from "./styled";
import Replying from "./Replying";
import Toolbar from "./Toolbar";
import EmojiPicker from "./EmojiPicker";

import MarkdownEditor from "../MarkdownEditor";
// import MarkdownInput from "../MarkdownInput";
import MixedInput, { TEXT_EDITOR_PREFIX } from "../MixedInput";
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
  type = "channel",
  // 发给谁，或者是channel，或者是user
  id = "",
}) {
  // const editorRef = usePlateEditorRef(`${TEXT_EDITOR_PREFIX}_${type}_${id}`);
  const [replyMessage] = useReplyMessageMutation();
  const dispatch = useDispatch();
  // 谁发的
  const { from_uid, replying_mid = null, mode } = useSelector((store) => {
    return {
      mode: store.ui.inputMode,
      from_uid: store.authData.uid,
      replying_mid: store.message.replying[id],
    };
  });

  const [sendMsg] = useSendMsgMutation();
  const [sendChannelMsg] = useSendChannelMsgMutation();
  const sendMessage = type == "channel" ? sendChannelMsg : sendMsg;
  // const sendingMessage = userSending || channelSending;
  const insertEmoji = (emoji) => {
    console.log("insert emoji", emoji);
    const editorRef = getPlateEditorRef(`${TEXT_EDITOR_PREFIX}_${type}_${id}`);
    if (editorRef) {
      console.log("wtf", editorRef);
      editorRef.insertText(emoji);
    }
  };
  const handleSendMessage = async (msgs = []) => {
    if (!msgs || msgs.length == 0 || !id) return;
    for await (const msg of msgs) {
      const { type, value: content } = msg;
      if (replying_mid) {
        console.log("replying", replying_mid);
        await replyMessage({
          id,
          reply_mid: replying_mid,
          type,
          content,
          context: type,
          from_uid,
        });
        dispatch(removeReplyingMessage(id));
      } else {
        await sendMessage({
          id,
          type,
          content,
          from_uid,
          properties: { local_id: new Date().getTime() },
        });
      }
    }
  };
  const sendMarkdown = (content) => {
    sendMessage({
      id,
      type: "markdown",
      content,
      from_uid,
      properties: { local_id: new Date().getTime() },
    });
  };
  const toggleMode = () => {
    dispatch(updateInputMode(mode == Modes.text ? Modes.markdown : Modes.text));
  };
  return (
    <StyledSend
      className={`send ${mode} ${replying_mid ? "reply" : ""} ${type}`}
    >
      {replying_mid && <Replying mid={replying_mid} id={id} />}
      <EmojiPicker selectEmoji={insertEmoji} />
      {mode == Modes.text && (
        <MixedInput
          id={`${type}_${id}`}
          placeholder={`Send to ${Types[type]}${name} `}
          sendMessages={handleSendMessage}
        />
      )}
      {/* <MarkdownInput placeholder={`Send to ${Types[type]}${name} `} /> */}
      <Toolbar type={type} to={id} mode={mode} toggleMode={toggleMode} />
      {mode == Modes.markdown && (
        <MarkdownEditor
          placeholder={`Send to ${Types[type]}${name} `}
          // updateMarkdown={setMarkdown}
          sendMarkdown={sendMarkdown}
        />
      )}
    </StyledSend>
  );
}
export default memo(Send, (prevs, nexts) => {
  console.log("send name", prevs.name, nexts.name);
  return prevs.name == nexts.name;
});
