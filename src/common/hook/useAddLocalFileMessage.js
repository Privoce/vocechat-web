// import React from 'react'
import { useDispatch } from "react-redux";

import { addMessage } from "../../app/slices/message";
import { addChannelMsg } from "../../app/slices/message.channel";
import { addUserMsg } from "../../app/slices/message.user";
export default function useAddLocalFileMessage({ context, to }) {
  const dispatch = useDispatch();
  const addContextMessage = context == "channel" ? addChannelMsg : addUserMsg;
  const addLocalFileMesage = (data) => {
    dispatch(addMessage(data));
    dispatch(addContextMessage({ id: to, mid: data.mid }));
  };
  return addLocalFileMesage;
}
