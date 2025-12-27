import { useCallback, useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { useDebounce } from "rooks";

import { useLazyLoadMoreMessagesQuery, useReadMessageMutation } from "@/app/services/message";
import { updateHistoryMark } from "@/app/slices/footprint";
import { useAppSelector } from "@/app/store";
import { ChatContext } from "@/types/common";
import { renderMessageFragment } from "../../utils";
import NewMessageBottomTip from "../NewMessageBottomTip";
import CustomHeader from "./CustomHeader";
import CustomList from "./CustomList";

type Props = {
  context: ChatContext;
  id: number;
};

export interface VirtualMessageFeedHandle {
  scrollToMessage: (mid: number) => void;
}

// const firstMsgIndex = 10000;
// let prevMids: number[] = [];
const VirtualMessageFeed = forwardRef<VirtualMessageFeedHandle, Props>(({ context, id }, ref) => {
  const dispatch = useDispatch();
  // const { t } = useTranslation("chat");
  // const [firstItemIndex, setFirstItemIndex] = useState(firstMsgIndex);
  const [atBottom, setAtBottom] = useState(false);
  const [loadMoreMessage, { isLoading: loadingMore, isSuccess, data: historyData }] =
    useLazyLoadMoreMessagesQuery();
  const vList = useRef<VirtuosoHandle | null>(null);
  const [updateReadIndex] = useReadMessageMutation();
  const updateReadDebounced = useDebounce(updateReadIndex, 300);
  const historyMid = useAppSelector(
    (store) =>
      context == "dm"
        ? store.footprint.historyUsers[id] ?? ""
        : store.footprint.historyChannels[id] ?? "",
    shallowEqual
  );
  const mids = useAppSelector(
    (store) =>
      context == "dm" ? store.userMessage.byId[id] ?? [] : store.channelMessage[id] ?? [],
    shallowEqual
  );
  const selects = useAppSelector(
    (store) => store.ui.selectMessages[`${context}_${id}`],
    shallowEqual
  );
  const messageData = useAppSelector((store) => store.message || {}, shallowEqual);
  const loginUid = useAppSelector((store) => store.authData.user?.uid, shallowEqual);
  const readChannels = useAppSelector((store) => store.footprint.readChannels, shallowEqual);
  const readUsers = useAppSelector((store) => store.footprint.readUsers, shallowEqual);

  useEffect(() => {
    if (isSuccess && historyData) {
      if (historyData.length == 0) {
        // 到顶了
        dispatch(updateHistoryMark({ type: context, id, mid: "reached" }));
      } else {
        // 记录最新的 mid
        const [{ mid }] = historyData;
        dispatch(updateHistoryMark({ type: context, id, mid: `${mid}` }));
      }
    }
  }, [isSuccess, historyData, mids, context, id]);
  // useEffect(() => {
  //     console.log("diff mids", prevMids, mids);
  //     const newCount = mids.length - prevMids.length;
  //     setFirstItemIndex((prev) => prev - newCount);
  // }, [mids]);

  // 加载更多
  const handleTopStateChange = (isTop: boolean) => {
    console.log("reach top ", isTop);
    if (isTop) {
      if (historyMid === "reached") return;
      let lastMid = mids.slice(0, 1)[0];
      if (historyMid) {
        lastMid = +historyMid;
      }
      // prevMids = mids;
      loadMoreMessage({ context, id, mid: lastMid });
    }
  };
  // 自动跟随
  const handleFollowOutput = (isAtBottom: boolean) => {
    const [lastMid] = mids ? mids.slice(-1) : [0];
    const ts = new Date().getTime();
    // tricky
    const isSentByMyself = ts - lastMid < 1000;
    if (isAtBottom || isSentByMyself) {
      return isAtBottom ? "smooth" : true;
    } else {
      return false;
    }
  };
  // 滚动到底部
  const handleScrollBottom = useCallback(() => {
    const vl = vList!.current;
    if (vl) {
      vl.scrollToIndex(mids.length - 1);
    }
  }, [mids]);
  const handleBottomStateChange = (bottom: boolean) => {
    setAtBottom(bottom);
  };
  
  useImperativeHandle(ref, () => ({
    scrollToMessage: (mid: number) => {
      const index = mids.findIndex((m) => m === mid);
      if (index !== -1 && vList.current) {
        vList.current.scrollToIndex({ index, align: "center", behavior: "smooth" });
      }
    }
  }));
  
  const readIndex = context == "channel" ? readChannels[id] : readUsers[id];
  return (
    <>
      <Virtuoso
        // logLevel={LogLevel.DEBUG}
        overscan={50}
        context={{ loadingMore, id, isChannel: context == "channel" }}
        id={`VOCECHAT_FEED_${context}_${id}`}
        className="px-1 md:px-4 py-4.5 overflow-x-hidden overflow-y-scroll"
        ref={vList}
        components={{
          List: CustomList,
          Header: CustomHeader
        }}
        // firstItemIndex={firstItemIndex}
        initialTopMostItemIndex={mids.length - 1}
        // startReached={handleLoadMore}
        data={mids}
        atTopThreshold={context == "channel" ? 160 : 0}
        atTopStateChange={handleTopStateChange}
        atBottomStateChange={handleBottomStateChange}
        atBottomThreshold={400}
        followOutput={handleFollowOutput}
        itemContent={(idx, mid) => {
          // 计算出真正的 index
          // const idx = index - firstItemIndex;
          const curr = messageData[mid];
          if (!curr) return <div className="w-full h-[1px] invisible"></div>;
          const isFirst = idx == 0;
          const prev = isFirst ? null : messageData[mids[idx - 1]];
          const read = curr?.from_uid == loginUid || mid <= readIndex;
          return renderMessageFragment({
            selectMode: !!selects,
            updateReadIndex: updateReadDebounced,
            read,
            prev,
            curr,
            contextId: id,
            context
          });
        }}
      />
      {!atBottom && (
        <NewMessageBottomTip context={context} id={id} scrollToBottom={handleScrollBottom} />
      )}
    </>
  );
});

VirtualMessageFeed.displayName = "VirtualMessageFeed";

export default VirtualMessageFeed;
