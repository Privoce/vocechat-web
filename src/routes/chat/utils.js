import React from "react";
import dayjs from "dayjs";
import { ContentTypes } from "../../app/config";
import Divider from "../../common/component/Divider";
import Message from "../../common/component/Message";
export const getUnreadCount = (mids, messageData) => {
  if (!mids || !messageData) return 0;
  let unreads = 0;
  mids.forEach((id) => {
    if (messageData[id] && !messageData[id].read) {
      unreads++;
    }
  });
  return unreads;
};
export const renderPreviewMessage = (message = null) => {
  if (!message) return null;
  const { content_type, content } = message;
  let res = null;
  switch (content_type) {
    case ContentTypes.text:
      {
        res = <div className="msg">{content}</div>;
      }
      break;
    case ContentTypes.imageJPG:
    case ContentTypes.image:
      {
        res = <div className="msg">[image]</div>;
      }

      break;
    case ContentTypes.markdown:
      {
        res = <div className="msg">[markdown]</div>;
      }

      break;
    case ContentTypes.file:
      {
        res = <div className="msg">[file]</div>;
      }

      break;

    default:
      break;
  }
  return res;
};
export const renderMessageFragment = ({
  prev = null,
  curr = null,
  contextId = 0,
  read = true,
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
