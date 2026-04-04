import { useCallback, useEffect, useRef, useState, forwardRef, useImperativeHandle, useMemo } from "react";
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
import { makeSelectVisibleMessages } from "@/app/selectors/message";
import { updateSelectMessages } from "@/app/slices/ui";

type Props = {
  context: ChatContext;
  id: number;
};

export interface VirtualMessageFeedHandle {
  scrollToMessage: (mid: number) => void;
  notifyFileSending: () => void;
}

// const firstMsgIndex = 10000;
// let prevMids: number[] = [];
const VirtualMessageFeed = forwardRef<VirtualMessageFeedHandle, Props>(({ context, id }, ref) => {
  const dispatch = useDispatch();
  // const { t } = useTranslation("chat");
  // const [firstItemIndex, setFirstItemIndex] = useState(firstMsgIndex);
  const [atBottom, setAtBottom] = useState(false);
  const atBottomRef = useRef(false);
  // Reduce initial visible count for better performance on low-end devices
  const [visibleCount, setVisibleCount] = useState(50);
  // Track when files are being sent to force scroll
  const shouldScrollForFileRef = useRef(false);
  const pendingScrollToBottomRef = useRef(false);
  // Freeze the data passed to Virtuoso when not at bottom to prevent scroll jitter
  const frozenMidsRef = useRef<number[] | null>(null);
  const [loadMoreMessage, { isLoading: loadingMore, isSuccess, data: historyData }] =
    useLazyLoadMoreMessagesQuery();
  const vList = useRef<VirtuosoHandle | null>(null);
  const [updateReadIndex] = useReadMessageMutation();
  // Increase debounce time for better performance on low-end devices
  const updateReadDebounced = useDebounce(updateReadIndex, 500);
  // Store debounced function in ref to avoid recreating itemContent
  const updateReadDebouncedRef = useRef(updateReadDebounced);
  updateReadDebouncedRef.current = updateReadDebounced;

  // Create memoized selector instance for this component
  const selectVisibleMessages = useMemo(() => makeSelectVisibleMessages(), []);

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

  // Stabilize mids array reference - only create new array if content actually changed
  const mids = useMemo(() => {
    if (allMids.length <= visibleCount) return allMids;
    return allMids.slice(-visibleCount);
  }, [allMids, visibleCount]);

  // Use ref to track previous mids for comparison
  const prevMidsRef = useRef<number[]>([]);
  const stableMids = useMemo(() => {
    // Check if mids actually changed
    if (prevMidsRef.current.length === mids.length) {
      let same = true;
      for (let i = 0; i < mids.length; i++) {
        if (prevMidsRef.current[i] !== mids[i]) {
          same = false;
          break;
        }
      }
      if (same) return prevMidsRef.current;
    }
    prevMidsRef.current = mids;
    return mids;
  }, [mids]);

  // When not at bottom, freeze the mids passed to Virtuoso so new messages
  // don't cause scroll compensation jitter. Unfreeze when user scrolls back to bottom.
  const displayMids = useMemo(() => {
    if (atBottomRef.current) {
      // At bottom: always show latest, clear any freeze
      frozenMidsRef.current = null;
      return stableMids;
    }
    // Not at bottom: freeze on first new-message arrival
    if (frozenMidsRef.current === null) {
      frozenMidsRef.current = stableMids;
    }
    return frozenMidsRef.current;
    // atBottom is included to recompute when user scrolls back to bottom
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stableMids, atBottom]);

  const selects = useAppSelector(
    (store) => store.ui.selectMessages[`${context}_${id}`],
    shallowEqual
  );
  const loginUid = useAppSelector((store) => store.authData.user?.uid, shallowEqual);

  // Create stable toggleSelect function
  const toggleSelect = useCallback((mid: number, selected: boolean) => {
    const operation = selected ? "remove" : "add";
    dispatch(updateSelectMessages({ context, id, operation, data: mid }));
  }, [context, id, dispatch]);

  // Use memoized selector to get message data - this will only recompute when the specific messages change
  const messageData = useAppSelector((store) => selectVisibleMessages(store, stableMids));

  const readChannels = useAppSelector((store) => store.footprint.readChannels, shallowEqual);
  const readUsers = useAppSelector((store) => store.footprint.readUsers, shallowEqual);

  useEffect(() => {
    // Reset visible count when switching chats
    setVisibleCount(50);
    setAtBottom(false);
    atBottomRef.current = false;
    frozenMidsRef.current = null;

    // Scroll to bottom when switching conversations
    // Use setTimeout to ensure the new messages are rendered first
    setTimeout(() => {
      if (vList.current && stableMids.length > 0) {
        vList.current.scrollToIndex({
          index: stableMids.length - 1,
          align: "end",
          behavior: "auto"
        });
      }
    }, 0);
  }, [id]);

  useEffect(() => {
    const feedId = `VOCECHAT_FEED_${context}_${id}`;
    const feedEle = document.getElementById(feedId);

    const handleScrollToMessage = (evt: CustomEvent) => {
      const { mid } = evt.detail;
      const index = displayMids.findIndex((m) => m === mid);
      if (index !== -1 && vList.current) {
        vList.current.scrollToIndex({ index, align: "center", behavior: "smooth" });
        setTimeout(() => {
          const msgEle = document.querySelector<HTMLDivElement>(`[data-msg-mid='${mid}']`);
          if (msgEle) {
            const _class1 = `md:dark:bg-gray-800`;
            const _class2 = `md:bg-gray-100`;
            msgEle.classList.add(_class1);
            msgEle.classList.add(_class2);
            setTimeout(() => {
              msgEle.classList.remove(_class1);
              msgEle.classList.remove(_class2);
            }, 3000);
          }
        }, 500);
      } else if (allMids.includes(mid)) {
        setVisibleCount(allMids.length);
        setTimeout(() => {
          const idx = allMids.findIndex((m) => m === mid);
          if (idx !== -1 && vList.current) {
            vList.current.scrollToIndex({ index: idx, align: "center", behavior: "smooth" });
            setTimeout(() => {
              const msgEle = document.querySelector<HTMLDivElement>(`[data-msg-mid='${mid}']`);
              if (msgEle) {
                const _class1 = `md:dark:bg-gray-800`;
                const _class2 = `md:bg-gray-100`;
                msgEle.classList.add(_class1);
                msgEle.classList.add(_class2);
                setTimeout(() => {
                  msgEle.classList.remove(_class1);
                  msgEle.classList.remove(_class2);
                }, 3000);
              }
            }, 500);
          }
        }, 100);
      }
    };

    feedEle?.addEventListener('scrollToMessage', handleScrollToMessage as EventListener);
    return () => {
      feedEle?.removeEventListener('scrollToMessage', handleScrollToMessage as EventListener);
    };
  }, [context, id, displayMids, allMids]);

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
  }, [isSuccess, historyData, stableMids, context, id]);
  // useEffect(() => {
  //     console.log("diff mids", prevMids, mids);
  //     const newCount = mids.length - prevMids.length;
  //     setFirstItemIndex((prev) => prev - newCount);
  // }, [mids]);

  // 加载更多
  const handleTopStateChange = (isTop: boolean) => {
    console.log("reach top ", isTop);
    if (isTop) {
      if (allMids.length > visibleCount) {
        // Load 50 messages at a time for better performance
        setVisibleCount(prev => Math.min(prev + 50, allMids.length));
      } else {
        if (historyMid === "reached") return;
        let lastMid = allMids.slice(0, 1)[0];
        if (historyMid) {
          lastMid = +historyMid;
        }
        loadMoreMessage({ context, id, mid: lastMid });
      }
    }
  };
  // 自动跟随
  const handleFollowOutput = (isAtBottom: boolean) => {
    // Check if this is a file send that should force scroll
    if (shouldScrollForFileRef.current) {
      shouldScrollForFileRef.current = false; // Reset flag
      return "smooth";
    }

    // For all other cases (text messages, received messages), only scroll if at bottom
    return isAtBottom ? "smooth" : false;
  };
  // 滚动到底部
  const handleScrollBottom = useCallback(() => {
    // Unfreeze so Virtuoso gets the latest messages
    frozenMidsRef.current = null;
    const vl = vList!.current;
    if (vl) {
      vl.scrollToIndex(allMids.length - 1);
    }
  }, [allMids]);
  const handleBottomStateChange = (bottom: boolean) => {
    atBottomRef.current = bottom;
    if (bottom) {
      // Unfreeze: allow new messages to flow into the list
      frozenMidsRef.current = null;
    }
    setAtBottom(bottom);
  };

  const handleTotalListHeightChanged = useCallback((_height: number) => {
    if (pendingScrollToBottomRef.current) {
      pendingScrollToBottomRef.current = false;
      // Use requestAnimationFrame to wait for the layout shift to complete
      // (UploadFileList unmounting and Send box shrinking)
      requestAnimationFrame(() => {
        if (vList.current && displayMids.length > 0) {
          vList.current.scrollToIndex({
            index: displayMids.length - 1,
            align: "end",
            behavior: "auto"
          });
        }
      });
    }
  }, [displayMids.length]);

  useImperativeHandle(ref, () => ({
    scrollToMessage: (mid: number) => {
      const index = displayMids.findIndex((m) => m === mid);
      if (index !== -1 && vList.current) {
        vList.current.scrollToIndex({ index, align: "center", behavior: "smooth" });
      } else if (allMids.includes(mid)) {
        setVisibleCount(allMids.length);
        setTimeout(() => {
          const idx = allMids.findIndex((m) => m === mid);
          if (idx !== -1 && vList.current) {
            vList.current.scrollToIndex({ index: idx, align: "center", behavior: "smooth" });
          }
        }, 100);
      }
    },
    notifyFileSending: () => {
      shouldScrollForFileRef.current = true;
      pendingScrollToBottomRef.current = true; // Arm the height-change listener
    }
  }));
  
  const readIndex = context == "channel" ? readChannels[id] : readUsers[id];

  // Store frequently changing values in refs to avoid recreating itemContent
  const messageDataRef = useRef(messageData);
  const midsRef = useRef(displayMids);
  const readIndexRef = useRef(readIndex);
  const loginUidRef = useRef(loginUid);
  const selectsRef = useRef(selects);
  const toggleSelectRef = useRef(toggleSelect);

  messageDataRef.current = messageData;
  midsRef.current = displayMids;
  readIndexRef.current = readIndex;
  loginUidRef.current = loginUid;
  selectsRef.current = selects;
  toggleSelectRef.current = toggleSelect;

  // Stable itemContent function - only recreate when context or id changes
  const itemContent = useCallback((idx: number, mid: number) => {
    const curr = messageDataRef.current[mid];
    if (!curr) return <div className="w-full h-[1px] invisible"></div>;
    const isFirst = idx == 0;
    const prev = isFirst ? null : messageDataRef.current[midsRef.current[idx - 1]];
    // Optimize read calculation: once a message is read, it stays read
    // This prevents unnecessary re-renders when readIndex updates
    const read = curr?.from_uid == loginUidRef.current || mid <= readIndexRef.current;
    const selected = !!(selectsRef.current && selectsRef.current.find((s: number) => s == mid));
    const handleToggleSelect = () => toggleSelectRef.current(mid, selected);
    return renderMessageFragment({
      selectMode: !!selectsRef.current,
      updateReadIndex: updateReadDebouncedRef.current,
      read,
      prev,
      curr,
      contextId: id,
      context,
      selected,
      toggleSelect: handleToggleSelect
    });
  }, [id, context]);
  
  return (
    <>
      <Virtuoso
        // logLevel={LogLevel.DEBUG}
        // Reduce overscan for better performance on low-end devices
        overscan={20}
        // Reduce viewport extension for better performance
        increaseViewportBy={{ top: 0, bottom: 200 }}
        context={{ loadingMore, id, isChannel: context == "channel" }}
        id={`VOCECHAT_FEED_${context}_${id}`}
        className="px-1 md:px-4 py-4.5 overflow-x-hidden overflow-y-scroll"
        ref={vList}
        components={{
          List: CustomList,
          Header: CustomHeader
        }}
        // firstItemIndex={firstItemIndex}
        initialTopMostItemIndex={displayMids.length - 1}
        alignToBottom
        // startReached={handleLoadMore}
        data={displayMids}
        atTopThreshold={context == "channel" ? 160 : 0}
        atTopStateChange={handleTopStateChange}
        atBottomStateChange={handleBottomStateChange}
        atBottomThreshold={400}
        followOutput={handleFollowOutput}
        totalListHeightChanged={handleTotalListHeightChanged}
        itemContent={itemContent}
      />
      {!atBottom && (
        <NewMessageBottomTip context={context} id={id} scrollToBottom={handleScrollBottom} />
      )}
    </>
  );
});

VirtualMessageFeed.displayName = "VirtualMessageFeed";

export default VirtualMessageFeed;
