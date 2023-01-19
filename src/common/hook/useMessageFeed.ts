import { useEffect, useState, useRef, useCallback } from "react";
import { useLazyGetHistoryMessagesQuery } from "../../app/services/channel";
import { useLazyGetHistoryMessagesQuery as useLazyGetDMHistoryMsg } from "../../app/services/user";
import { useAppSelector } from "../../app/store";
import { isElementVisible } from "../utils";
export interface PageInfo {
  isFirst: boolean;
  isLast: boolean;
  pageCount: number;
  pageSize: number;
  pageNumber: number;
  ids: number[];
}
interface Config extends Partial<PageInfo> {
  mids: number[];
}
const getFeedWithPagination = (config: Config): PageInfo => {
  const { pageNumber = 1, pageSize = 50, mids = [], isLast = false } = config || {};
  const shadowMids = mids.slice(0);
  console.log("pagination", config, shadowMids);

  if (shadowMids.length == 0)
    return {
      isFirst: true,
      isLast: true,
      pageCount: 0,
      pageSize,
      pageNumber: 1,
      ids: []
    };
  shadowMids.sort((a, b) => {
    return Number(a) - Number(b);
  });
  // console.log("message pagination", shadowMids);
  const pageCount = Math.ceil(shadowMids.length / pageSize);
  const computedPageNumber = isLast ? pageCount : pageNumber;
  const _start = -(pageCount - computedPageNumber + 1) * pageSize;
  const _tmp = _start + pageSize;
  const _end = _tmp == 0 ? undefined : _tmp;
  const ids = shadowMids.slice(_start, _end);
  // console.log("start,end", _start, _end, ids);
  return {
    isFirst: computedPageNumber == 1,
    isLast: computedPageNumber == pageCount,
    pageCount,
    pageSize,
    pageNumber: computedPageNumber,
    ids
  };
};
let curScrollPos = 0;
let oldScroll = 0;
type Props = {
  context?: "channel" | "user";
  id: number;
};
export default function useMessageFeed({ context = "channel", id }: Props) {
  const [loadMoreChannelMsgs] = useLazyGetHistoryMessagesQuery();
  const [loadMoreDmMsgs] = useLazyGetDMHistoryMsg();
  const listRef = useRef<number[]>([]);
  const pageRef = useRef<PageInfo | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const [pulling, setPulling] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [appends, setAppends] = useState<number[]>([]);
  const [items, setItems] = useState<number[]>([]);
  const loadMoreMsgsFromServer = context == "channel" ? loadMoreChannelMsgs : loadMoreDmMsgs;
  const { mids, messageData, loginUid } = useAppSelector((store) => {
    return {
      loginUid: store.authData.user?.uid,
      mids:
        context == "channel" ? store.channelMessage[id] || [] : store.userMessage.byId[id] || [],
      messageData: store.message
    };
  });
  useEffect(() => {
    // curScrollPos = 0;
    // oldScroll = 0;
    listRef.current = [];
    pageRef.current = null;
    setItems([]);
    setHasMore(true);
    setAppends([]);
    setPulling(false);
  }, [context, id]);

  useEffect(() => {
    const currentItems = listRef.current;
    // const [lastMid=Infinity]=currentItems.slice(-1)
    //过滤掉本地(以及后来追加的消息?)
    const serverMids = mids.filter((id: number) => {
      // 如果是本地消息，id是时间戳
      const ts = +new Date();
      return Math.abs(ts - id) > 10 * 1000;
    });
    if (serverMids.length > 0) {
      if (currentItems.length == 0) {
        //初次
        const pageInfo = getFeedWithPagination({
          mids: serverMids,
          isLast: true
        });
        pageRef.current = pageInfo;
        listRef.current = pageInfo.ids;
        setItems(pageInfo.ids);
        // console.log("message pageInfo", serverMids, pageInfo);
      } else {
        const container = containerRef.current;
        if (container) {
          const loadMoreEle = container.querySelector("[data-load-more]");
          console.log("effected by pull server data", loadMoreEle, isElementVisible(loadMoreEle));
          if (isElementVisible(loadMoreEle)) {
            // 有更新：来自于拉取历史消息，拉取下一页数据
            loadMore();
          }
        }
      }
    }
  }, [mids]);

  useEffect(() => {
    //处理追加：来自于其它人的实时消息以及自己发的
    const [lastMid] = listRef.current.slice(-1);
    const sorteds = mids.slice(0).sort((a: number, b: number) => {
      return Number(a) - Number(b);
    });
    const appends = sorteds.filter((s: number) => s > lastMid);
    if (appends.length) {
      setAppends(appends);
      const [newestMsgId] = appends.slice(-1);
      // 自己发的消息：自动往上滚动
      const container = containerRef.current;
      if (container) {
        const msgFromSelf = loginUid == messageData[newestMsgId]?.from_uid;
        const scrollDistance =
          container.scrollHeight - (container.offsetHeight + container.scrollTop);
        // console.log("scrollDistance", msgFromSelf, scrollDistance);
        if (msgFromSelf) {
          container.scrollTop = container.scrollHeight;
        } else if (scrollDistance <= 100) {
          setTimeout(() => {
            container.scrollTop = container.scrollHeight;
          }, 100);
        }
      }
    }
  }, [mids, messageData, loginUid]);
  useEffect(() => {
    // 处理自动滚动
    if (items.length > 0) {
      let wrapper = containerRef.current = document.querySelector(`#VOCECHAT_FEED_${context}_${id}`);
      if (wrapper) {
        const newScroll = wrapper.scrollHeight - wrapper.clientHeight;
        wrapper.scrollTop = curScrollPos + (newScroll - oldScroll);
      }
    }
  }, [items, context, id]);

  const loadMore = () => {
    console.log("load more start", mids, listRef.current, pageRef.current);
    const currPageInfo = pageRef.current;
    let pageInfo: PageInfo;
    if (!currPageInfo) {
      // 初始化
      console.log("first pagination");

      pageInfo = getFeedWithPagination({
        mids,
        isLast: true
      });
    } else {
      const prevPageNumber = currPageInfo.pageNumber - 1;
      pageInfo = getFeedWithPagination({
        mids,
        pageNumber: prevPageNumber == 0 ? 1 : prevPageNumber
      });
      console.log("continue to next page", currPageInfo, prevPageNumber, pageInfo);
    }
    pageRef.current = pageInfo;
    listRef.current = [...new Set([...pageInfo.ids, ...listRef.current])].sort((a, b) => a > b ? 1 : -1);
    setTimeout(
      () => {
        console.log("load more timeout", currPageInfo, mids, listRef.current);
        setItems(listRef.current);
        const container = containerRef.current;
        if (container) {
          curScrollPos = container.scrollTop;
          oldScroll = container.scrollHeight - container.clientHeight;
        }
        setPulling(false);
      },
      currPageInfo?.isLast ? 10 : 500
    );
    setPulling(false);
  };
  const pullUp = useCallback(
    async () => {

      setPulling(true);
      const currPageInfo = pageRef.current;
      console.log("pull up start", currPageInfo);
      // 本地数据的第一页
      if (currPageInfo && currPageInfo.isFirst || (!currPageInfo && mids.length == 0)) {
        const [firstMid] = currPageInfo ? currPageInfo.ids : [0];
        const { data: newList } = await loadMoreMsgsFromServer({
          mid: firstMid,
          id
        });
        if (newList?.length == 0) {
          // 只有在这里，才可以把has more去掉
          setHasMore(false);
        }
        return;
      }
      loadMore();
    },
    [context, id],
  );

  return {
    pulling,
    mids,
    appends,
    hasMore,
    pullUp,
    list: items
  };
}
