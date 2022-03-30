import { batch } from "react-redux";
import {
  addChannelMsg,
  removeChannelMsg,
} from "../../../app/slices/message.channel";
import {
  addMessage,
  removeMessage,
  updateMessage,
} from "../../../app/slices/message";
import { toggleReactionMessage } from "../../../app/slices/message.reaction";
import {
  addFileMessage,
  removeFileMessage,
} from "../../../app/slices/message.file";
import { addUserMsg, removeUserMsg } from "../../../app/slices/message.user";
import { updateAfterMid } from "../../../app/slices/footprint";
import { ContentTypes } from "../../../app/config";
const handler = (data, dispatch, currState) => {
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
      detail: innerDetail,
    },
  } = data;
  const common = {
    from_uid,
    created_at,
    content,
    content_type,
    properties,
    expires_in,
  };
  switch (type) {
    case "normal":
    case "reply":
      // 更新after_mid
      dispatch(updateAfterMid(mid));
      break;
  }
  const { ready, loginUid, readUsers = {}, readChannels = {} } = currState;
  const to = typeof target.gid !== "undefined" ? "channel" : "user";
  const appendMessage = to == "user" ? addUserMsg : addChannelMsg;
  const self = from_uid == loginUid;
  // 此处有点绕
  const id = to == "user" ? (self ? target.uid : from_uid) : target.gid;
  const readIndex = (to == "user" ? readUsers[id] : readChannels[id]) || 0;
  const read = self ? true : mid < readIndex ? true : false;
  switch (type) {
    case "normal":
      {
        batch(() => {
          dispatch(
            addMessage({
              mid,
              // 如果是自己发的消息，就是已读
              read,
              ...common,
            })
          );
          // 未推送完  or  不是自己发的消息
          console.log("curr state", ready, loginUid, common.from_uid);
          // if (!ready || loginUid != common.from_uid) {
          dispatch(
            appendMessage({
              id,
              mid,
              local_id: properties ? properties.local_id : null,
            })
          );
          // 加到file message 列表
          if (content_type == ContentTypes.file) {
            dispatch(addFileMessage(mid));
          }
          // }
        });
      }
      break;
    case "reply":
      {
        batch(() => {
          dispatch(
            addMessage({
              mid,
              reply_mid: detailMid,
              // 如果是自己发的消息，就是已读
              read,
              ...common,
            })
          );
          // 未推送完  or  不是自己发的消息
          // if (!ready || loginUid != common.from_uid) {
          dispatch(
            appendMessage({
              id,
              mid,
              local_id: properties ? properties.local_id : null,
            })
          );
          // }
        });
      }
      break;
    case "reaction":
      {
        const removeContextMessage =
          to == "user" ? removeUserMsg : removeChannelMsg;
        const { type, action, content, content_type, properties } = innerDetail;
        switch (type) {
          case "like":
            {
              dispatch(
                toggleReactionMessage({ from_uid, mid: detailMid, action })
              );
            }

            break;
          case "delete":
            {
              batch(() => {
                dispatch(removeContextMessage({ id, mid: detailMid }));
                dispatch(removeMessage(detailMid));
              });
              // 从file message 列表移除
              if (content_type == ContentTypes.file) {
                dispatch(removeFileMessage(detailMid));
              }
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
                  edited: true,
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
