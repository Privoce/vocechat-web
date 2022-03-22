import toast from "react-hot-toast";
import { batch } from "react-redux";
import { ContentTypes } from "../config";
import { addChannelMsg, removeChannelMsg } from "../slices/message.channel";
import { addUserMsg, removeUserMsg } from "../slices/message.user";
import { addMessage, removeMessage } from "../slices/message";
export const onMessageSendStarted = async (
  {
    id,
    content,
    type = "text",
    from_uid,
    reply_mid = null,
    properties = { local_id: new Date().getTime() },
  },
  { dispatch, queryFulfilled },
  from = "channel"
) => {
  // id: who send to ,from_uid: who sent
  const ts = properties.local_id || new Date().getTime();
  const tmpMsg = {
    content: type == "image" ? URL.createObjectURL(content) : content,
    content_type: ContentTypes[type],
    created_at: ts,
    properties,
    from_uid,
    reply_mid,
    // 已读
    read: true,
    sending: true,
  };
  const addContextMessage = from == "channel" ? addChannelMsg : addUserMsg;
  const removeContextMessage =
    from == "channel" ? removeChannelMsg : removeUserMsg;
  batch(() => {
    dispatch(addMessage({ mid: ts, ...tmpMsg }));
    dispatch(addContextMessage({ id, mid: ts }));
  });

  try {
    const { data: server_mid } = await queryFulfilled;
    console.log("message server mid", server_mid);
    batch(() => {
      dispatch(removeContextMessage({ id, mid: ts }));
      dispatch(removeMessage(ts));
      dispatch(addMessage({ mid: server_mid, ...tmpMsg }));
      dispatch(addContextMessage({ id, mid: server_mid }));
    });
    // dispatch(removePendingMessage({ id, mid:ts, type: from }));
  } catch {
    console.log("message send failed");
    toast.error("Send Message Failed");
    dispatch(removeContextMessage({ id, mid: ts }));
    dispatch(removeMessage(ts));
    // patchResult.undo();
  }
};
