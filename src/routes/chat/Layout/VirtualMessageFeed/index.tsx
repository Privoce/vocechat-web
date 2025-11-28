import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { useDebounce } from "rooks";

import { useLazyLoadMoreMessagesQuery, useReadMessageMutation } from "@/app/services/message";
import { updateHistoryMark } from "@/app/slices/footprint";
import { clearJumpToMessage } from "@/app/slices/ui";
import { useAppSelector } from "@/app/store";
import { ChatContext } from "@/types/common";
import { renderMessageFragment } from "../../utils";
import NewMessageBottomTip from "../NewMessageBottomTip";
import CustomHeader from "./CustomHeader";
import CustomList from "./CustomList";
import { ChatContainerContext } from "./ChatContainerContext";

type Props = {
  context: ChatContext;
  id: number;
};
const PAGE_SIZE = 50;

const VirtualMessageFeed = ({ context, id }: Props) => {
  const dispatch = useDispatch();
  const [atBottom, setAtBottom] = useState(true);
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
  const allMids = useAppSelector(
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
  const jumpToMessage = useAppSelector((store) => store.ui.jumpToMessage);

  const [numVisible, setNumVisible] = useState(PAGE_SIZE);
  const visibleMids = allMids.slice(-numVisible);
  const jumpTargetRef = useRef<number | null>(null);
  const isInitialRender = useRef(true);

  // Reset state when chat context changes
  useEffect(() => {
    isInitialRender.current = true;
    setNumVisible(PAGE_SIZE);
  }, [id, context]);

  // Effect for initial scroll to bottom
  useLayoutEffect(() => {
    if (isInitialRender.current && visibleMids.length > 0) {
      vList.current?.scrollToIndex({
        index: visibleMids.length - 1,
        align: "end",
        behavior: "auto",
      });
      isInitialRender.current = false;
    }
  }, [id, context, visibleMids.length]);

  const prevAllMidsLength = useRef(allMids.length);
  useEffect(() => {
    const newMessagesCount = allMids.length - prevAllMidsLength.current;
    if (newMessagesCount > 0) {
      setNumVisible((prev) => prev + newMessagesCount);
    }
    prevAllMidsLength.current = allMids.length;
  }, [allMids.length]);

  // Effect to handle jump-to-message
  useEffect(() => {
    if (jumpToMessage && jumpToMessage.context === context && jumpToMessage.id === id) {
      setAtBottom(false);
      const targetMid = jumpToMessage.mid;
      const targetIndexInAll = allMids.findIndex((mid) => mid === targetMid);

      if (targetIndexInAll === -1) {
        dispatch(clearJumpToMessage());
        return;
      }

      const windowStartIndexInAll = Math.max(0, allMids.length - numVisible);
      const isVisible = targetIndexInAll >= windowStartIndexInAll;

      if (isVisible) {
        const targetIndexInVisible = targetIndexInAll - windowStartIndexInAll;
        vList.current?.scrollToIndex({
          index: targetIndexInVisible,
          align: "center",
          behavior: "smooth",
        });
        dispatch(clearJumpToMessage());
      } else {
        isInitialRender.current = false; // A jump is not an initial render
        const newNumVisible = allMids.length - targetIndexInAll + PAGE_SIZE / 2;
        jumpTargetRef.current = targetMid;
        setNumVisible(newNumVisible);
      }
    }
  }, [jumpToMessage, allMids, context, id, numVisible, dispatch]);

  // Effect to perform scroll after window expansion for jump
  useLayoutEffect(() => {
    if (jumpTargetRef.current) {
      const targetIndexInVisible = visibleMids.findIndex((mid) => mid === jumpTargetRef.current);
      if (targetIndexInVisible !== -1) {
        vList.current?.scrollToIndex({
          index: targetIndexInVisible,
          align: "center",
          behavior: "auto",
        });
        jumpTargetRef.current = null;
        dispatch(clearJumpToMessage());
      }
    }
  }, [visibleMids, dispatch]);

  useEffect(() => {
    if (isSuccess && historyData) {
      if (historyData.length > 0) {
        dispatch(updateHistoryMark({ type: context, id, mid: `${historyData[0].mid}` }));
      } else {
        dispatch(updateHistoryMark({ type: context, id, mid: "reached" }));
      }
    }
  }, [isSuccess, historyData, context, id, dispatch]);

  const handleTopStateChange = (isTop: boolean) => {
    if (!isTop) return;
    const remainingInMem = allMids.length - visibleMids.length;
    if (remainingInMem > 0) {
      setNumVisible(Math.min(allMids.length, numVisible + PAGE_SIZE));
    } else {
      if (historyMid === "reached") return;
      const lastMid = allMids.length > 0 ? allMids[0] : +historyMid;
      if (lastMid) {
        loadMoreMessage({ context, id, mid: lastMid });
      }
    }
  };

  const visibleMidsRef = useRef(visibleMids);
  visibleMidsRef.current = visibleMids;

  const handleScrollBottom = useCallback(() => {
    vList.current?.scrollToIndex(visibleMidsRef.current.length - 1);
  }, []);
  const handleBottomStateChange = (bottom: boolean) => {
    setAtBottom(bottom);
  };

  const readIndex = context == "channel" ? readChannels[id] : readUsers[id];

  const itemContent = useCallback(
    (idx: number, mid: number) => {
      const curr = messageData[mid];
      if (!curr) return <div className="w-full h-[1px] invisible"></div>;
      const isFirst = idx == 0;
      const prev = isFirst ? null : messageData[visibleMids[idx - 1]];
      const read = curr?.from_uid == loginUid || mid <= readIndex;
      return renderMessageFragment({
        selectMode: !!selects,
        updateReadIndex: updateReadDebounced,
        read,
        prev,
        curr,
        contextId: id,
        context,
      });
    },
    [messageData, visibleMids, loginUid, readIndex, selects, updateReadDebounced, id, context]
  );

  return (
    <ChatContainerContext.Provider value={vList}>
      <Virtuoso
        key={`${context}_${id}`}
        overscan={10}
        context={{ loadingMore, id, isChannel: context == "channel" }}
        id={`VOCECHAT_FEED_${context}_${id}`}
        className="px-1 md:px-4 py-4.5 overflow-x-hidden overflow-y-scroll"
        ref={vList}
        components={{
          List: CustomList,
          Header: CustomHeader,
        }}
        followOutput={atBottom ? "auto" : false}
        data={visibleMids}
        atTopThreshold={context == "channel" ? 160 : 0}
        atTopStateChange={handleTopStateChange}
        atBottomStateChange={handleBottomStateChange}
        atBottomThreshold={400}
        itemContent={itemContent}
      />
      {!atBottom && (
        <NewMessageBottomTip context={context} id={id} scrollToBottom={handleScrollBottom} />
      )}
    </ChatContainerContext.Provider>
  );
};

export default VirtualMessageFeed;
