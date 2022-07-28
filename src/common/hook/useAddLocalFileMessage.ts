// import React from 'react'
import { useDispatch } from "react-redux";
import { addMessage, MessagePayload } from "../../app/slices/message";
import { addChannelMsg } from "../../app/slices/message.channel";
import { addUserMsg } from "../../app/slices/message.user";

interface IProps {
  context: "channel" | "user";
  to: number;
}
export default function useAddLocalFileMessage({ context, to }: IProps) {
  const dispatch = useDispatch();
  const addContextMessage = context == "channel" ? addChannelMsg : addUserMsg;
  const addLocalFileMessage = (data: MessagePayload) => {
    dispatch(addMessage(data));
    dispatch(addContextMessage({ id: to, mid: data.mid }));
  };
  return addLocalFileMessage;
}
