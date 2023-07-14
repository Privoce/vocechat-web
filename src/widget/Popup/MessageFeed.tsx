/* eslint-disable @typescript-eslint/indent */
import { memo, useEffect, useRef, useState } from "react";

import { useAppSelector } from "../../app/store";
import Message from "./Message";

type Props = {
  hostId: number;
};
const triggerScrollHeight = 1200;
const MessageFeed = ({ hostId }: Props) => {
  const firstRender = useRef(true);
  const [hasNewMsg, setHasNewMsg] = useState(false);
  const { mids, messageMap } = useAppSelector((store) => {
    return { mids: store.userMessage.byId[hostId], messageMap: store.message };
  });
  console.log("mids", mids, hostId);
  useEffect(() => {
    const container = document.querySelector("#MESSAGE_LIST_CONTAINER");
    if (container && mids && mids.length > 0) {
      const lastMsg = messageMap[mids[mids.length - 1]];
      const lastIsMyself = lastMsg.from_uid != hostId;
      const { scrollHeight, scrollTop } = container;
      const deltaHeight = scrollHeight - scrollTop;
      console.log("ttt", deltaHeight, lastIsMyself, firstRender.current);
      // 自己发送的消息
      if (lastIsMyself && lastMsg.sending) {
        container.scrollTop = container.scrollHeight;
      }
      // 在可视区域附近
      if (deltaHeight <= triggerScrollHeight) {
        container.scrollTop = container.scrollHeight;
        setHasNewMsg(false);
      } else if (!lastIsMyself && !firstRender.current) {
        console.log("new msg");
        setHasNewMsg(true);
      }
    }
    firstRender.current = false;
  }, [mids, messageMap, hostId]);
  const handleNewMessageScroll = () => {
    const container = document.querySelector("#MESSAGE_LIST_CONTAINER");
    if (container) {
      setHasNewMsg(false);
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 30);
    }
  };
  if (!mids) return null;
  return (
    <>
      {mids.map((mid) => {
        const currMsg = messageMap[mid];
        if (!currMsg) return null;
        const lastMsg = messageMap[mids[mids.length - 1]];
        console.log("lll", lastMsg);

        const { content, created_at = 0, from_uid = 0, sending = false } = currMsg;
        return (
          <Message
            uid={from_uid}
            host={hostId == from_uid}
            sending={sending}
            key={mid}
            mid={mid}
            type="text"
            content={content as string}
            create_time={created_at}
          />
        );
      })}

      {hasNewMsg && (
        <button
          type="button"
          className="sticky bottom-4 left-1/2 -translate-x-1/2 bg-white border border-orange-300 px-2 py-1.5 text-xs text-orange-500 rounded-lg"
          onClick={handleNewMessageScroll}
        >
          New Message
        </button>
      )}
    </>
  );
};

// export default MessageFeed;
export default memo(MessageFeed, (prev, next) => {
  return prev.hostId === next.hostId;
});
