// import React from "react";
import {
  updateChannelMsg,
  addChannelMsg,
  deleteChannelMsg,
  likeChannelMsg,
} from "../../../app/slices/message.channel";
import {
  updateUserMsg,
  addUserMsg,
  deleteUserMsg,
  likeUserMsg,
} from "../../../app/slices/message.user";
import useNotification from "./useNotification";
import { useDispatch } from "react-redux";
export default function useMessageHandler(currUser) {
  const { showNotification } = useNotification();
  const dispatch = useDispatch();
  const dispatchReaction = ({
    to = "user",
    id,
    from_uid,
    mid,
    created_at,
    detail = {},
  }) => {
    const { type = "" } = detail;
    const updateMsg = to == "user" ? updateUserMsg : updateChannelMsg;
    const deleteMsg = to == "user" ? deleteUserMsg : deleteChannelMsg;
    const likeMsg = to == "user" ? likeUserMsg : likeChannelMsg;
    switch (type) {
      case "edit":
        {
          const { content } = detail;
          dispatch(updateMsg({ id, mid, content, time: created_at }));
        }
        break;
      case "like":
        dispatch(likeMsg({ id, from_uid, mid, action: detail.action }));
        break;
      case "delete":
        dispatch(deleteMsg({ id, mid }));
        break;

      default:
        break;
    }
  };
  const dispatchAddMessage = ({ to = "user", id, self = false, common }) => {
    const addMessage = to == "user" ? addUserMsg : addChannelMsg;
    dispatch(
      addMessage({
        id, // 自己发的 就不用标记未读
        read: !self,
        ...common,
      })
    );
    if (!self) {
      showNotification({
        body: common.content,
        data: {
          path: `/chat/${to}/${id}`,
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
    const to = typeof target.gid !== "undefined" ? "channel" : "user";
    const self = from_uid == currUser.uid;
    const id = to == "user" ? (self ? target.uid : from_uid) : target.gid;
    switch (type) {
      case "normal":
        {
          dispatchAddMessage({
            to,
            id,
            self,
            common: {
              mid,
              content,
              content_type,
              from_uid,
              created_at,
              expires_in,
            },
          });
        }
        break;
      case "reply":
        {
          dispatchAddMessage({
            to,
            id,
            self,
            common: {
              mid,
              reply_mid: detailMid,
              content,
              content_type,
              from_uid,
              created_at,
              expires_in,
            },
          });
        }
        break;
      case "reaction": {
        dispatchReaction({
          to,
          id,
          from_uid,
          created_at,
          mid: detailMid,
          detail,
        });
      }
    }
  };
  return handleMessage;
}
