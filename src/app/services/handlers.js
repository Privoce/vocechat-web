import toast from "react-hot-toast";
import { ContentTypes } from "../config";
import {
  // addChannelMsg,
  addChannelPendingMsg,
  removeChannelPendingMsg,
  replaceChannelPendingMsg,
} from "../slices/message.channel";
import {
  addUserPendingMsg,
  removeUserPendingMsg,
  replaceUserPendingMsg,
} from "../slices/message.user";

// import {
//   addPendingMessage,
//   removePendingMessage,
// } from "../slices/message.pending";
export const onMessageSendStarted = async (
  { id, content, type, from_uid },
  { dispatch, queryFulfilled },
  from = "channel"
) => {
  // id: who send to ,from_uid: who sent
  const ts = new Date().getTime();
  const tmpMsg = {
    id,
    content: type == "image" ? URL.createObjectURL(content) : content,
    content_type: ContentTypes[type],
    created_at: ts,
    local_mid: ts,
    from_uid,
    // unread: false,
  };
  const addPendingMessage =
    from == "channel" ? addChannelPendingMsg : addUserPendingMsg;
  const replacePendingMessage =
    from == "channel" ? replaceChannelPendingMsg : replaceUserPendingMsg;
  const removePendingMessage =
    from == "channel" ? removeChannelPendingMsg : removeUserPendingMsg;
  // dispatch(addPendingMessage({ type: from, msg: tmpMsg }));
  dispatch(addPendingMessage({ ...tmpMsg }));
  try {
    const { data: server_mid } = await queryFulfilled;
    console.log("message server mid", server_mid);
    // 此处的id，是指给谁发的
    // const addMessage = from == "channel" ? addChannelMsg : addUserMsg;
    dispatch(replacePendingMessage({ id, local_mid: ts, server_mid }));
    // dispatch(removePendingMessage({ id, mid:ts, type: from }));
  } catch {
    console.log("message send failed");
    toast.error("Send Message Failed");
    dispatch(removePendingMessage({ id, mid: ts, type: from }));
    // patchResult.undo();
  }
};
