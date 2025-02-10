import { batch } from "react-redux";

import { ContentTypes } from "@/app/config";
import { updateAfterMid } from "@/app/slices/footprint";
import { addMessage, removeMessage, updateMessage } from "@/app/slices/message";
import { addChannelMsg, removeChannelMsg } from "@/app/slices/message.channel";
import { addFileMessage, removeFileMessage } from "@/app/slices/message.file";
import { toggleReactionMessage } from "@/app/slices/message.reaction";
import { addUserMsg, removeUserMsg } from "@/app/slices/message.user";
import { AppDispatch } from "@/app/store";
import { ChatEvent } from "@/types/sse";
import { playMessageSound } from "@/utils";

type CurrentState = {
  afterMid: number;
  ready: boolean;
  loginUid: number;
  readUsers: {
    [key: number]: number;
  };
  readChannels: {
    [key: number]: number;
  };
};
const handler = (
  data: ChatEvent,
  dispatch: AppDispatch,
  currState: CurrentState,
  fromHistory = false
) => {
  const {
    mid,
    from_uid,
    created_at,
    target,
    detail: {
      mid: detailMid,
      content,
      content_type,
      type,
      properties,
      expires_in,
      detail: innerDetail
    }
  } = data;
  const common = {
    from_uid,
    created_at,
    content,
    content_type,
    properties,
    expires_in
  };
  const { loginUid, readUsers = {}, readChannels = {}, ready } = currState;
  if (!fromHistory) {
    // 如果来自历史消息的拉取，则忽略更新 after mid
    switch (type) {
      case "normal":
      case "reply":
        {
          if (currState.afterMid < mid) {
            // 更新after_mid
            dispatch(updateAfterMid(mid));
          }
        }
        break;
    }
    if (loginUid != common.from_uid && ready && window.MSG_SOUND) {
      // 已ready，来自SSE的非自己的消息推送
      playMessageSound();
    }
  }
  const to = "gid" in target ? "channel" : "user";
  const appendMessage = to == "user" ? addUserMsg : addChannelMsg;
  const self = from_uid == loginUid;
  // 此处有点绕
  const id = to == "user" ? (self ? target.uid : from_uid) : target.gid;
  const readIndex = (to == "user" ? readUsers[id] : readChannels[id]) || 0;
  const read = self ? true : mid < readIndex;
  switch (type) {
    case "normal": {
      batch(() => {
        // 如果是自己发的消息，就是已读
        dispatch(addMessage({ mid, read, ...common }));
        // 未推送完  or  不是自己发的消息
        // if (!ready || loginUid != common.from_uid) {
        dispatch(
          appendMessage({
            id,
            mid,
            local_id: properties ? properties.local_id : null
          })
        );
        // 加到 file message 列表
        if (content_type == ContentTypes.file) {
          dispatch(addFileMessage(mid));
        }
        // }
      });
      // 推给 PC 端
      console.info("{{NEW_MSG}}");
      break;
    }
    case "reply":
      {
        batch(() => {
          dispatch(
            addMessage({
              mid,
              reply_mid: detailMid,
              // 如果是自己发的消息，就是已读
              read,
              ...common
            })
          );
          // 未推送完  or  不是自己发的消息
          // if (!ready || loginUid != common.from_uid) {
          dispatch(
            appendMessage({
              id,
              mid,
              local_id: properties ? properties.local_id : null
            })
          );
          // }
        });
      }
      break;
    case "reaction":
      {
        const removeContextMessage = to == "user" ? removeUserMsg : removeChannelMsg;
        const { type, action, content, content_type, properties } = innerDetail;
        switch (type) {
          case "like":
            {
              // rid reaction's mid
              dispatch(
                toggleReactionMessage({
                  from_uid,
                  mid: detailMid,
                  rid: mid,
                  action
                })
              );
            }

            break;
          case "delete":
            {
              batch(() => {
                dispatch(removeContextMessage({ id, mid: detailMid }));
                dispatch(removeMessage(detailMid));
              });
              // 从 file message 列表移除
              // if (content_type == ContentTypes.file) {
              dispatch(removeFileMessage(detailMid));
              // }
            }
            break;
          case "edit":
            {
              dispatch(
                updateMessage({
                  mid: detailMid,
                  content,
                  content_type,
                  properties,
                  edited: true
                })
              );
            }
            break;

          default:
            break;
        }
      }
      break;

    default:
      break;
  }
};

export default handler;
