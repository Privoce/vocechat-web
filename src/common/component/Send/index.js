import { useState, useEffect, useRef } from "react";
import { MdAdd } from "react-icons/md";
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
import EmojiPicker from "./EmojiPicker";
import Replying from "./Replying";

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
  const [replyMessage] = useReplyMessageMutation();
  const { files, setFiles, resetFiles } = useFiles([]);
  const inputRef = useRef();
  const [shift, setShift] = useState(false);
  const [enter, setEnter] = useState(false);
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
    inputRef.current.focus();
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

  return (
    <>
      <StyledSend className={`send ${replying_mid ? "reply" : ""}`}>
        {replying_mid && <Replying mid={replying_mid} id={id} />}
        <div className="addon">
          <MdAdd size={20} color="#78787C" />
          <input
            multiple={true}
            onChange={handleUpload}
            type="file"
            name="file"
            id="file"
          />
        </div>
        <div className="input">
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
            placeholder={`给 ${Types[type]}${name} 发消息`}
          />
        </div>
        <div className="emoji">
          <EmojiPicker selectEmoji={selectEmoji} />
        </div>
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
