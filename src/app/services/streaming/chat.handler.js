import { batch } from "react-redux";
import { addChannelMsg, removeChannelMsg } from "../../slices/message.channel";
import { addMessage, removeMessage, updateMessage } from "../../slices/message";
import { toggleReactionMessage } from "../../slices/message.reaction";
import { addUserMsg, removeUserMsg } from "../../slices/message.user";
import { updateAfterMid } from "../../slices/footprint";
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
  const { ready, loginUid } = currState;
  const to = typeof target.gid !== "undefined" ? "channel" : "user";
  const appendMessage = to == "user" ? addUserMsg : addChannelMsg;
  const self = from_uid == loginUid;
  // 此处有点绕
  const id = to == "user" ? (self ? target.uid : from_uid) : target.gid;

  switch (type) {
    case "normal":
      {
        batch(() => {
          dispatch(
            addMessage({
              mid,
              // 如果是自己发的消息，就是已读
              read: self,
              ...common,
            })
          );
          // 未推送完  or  不是自己发的消息
          console.log("curr state", ready, loginUid, common.from_uid);
          if (!ready || loginUid != common.from_uid) {
            dispatch(appendMessage({ id, mid }));
          }
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
              read: self,
              ...common,
            })
          );
          // 未推送完  or  不是自己发的消息
          if (!ready || loginUid != common.from_uid) {
            dispatch(appendMessage({ id, mid }));
          }
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
