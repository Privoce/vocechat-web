import {
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useLayoutEffect
} from "react";
import { shallowEqual, useDispatch } from "react-redux";
import { Virtualizer, type VirtualizerHandle } from "virtua";
import { useDebounce } from "rooks";
import { Waveform } from "@uiball/loaders";

import { useLazyLoadMoreMessagesQuery, useReadMessageMutation } from "@/app/services/message";
import { updateHistoryMark } from "@/app/slices/footprint";
import { useAppSelector } from "@/app/store";
import { ChatContext } from "@/types/common";
import { renderMessageFragment } from "../../utils";
import NewMessageBottomTip from "../NewMessageBottomTip";
import CustomHeader from "./CustomHeader";
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

const VirtualMessageFeed = forwardRef<VirtualMessageFeedHandle, Props>(({ context, id }, ref) => {
  const dispatch = useDispatch();
  const [atBottom, setAtBottom] = useState(true);
  const stickToBottomRef = useRef(true);
  const [visibleCount, setVisibleCount] = useState(50);
  // Track prepend operations so virtua's shift prop can compensate scroll position
  const isPrependRef = useRef(false);
  const [loadMoreMessage, { isLoading: loadingMore, isSuccess, data: historyData }] =
    useLazyLoadMoreMessagesQuery();
  const vRef = useRef<VirtualizerHandle | null>(null);
  const [updateReadIndex] = useReadMessageMutation();
  const updateReadDebounced = useDebounce(updateReadIndex, 500);
  const updateReadDebouncedRef = useRef(updateReadDebounced);
  updateReadDebouncedRef.current = updateReadDebounced;

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

  const mids = useMemo(() => {
    if (allMids.length <= visibleCount) return allMids;
    return allMids.slice(-visibleCount);
  }, [allMids, visibleCount]);

  const prevMidsRef = useRef<number[]>([]);
  const prevMidsLenRef = useRef(0);
  const stableMids = useMemo(() => {
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

  // Detect whether the data change is a prepend (items added at start)
  // or an append (items added at end). When not at bottom and new messages
  // arrive, allMids grows but slice(-visibleCount) slides the window,
  // removing items from the start. We need to grow visibleCount to prevent this.
  useEffect(() => {
    if (!stickToBottomRef.current && allMids.length > prevMidsLenRef.current) {
      // New messages arrived while scrolled up — grow visibleCount so the
      // slice window doesn't slide and remove items from the top
      const growth = allMids.length - prevMidsLenRef.current;
      setVisibleCount((prev) => prev + growth);
    }
    prevMidsLenRef.current = allMids.length;
  }, [allMids.length]);

  const selects = useAppSelector(
    (store) => store.ui.selectMessages[`${context}_${id}`],
    shallowEqual
  );
  const loginUid = useAppSelector((store) => store.authData.user?.uid, shallowEqual);

  const toggleSelect = useCallback(
    (mid: number, selected: boolean) => {
      const operation = selected ? "remove" : "add";
      dispatch(updateSelectMessages({ context, id, operation, data: mid }));
    },
    [context, id, dispatch]
  );

  const messageData = useAppSelector((store) => selectVisibleMessages(store, stableMids));

  const readChannels = useAppSelector((store) => store.footprint.readChannels, shallowEqual);
  const readUsers = useAppSelector((store) => store.footprint.readUsers, shallowEqual);

  // Count extra virtual items before messages (header, loading spinner)
  const extraItemCount = (context === "channel" ? 1 : 0) + (loadingMore ? 1 : 0);
  const extraItemCountRef = useRef(extraItemCount);
  extraItemCountRef.current = extraItemCount;

  const scrollToBottom = useCallback(() => {
    if (vRef.current) {
      vRef.current.scrollTo(vRef.current.scrollSize);
    }
  }, []);

  // Scroll to bottom when sticking and new messages arrive
  useEffect(() => {
    if (stickToBottomRef.current && stableMids.length > 0) {
      scrollToBottom();
    }
  }, [stableMids, scrollToBottom]);

  // Reset on conversation switch
  useEffect(() => {
    setVisibleCount(50);
    stickToBottomRef.current = true;
    setAtBottom(true);
    isPrependRef.current = false;
  }, [id]);

  // Scroll to bottom after conversation switch (after render)
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 0);
    return () => clearTimeout(timer);
  }, [id, scrollToBottom]);

  // Reset isPrepend after layout
  useLayoutEffect(() => {
    isPrependRef.current = false;
  });

  // Handle scrollToMessage custom event
  useEffect(() => {
    const feedId = `VOCECHAT_FEED_${context}_${id}`;
    const feedEle = document.getElementById(feedId);

    const handleScrollToMessage = (evt: CustomEvent) => {
      const { mid } = evt.detail;
      const index = stableMids.findIndex((m) => m === mid);
      if (index !== -1 && vRef.current) {
        vRef.current.scrollToIndex(extraItemCountRef.current + index, { align: "center", smooth: true });
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
          if (idx !== -1 && vRef.current) {
            vRef.current.scrollToIndex(extraItemCountRef.current + idx, { align: "center", smooth: true });
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

    feedEle?.addEventListener("scrollToMessage", handleScrollToMessage as EventListener);
    return () => {
      feedEle?.removeEventListener("scrollToMessage", handleScrollToMessage as EventListener);
    };
  }, [context, id, stableMids, allMids]);

  useEffect(() => {
    if (isSuccess && historyData) {
      if (historyData.length == 0) {
        dispatch(updateHistoryMark({ type: context, id, mid: "reached" }));
      } else {
        const [{ mid }] = historyData;
        dispatch(updateHistoryMark({ type: context, id, mid: `${mid}` }));
      }
    }
  }, [isSuccess, historyData, stableMids, context, id]);

  // onScroll: detect atBottom state
  const handleScroll = useCallback((offset: number) => {
    if (!vRef.current) return;
    const handle = vRef.current;
    const isAtBottom = offset - handle.scrollSize + handle.viewportSize >= -50;
    stickToBottomRef.current = isAtBottom;
    setAtBottom(isAtBottom);

    // Load more when near top
    if (offset < 100) {
      if (allMids.length > visibleCount) {
        isPrependRef.current = true;
        setVisibleCount((prev) => Math.min(prev + 50, allMids.length));
      } else {
        if (historyMid === "reached") return;
        let lastMid = allMids.slice(0, 1)[0];
        if (historyMid) {
          lastMid = +historyMid;
        }
        isPrependRef.current = true;
        loadMoreMessage({ context, id, mid: lastMid });
      }
    }
  }, [allMids, visibleCount, historyMid, context, id, loadMoreMessage]);

  const handleScrollBottom = useCallback(() => {
    stickToBottomRef.current = true;
    scrollToBottom();
  }, [scrollToBottom]);

  useImperativeHandle(ref, () => ({
    scrollToMessage: (mid: number) => {
      const index = stableMids.findIndex((m) => m === mid);
      if (index !== -1 && vRef.current) {
        vRef.current.scrollToIndex(extraItemCountRef.current + index, { align: "center", smooth: true });
      } else if (allMids.includes(mid)) {
        setVisibleCount(allMids.length);
        setTimeout(() => {
          const idx = allMids.findIndex((m) => m === mid);
          if (idx !== -1 && vRef.current) {
            vRef.current.scrollToIndex(extraItemCountRef.current + idx, { align: "center", smooth: true });
          }
        }, 100);
      }
    },
    notifyFileSending: () => {
      stickToBottomRef.current = true;
      requestAnimationFrame(() => {
        scrollToBottom();
      });
    }
  }));

  const readIndex = context == "channel" ? readChannels[id] : readUsers[id];

  // Store frequently changing values in refs to avoid recreating render function
  const messageDataRef = useRef(messageData);
  const midsRef = useRef(stableMids);
  const readIndexRef = useRef(readIndex);
  const loginUidRef = useRef(loginUid);
  const selectsRef = useRef(selects);
  const toggleSelectRef = useRef(toggleSelect);

  messageDataRef.current = messageData;
  midsRef.current = stableMids;
  readIndexRef.current = readIndex;
  loginUidRef.current = loginUid;
  selectsRef.current = selects;
  toggleSelectRef.current = toggleSelect;

  const renderItem = useCallback(
    (mid: number, idx: number) => {
      const curr = messageDataRef.current[mid];
      if (!curr) return <div key={mid} className="w-full h-[1px] invisible"></div>;
      const isFirst = idx == 0;
      const prev = isFirst ? null : messageDataRef.current[midsRef.current[idx - 1]];
      const read = curr?.from_uid == loginUidRef.current || mid <= readIndexRef.current;
      const selected = !!(
        selectsRef.current && selectsRef.current.find((s: number) => s == mid)
      );
      const handleToggleSelect = () => toggleSelectRef.current(mid, selected);
      return (
        <div key={mid}>
          {renderMessageFragment({
            selectMode: !!selectsRef.current,
            updateReadIndex: updateReadDebouncedRef.current,
            read,
            prev,
            curr,
            contextId: id,
            context,
            selected,
            toggleSelect: handleToggleSelect
          })}
        </div>
      );
    },
    [id, context]
  );

  return (
    <>
      <div
        id={`VOCECHAT_FEED_${context}_${id}`}
        className="px-1 md:px-4 py-4.5 overflow-x-hidden overflow-y-scroll flex-1"
      >
        <Virtualizer
          ref={vRef}
          shift={isPrependRef.current}
          onScroll={handleScroll}
        >
          {/* Channel header as first virtual item */}
          {context === "channel" && (
            <div key="__header__">
              <CustomHeader
                context={{ loadingMore, id, isChannel: true }}
              />
            </div>
          )}
          {loadingMore && (
            <div key="__loading__" className="w-full py-2 flex-center">
              <Waveform size={18} lineWeight={4} speed={1} color="#ccc" />
            </div>
          )}
          {stableMids.map((mid, idx) => renderItem(mid, idx))}
        </Virtualizer>
      </div>
      {!atBottom && (
        <NewMessageBottomTip context={context} id={id} scrollToBottom={handleScrollBottom} />
      )}
    </>
  );
});

VirtualMessageFeed.displayName = "VirtualMessageFeed";

export default VirtualMessageFeed;
