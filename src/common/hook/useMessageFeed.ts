import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useLazyGetHistoryMessagesQuery } from "../../app/services/channel";
import { useLazyGetHistoryMessagesQuery as useLazyGetDMHistoryMsg } from "../../app/services/contact";

const getFeedWithPagination = (config) => {
  const { pageNumber = 1, pageSize = 40, mids = [], isLast = false } = config || {};
  const shadowMids = mids.slice(0);

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
  console.log("message pagination", shadowMids);
  const pageCount = Math.ceil(shadowMids.length / pageSize);
  const computedPageNumber = isLast ? pageCount : pageNumber;
  const _start = -(pageCount - computedPageNumber + 1) * pageSize;
  const _tmp = _start + pageSize;
  const _end = _tmp == 0 ? undefined : _tmp;
  const ids = shadowMids.slice(_start, _end);
  console.log("start,end", _start, _end, ids);
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
export default function useMessageFeed({ context = "channel", id = null }) {
  const [loadMoreChannelMsgs] = useLazyGetHistoryMessagesQuery();
  const [loadMoreDmMsgs] = useLazyGetDMHistoryMsg();
  const listRef = useRef([]);
  const pageRef = useRef(null);
  const containerRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [appends, setAppends] = useState([]);
  const [items, setItems] = useState([]);
  const loadMoreMsgsFromServer = context == "channel" ? loadMoreChannelMsgs : loadMoreDmMsgs;
  const { mids, messageData, loginUid } = useSelector((store) => {
    return {
      loginUid: store.authData.uid,
      mids:
        context == "channel" ? store.channelMessage[id] || [] : store.userMessage.byId[id] || [],
      messageData: store.message
    };
  });
  useEffect(() => {
    listRef.current = [];
    pageRef.current = [];
    setItems([]);
    setHasMore(true);
    setAppends([]);
  }, [context, id]);
  useEffect(() => {
    if (items.length) {
      containerRef.current = document.querySelector(`#VOCECHAT_FEED_${context}_${id}`);
      if (containerRef.current) {
        const newScroll = containerRef.current.scrollHeight - containerRef.current.clientHeight;
        containerRef.current.scrollTop = curScrollPos + (newScroll - oldScroll);
      }
    }
  }, [items, context, id]);
  useEffect(() => {
    const serverMids = mids.filter((id) => {
      const ts = +new Date();
      return Math.abs(ts - id) > 10 * 1000;
    });
    if (listRef.current.length == 0 && serverMids.length) {
      //   初次
      const pageInfo = getFeedWithPagination({
        mids: serverMids,
        isLast: true
      });
      console.log("pull up 2", pageInfo);
      pageRef.current = pageInfo;
      listRef.current = pageInfo.ids;
      setItems(listRef.current);
      console.log("message pageInfo", serverMids, pageInfo);
    } else {
      //   追加
      const [lastMid] = listRef.current.slice(-1);
      const sorteds = mids.slice(0).sort((a, b) => {
        return Number(a) - Number(b);
      });
      const appends = sorteds.filter((s) => s > lastMid);
      console.log("appends", appends, sorteds, lastMid, mids);
      if (appends.length) {
        setAppends(appends);
        const [newestMsgId] = appends.slice(-1);
        // 自己发的消息
        const container = containerRef.current;
        if (container) {
          const msgFromSelf = loginUid == messageData[newestMsgId]?.from_uid;
          const scrollDistance =
            container.scrollHeight - (container.offsetHeight + container.scrollTop);
          console.log("scrollDistance", msgFromSelf, scrollDistance);
          if (msgFromSelf) {
            container.scrollTop = container.scrollHeight;
          } else if (scrollDistance <= 100) {
            setTimeout(() => {
              container.scrollTop = container.scrollHeight;
            }, 100);
          }
        }
      }
    }
  }, [mids, messageData, loginUid]);
  const pullUp = async () => {
    const currPageInfo = pageRef.current;
    console.log("pull up", currPageInfo);
    // 第一页
    if (currPageInfo && currPageInfo.isFirst) {
      const [firstMid] = currPageInfo.ids;
      const { data: newList } = await loadMoreMsgsFromServer({
        mid: firstMid,
        id
      });
      if (newList.length == 0) {
        setHasMore(false);
        return;
      }
    }
    let pageInfo = null;
    if (!currPageInfo) {
      // 初始化
      pageInfo = getFeedWithPagination({
        mids,
        isLast: true
      });
    } else {
      const prevPageNumber = currPageInfo.pageNumber - 1;
      pageInfo = getFeedWithPagination({
        mids,
        pageNumber: prevPageNumber
      });
    }
    pageRef.current = pageInfo;
    listRef.current = [...pageInfo.ids, ...listRef.current];
    setTimeout(
      () => {
        setItems(listRef.current);
        console.log("pull up", currPageInfo, listRef.current);
        setHasMore(pageInfo.pageNumber !== 1);
        const container = containerRef.current;
        if (container) {
          curScrollPos = container.scrollTop;
          oldScroll = container.scrollHeight - container.clientHeight;
        }
      },
      currPageInfo.isLast ? 10 : 800
    );
  };
  const pullDown = () => {
    // 向下加载
  };

  return {
    mids,
    appends,
    hasMore,
    pullUp,
    pullDown,
    list: items
  };
}
