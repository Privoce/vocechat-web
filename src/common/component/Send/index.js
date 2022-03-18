import { useState, useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch, useSelector } from "react-redux";
import { useKey } from "rooks";

import { removeReplyingMessage } from "../../../app/slices/message";
import { useSendChannelMsgMutation } from "../../../app/services/channel";
import { useSendMsgMutation } from "../../../app/services/contact";
import { useReplyMessageMutation } from "../../../app/services/message";
import StyledSend from "./styled";
import useFiles from "./useFiles";
import UploadModal from "./UploadModal";
import Replying from "./Replying";
import Toolbar from "./Toolbar";
import MarkdownEditor from "../MarkdownEditer";
const Types = {
  channel: "#",
  user: "@",
};
export default function Send({
  name,
  type = "channel",
  // 发给谁，或者是channel，或者是user
  id = "",
  dragFiles = [],
}) {
  const [contentType, setContentType] = useState("text");
  const [replyMessage] = useReplyMessageMutation();
  const { files, setFiles, resetFiles } = useFiles([]);
  const inputRef = useRef();
  const [shift, setShift] = useState(false);
  const [enter, setEnter] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  // 谁发的
  const { from_uid, replying_mid = null } = useSelector((store) => {
    return {
      from_uid: store.authData.uid,
      replying_mid: store.message.replying[id],
    };
  });
  useEffect(() => {
    if (dragFiles.length) {
      setFiles((prev) => [...prev, ...dragFiles]);
    }
  }, [dragFiles]);

  const [sendMsg, { isLoading: userSending }] = useSendMsgMutation();
  const [
    sendChannelMsg,
    { isLoading: channelSending },
  ] = useSendChannelMsgMutation();
  const sendMessage = type == "channel" ? sendChannelMsg : sendMsg;
  const sendingMessage = userSending || channelSending;
  useKey(
    "Shift",
    (e) => {
      console.log("shift", e.type);
      setShift(e.type == "keydown");
    },
    { eventTypes: ["keydown", "keyup"], target: inputRef }
  );
  const handleMsgChange = (evt) => {
    if (enter && !shift) {
      handleSendMessage();
    } else {
      setMsg(evt.target.value);
    }
  };
  const handleInputKeydown = (e) => {
    console.log("keydown event", e);
    setEnter(e.key === "Enter");
  };
  const selectEmoji = (emoji) => {
    setMsg((prev) => `${prev}${emoji}`);
  };
  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
  }, [msg, replying_mid]);
  const handleUpload = (evt) => {
    setFiles([...evt.target.files]);
  };
  const handleSendMessage = () => {
    if (!msg || !id || sendingMessage) return;
    if (replying_mid) {
      console.log("replying", replying_mid);
      replyMessage({
        id,
        reply_mid: replying_mid,
        content: msg,
        context: type,
        from_uid,
      });
      dispatch(removeReplyingMessage(id));
    } else {
      sendMessage({ id, content: msg, from_uid });
    }
    setMsg("");
  };
  const sendMarkdown = () => {
    console.log("markdown", markdown, markdown.endsWith("\\"));
    sendMessage({
      id,
      content: markdown,
      from_uid,
      type: "markdown",
    });
    setMarkdown("");
  };

  return (
    <>
      <StyledSend className={`send ${replying_mid ? "reply" : ""} ${type}`}>
        {replying_mid && <Replying mid={replying_mid} id={id} />}

        <div className="input">
          {contentType == "markdown" ? (
            <MarkdownEditor value={markdown} updateValue={setMarkdown} />
          ) : (
            <TextareaAutosize
              autoFocus
              onFocus={(e) =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length
                )
              }
              ref={inputRef}
              className="content"
              maxRows={8}
              minRows={1}
              onKeyDown={handleInputKeydown}
              onChange={handleMsgChange}
              value={msg}
              placeholder={`Send to ${Types[type]}${name}`}
            />
          )}
        </div>
        <Toolbar
          handleSend={sendMarkdown}
          contentType={contentType}
          updateContentType={setContentType}
          selectEmoji={selectEmoji}
          handleUpload={handleUpload}
        />
      </StyledSend>
      {files.length !== 0 && (
        <UploadModal
          type={type}
          files={files}
          sendTo={id}
          closeModal={resetFiles}
        />
      )}
    </>
  );
}
