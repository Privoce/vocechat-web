import { useState, useEffect } from "react";
import styled from "styled-components";
import { MdAdd } from "react-icons/md";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch } from "react-redux";

import { useSendChannelMsgMutation } from "../../app/services/channel";
import { useSendMsgMutation } from "../../app/services/contact";
import { addChannelMsg } from "../../app/slices/message.channel";
import { addUserMsg } from "../../app/slices/message.user";

const StyledSend = styled.div`
  position: sticky;
  top: calc(100vh - 90px);
  left: 16px;
  background: #f5f6f7;
  border-radius: 8px;
  width: 884px;
  min-height: 54px;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 4px 18px;
  .addon {
    cursor: pointer;
  }
  .input {
    width: 100%;
    position: relative;
    .content {
      padding: 4px;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #616161;
      width: 100%;
      border: none;
      background: none;
    }
    .btn {
      cursor: pointer;
      border: none;
      border-radius: 4px;
      padding: 2px 6px;
      background: green;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;
const Types = {
  channel: "#",
  user: "@",
};
export default function Send({ name, type = "channel", id = "" }) {
  const dispatch = useDispatch();
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
  const [msg, setMsg] = useState("");
  const handleMsgChange = (evt) => {
    setMsg(evt.target.value);
  };
  useEffect(() => {
    if (sendSuccess) {
      dispatch(addUserMsg({ id, ...sendData }));
      setMsg("");
    }
  }, [sendSuccess, sendData]);

  useEffect(() => {
    if (sendChannelSuccess) {
      const { gid, ...rest } = sendChannelData;
      dispatch(addChannelMsg({ id: gid, ...rest }));
      setMsg("");
    }
  }, [sendChannelSuccess, sendChannelData]);

  const handleSendMessage = () => {
    if (!msg || !type || !id) return;
    switch (type) {
      case "channel":
        sendChannelMsg({ gid: id, message: msg });
        break;
      case "user":
        sendMsg({ uid: id, message: msg });
        break;

      default:
        break;
    }
  };
  return (
    <StyledSend className="send">
      <MdAdd className="addon" size={20} color="#78787C" />
      <div className="input">
        <TextareaAutosize
          className="content"
          maxRows={8}
          minRows={1}
          onChange={handleMsgChange}
          value={msg}
          placeholder={`给 ${Types[type]}${name} 发消息`}
        />
        <button
          disabled={sending || channelSending}
          className="btn"
          onClick={handleSendMessage}
        >
          {/* {sending ? `Sending` : `Send`} */}
          Send
        </button>
      </div>
      <div className="emoji">emoji</div>
    </StyledSend>
  );
}
