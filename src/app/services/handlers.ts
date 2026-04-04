import toast from "react-hot-toast";
import { batch } from "react-redux";

import i18n from "@/i18n";
import { ContentTypes } from "../config";
import { addMessage, removeMessage } from "../slices/message";
import { addChannelMsg, removeChannelMsg } from "../slices/message.channel";
import { addUserMsg, removeUserMsg } from "../slices/message.user";

export const onMessageSendStarted = async (
  {
    ignoreLocal = false,
    id,
    content,
    type = "text",
    from_uid,
    reply_mid = null,
    properties = { local_id: +new Date(), content_type: "" },
  },
  { dispatch, queryFulfilled },
  from = "channel"
) => {
  // 忽略 archive 类型的消息 以及没有 from_uid
  if (type == "archive" || !from_uid) return;
  // id: who send to ,from_uid: who sent
  // console.log("handlers data", content, type, properties, ignoreLocal, id);
  const isMedia = properties.content_type
    ? ["image", "video", "audio"].includes(properties.content_type.toLowerCase().split("/")[0])
    : false;
  // const isImage = properties.content_type?.startsWith("image");
  const ts = properties.local_id || +new Date();
  const tmpMsg = {
    content: isMedia ? content.path : content,
    content_type: ContentTypes[type],
    created_at: ts,
    properties,
    from_uid,
    reply_mid,
    sending: true,
  };
  const addContextMessage = from == "channel" ? addChannelMsg : addUserMsg;
  const removeContextMessage = from == "channel" ? removeChannelMsg : removeUserMsg;
  if (!ignoreLocal) {
    batch(() => {
      dispatch(addMessage({ mid: ts, ...tmpMsg }));
      dispatch(addContextMessage({ id, mid: ts }));
    });
  }

  try {
    const { data: server_mid } = await queryFulfilled;
    // throw new Error();
    // console.log("message server mid", server_mid);
    batch(() => {
      dispatch(removeContextMessage({ id, mid: ts }));
      dispatch(addMessage({ mid: server_mid, ...tmpMsg, sending: false }));
      dispatch(addContextMessage({ id, mid: server_mid }));
    });
    setTimeout(() => {
      dispatch(removeMessage(ts));
    }, 300);
    // dispatch(removePendingMessage({ id, mid:ts, type: from }));
  } catch (error) {
    const httpStatus = error?.error?.originalStatus ?? error?.error?.status;
    const errData: string =
      typeof error?.error?.data === "string" ? error.error.data : "";
    if (httpStatus === 403) {
      if (errData.includes("disabled by the administrator")) {
        toast.error(i18n.t("dm_disabled", { ns: "member" }));
      } else {
        // 403 means blocked
        toast.error(i18n.t("send_failed_blocked", { ns: "member", defaultValue: "Send failed, blocked maybe" }));
      }
    } else {
      toast.error(i18n.t("send_failed", { ns: "member", defaultValue: "Send Message Failed" }));
    }
    dispatch(removeContextMessage({ id, mid: ts }));
    dispatch(removeMessage(ts));
    // patchResult.undo();
  }
};
