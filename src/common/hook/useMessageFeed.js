import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
const getFeedWithPagination = (config) => {
  const { pageNumber = 1, pageSize = 10, mids = [], isLast = false } =
    config || {};
  const shadowMids = mids.slice(0);

  if (shadowMids.length == 0)
    return {
      pageCount: 0,
      pageSize,
      pageNumber: 1,
      ids: [],
    };
  shadowMids.sort((a, b) => {
    return Number(a) - Number(b);
  });
  console.log("message pagination", shadowMids);
  const pageCount = Math.ceil(shadowMids.length / pageSize);
  const computedPageNumber = isLast ? pageCount : pageNumber;
  const ids = shadowMids.slice(
    (computedPageNumber - 1) * pageSize,
    computedPageNumber * pageSize
  );
  return {
    pageCount,
    pageSize,
    pageNumber: computedPageNumber,
    ids,
  };
};
export default function useMessageFeed({ context = "channel", id = null }) {
  const listRef = useRef([]);
  const pageRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [appends, setAppends] = useState([]);
  const [items, setItems] = useState([]);
  const { mids, messageData } = useSelector((store) => {
    return {
      mids:
        context == "channel"
          ? store.channelMessage[id] || []
          : store.userMessage.byId[id] || [],
      messageData: store.message,
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
    if (appends.length) {
      const feedsWrapperEle = document.querySelector(
        `#RUSTCHAT_FEED_${context}_${id}`
      );
      if (feedsWrapperEle) {
        feedsWrapperEle.scrollTop = feedsWrapperEle.scrollHeight;
      }
    }
  }, [appends, context, id]);
  useEffect(() => {
    if (listRef.current.length == 0) {
      //   初次
      const pageInfo = getFeedWithPagination({ mids, isLast: true });
      console.log("pull up 2", pageInfo);
      pageRef.current = pageInfo;
      listRef.current = pageInfo.ids;
      setItems(listRef.current);
      console.log("message pageInfo", mids, pageInfo);
    } else {
      //   追加
      const lastMid = listRef.current.slice(-1);
      const sorteds = mids.slice(0).sort((a, b) => {
        return Number(a) - Number(b);
      });
      const appends = sorteds.filter((s) => s > lastMid);
      if (appends.length) {
        setAppends(appends);
      }
      console.log("appends", appends);
    }
  }, [mids]);
  const pullUp = () => {
    const currPageInfo = pageRef.current;
    console.log("pull up", currPageInfo);
    // 第一页
    if (currPageInfo && currPageInfo.pageNumber == 1) {
      setHasMore(false);
      return;
    }
    let pageInfo = null;
    if (!currPageInfo) {
      // 初始化
      pageInfo = getFeedWithPagination({
        mids,
        isLast: true,
      });
    } else {
      const prevPageNumber = currPageInfo.pageNumber - 1;
      pageInfo = getFeedWithPagination({
        mids,
        pageNumber: prevPageNumber,
      });
    }
    pageRef.current = pageInfo;
    listRef.current = [...pageInfo.ids, ...listRef.current];
    setTimeout(() => {
      setItems(listRef.current);
      console.log("pull up", currPageInfo, listRef.current);
      setHasMore(pageInfo.pageNumber !== 1);
    }, 800);
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
    list: items,
  };
}
