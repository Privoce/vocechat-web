// import React from "react";
import {
  addChannelMsg,
  deleteChannelMsg,
  likeChannelMsg,
} from "../../../app/slices/message.channel";
import {
  addUserMsg,
  deleteUserMsg,
  likeUserMsg,
} from "../../../app/slices/message.user";
import useNotification from "./useNotification";
import { useDispatch } from "react-redux";
export default function useMessageHandler(currUser) {
  const { showNotification } = useNotification();
  const dispatch = useDispatch();
  const handleReaction = ({ from = "user", id, mid, detail = {} }) => {
    const { type = "" } = detail;
    const deleteMsg = from == "user" ? deleteUserMsg : deleteChannelMsg;
    const likeMsg = from == "user" ? likeUserMsg : likeChannelMsg;
    switch (type) {
      case "edit":
        break;
      case "like":
        dispatch(likeMsg({ id, mid, action: detail.action }));
        break;
      case "delete":
        dispatch(deleteMsg({ id, mid }));
        break;

      default:
        break;
    }
  };
  const handleUserMessage = ({
    self = false,
    uid,
    from_uid,
    created_at,
    content,
    mid,
    detailMid,
    content_type,
    expires_in,
    type,
    detail,
  }) => {
    switch (type) {
      case "normal":
        dispatch(
          addUserMsg({
            // 此处需要特别注意
            id: self ? uid : from_uid,
            from_uid: from_uid,
            unread: !self,
            created_at,
            mid,
            content,
            content_type,
            expires_in,
            type,
          })
        );
        break;
      case "reaction":
        handleReaction({
          from: "user",
          id: self ? uid : from_uid,
          mid: detailMid,
          detail,
        });
        break;
      default:
        break;
    }
    if (!self && type == "normal") {
      showNotification({
        body: content,
        data: {
          path: `/chat/dm/${from_uid}`,
        },
      });
    }
  };
  const handleChannelMessage = ({
    gid,
    from_uid,
    created_at,
    content,
    mid,
    detailMid,
    content_type,
    expires_in,
    type,
    detail,
  }) => {
    const isSelf = from_uid == currUser.uid;
    switch (type) {
      case "normal":
        dispatch(
          addChannelMsg({
            id: gid,
            from_uid,
            // 自己发的 就不用标记未读
            unread: !isSelf,
            created_at,
            mid,
            content,
            content_type,
            expires_in,
            type,
          })
        );
        break;
      case "reaction":
        handleReaction({ from: "channel", id: gid, mid: detailMid, detail });
        break;
      default:
        break;
    }
    // group message notification
    if (!isSelf && type == "normal") {
      showNotification({
        body: content,
        data: {
          path: `/chat/channel/${gid}`,
        },
      });
    }
  };
  const handleMessage = (data) => {
    const { target } = data;
    const {
      created_at,
      mid,
      from_uid,
      detail: {
        mid: detailMid,
        content,
        content_type,
        expires_in,
        type,
        detail = {},
      },
    } = data;
    if (typeof target.gid !== "undefined") {
      // channel message
      handleChannelMessage({
        gid: target.gid,
        created_at,
        mid,
        detailMid,
        from_uid,
        content,
        content_type,
        expires_in,
        type,
        detail,
      });
    } else {
      const isSelf = data.from_uid == currUser.uid;
      handleUserMessage({
        self: isSelf,
        uid: target.uid,
        from_uid,
        created_at,
        content,
        mid,
        detailMid,
        content_type,
        expires_in,
        type,
        detail,
      });
    }
  };
  return handleMessage;
}
