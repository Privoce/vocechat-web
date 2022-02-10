import { useState, useEffect, useRef } from "react";
import { MdAdd } from "react-icons/md";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch } from "react-redux";
import { useKey } from "rooks";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { useSendChannelMsgMutation } from "../../../app/services/channel";
import { useSendMsgMutation } from "../../../app/services/contact";
import { addChannelMsg } from "../../../app/slices/message.channel";
import { addUserMsg } from "../../../app/slices/message.user";
import StyledSend from "./styled";
import UploadModal from "./UploadModal";

const Types = {
  channel: "#",
  user: "@",
};
export default function Send({
  name,
  type = "channel",
  id = "",
  dragFiles = [],
}) {
  const [files, setFiles] = useState([]);
  const inputRef = useRef();
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [shift, setShift] = useState(false);
  const [enter, setEnter] = useState(false);
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  console.log("send drag files", dragFiles);
  useEffect(() => {
    if (dragFiles.length) {
      setFiles((prev) => [...prev, ...dragFiles]);
    }
  }, [dragFiles]);

  const toggleEmojiPicker = () => {
    setEmojiPicker((prev) => !prev);
  };
  const [
    sendMsg,
    { isLoading: sending, isSuccess: sendSuccess, data: sendData },
  ] = useSendMsgMutation();
  const [
    sendChannelMsg,
    {
      isLoading: channelSending,
      isSuccess: sendChannelSuccess,
      data: sendChannelData,
    },
  ] = useSendChannelMsgMutation();
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
      // inputRef.current.focus();
    }
  };
  const handleInputKeydown = (e) => {
    setEnter(e.key === "Enter");
  };
  const handleEmojiSelect = (emoji) => {
    console.log(emoji);
    setMsg((prev) => `${prev}${emoji.native}`);
    // inputRef.current.focus();
    toggleEmojiPicker();
  };
  useEffect(() => {
    if (sendSuccess) {
      dispatch(addUserMsg({ id, ...sendData, unread: false }));
      setMsg("");
    }
  }, [sendSuccess, sendData]);

  useEffect(() => {
    if (sendChannelSuccess) {
      const { gid, ...rest } = sendChannelData;
      dispatch(addChannelMsg({ id: gid, ...rest, unread: false }));
      setMsg("");
    }
  }, [sendChannelSuccess, sendChannelData]);
  useEffect(() => {
    inputRef.current.focus();
  }, [msg]);
  const handleUpload = (evt) => {
    setFiles([...evt.target.files]);
  };
  const resetFiles = () => {
    setFiles([]);
  };
  const handleSendMessage = () => {
    if (!msg || !type || !id) return;
    switch (type) {
      case "channel":
        sendChannelMsg({ id, content: msg });
        break;
      case "user":
        sendMsg({ id, content: msg });
        break;

      default:
        break;
    }
  };
  return (
    <>
      <StyledSend className="send">
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
            // autoFocus
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
          <button className="toggle" onClick={toggleEmojiPicker}>
            😄
          </button>
          {emojiPicker && (
            <div className="picker">
              <Picker
                onSelect={handleEmojiSelect}
                showPreview={false}
                showSkinTones={false}
              />
            </div>
          )}
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
