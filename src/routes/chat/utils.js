import React from "react";
import dayjs from "dayjs";
import { isImage } from "../../common/utils";
import { ContentTypes } from "../../app/config";
import Divider from "../../common/component/Divider";
import Message from "../../common/component/Message";
// function debounce(callback, wait = 2000, immediate = false) {
//   let timeout = null;
//   return function () {
//     const callNow = immediate && !timeout;
//     const next = () => callback.apply(this, arguments);
//     clearTimeout(timeout);
//     timeout = setTimeout(next, wait);
//     if (callNow) {
//       next();
//     }
//   };
// }
export function getUnreadCount({
  mids = [],
  messageData = {},
  loginUid = 0,
  readIndex = 0,
}) {
  console.log({ mids, loginUid, readIndex });
  // 先过滤掉空信息和from自己的
  const others = mids.filter((mid) => {
    const { from_uid = 0 } = messageData[mid] || {};
    return messageData[mid] && from_uid != loginUid;
  });
  if (others.length == 0) return { unreads: 0 };
  if (readIndex == 0) return { unreads: others.length };
  // 再过滤掉小于read-index，
  const final = others.filter((mid) => {
    return mid > readIndex;
  });
  // 拿at数量
  const tmps = [];
  final.forEach((mid) => {
    const msg = messageData[mid];
    const { mentions = [] } = msg.properties || {};
    mentions.forEach((id) => {
      if (id == loginUid) {
        tmps.push(mid);
      }
    });
  });
  console.log("unreads", final.length, tmps);
  return { unreads: final.length, mentions: tmps };
}
export const renderPreviewMessage = (message = null) => {
  if (!message) return null;
  const { content_type, content, properties = {} } = message;
  let res = null;
  switch (content_type) {
    case ContentTypes.text:
      {
        res = content;
      }
      break;
    case ContentTypes.markdown:
      {
        res = `[markdown]`;
      }

      break;
    case ContentTypes.file:
      {
        if (isImage(properties.file_type, properties.size)) {
          res = `[image]`;
        } else {
          res = `[file]`;
        }
      }

      break;

    default:
      break;
  }
  return res;
};
export const renderMessageFragment = ({
  isFirst = false,
  read = true,
  updateReadIndex,
  prev = null,
  curr = null,
  contextId = 0,
  context = "user",
}) => {
  if (!curr) return null;
  let { created_at, mid } = curr;
  let divider = null;
  let time = dayjs(created_at).format("YYYY/MM/DD");
  if (!prev) {
    divider = time;
  } else {
    let { created_at: prev_created_at } = prev;
    if (!dayjs(prev_created_at).isSame(created_at, "day")) {
      divider = time;
    }
  }

  return (
    <React.Fragment key={mid}>
      {divider && <Divider content={divider}></Divider>}
      <Message
        isFirst={isFirst}
        updateReadIndex={updateReadIndex}
        read={read}
        context={context}
        mid={mid}
        key={mid}
        contextId={contextId}
      />
    </React.Fragment>
  );
};

export default getUnreadCount;
