import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
const getFeedWithPagination = (config) => {
  const { pageNumber = 1, pageSize = 20, mids = [] } = config || {};
  const shadowMids = mids.slice(0);

  if (shadowMids.length == 0)
    return {
      pageCount: 0,
      pageSize,
      pageNumber: 1,
      ids: [],
    };
  shadowMids.sort((a, b) => {
    return Number(b) - Number(a);
  });
  console.log("message pagination", shadowMids);
  const pageCount = Math.ceil(shadowMids.length / pageSize);
  const ids = shadowMids.slice(
    (pageNumber - 1) * pageSize,
    pageNumber * pageSize
  );
  const info = {
    isFirst: pageNumber == 1,
    isLast: pageNumber == pageCount,
    pageCount,
    pageSize,
    pageNumber,
    ids,
  };
  console.log("get page Info", info);
  return info;
};
export default function useMessageFeed({ context = "channel", id = null }) {
  const listRef = useRef([]);
  const pageRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  // const [appends, setAppends] = useState([]);
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
    // setAppends([]);
  }, [context, id]);
  // useEffect(() => {
  //   if (appends.length) {
  //     const feedsWrapperEle = document.querySelector(
  //       `#RUSTCHAT_FEED_${context}_${id}`
  //     );
  //     if (feedsWrapperEle) {
  //       feedsWrapperEle.scrollTop = feedsWrapperEle.scrollHeight;
  //     }
  //   }
  // }, [appends, context, id]);
  useEffect(() => {
    const container = document.querySelector("#ScrollFeedWrapper");
    const handler = (e) => {
      e.preventDefault();
      var n = 0;
      if ("deltaY" in e) n = 1 === e.deltaMode ? 20 * -e.deltaY : -e.deltaY;
      else if ("wheelDeltaY" in e) n = (e.wheelDeltaY / 120) * 20;
      else if ("wheelDelta" in e) n = (e.wheelDelta / 120) * 20;
      else {
        // if (!("detail"in e))
        //     return void a.v(e, "invalid wheel event: ");
        n = (-e.detail / 3) * 20;
      }
      container.scrollTop += n;
    };
    if (container) {
      container.addEventListener("wheel", handler);
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handler);
      }
    };
  }, []);

  useEffect(() => {
    if (listRef.current.length == 0) {
      //   初次
      const pageInfo = getFeedWithPagination({ mids });
      console.log("pull down 2", pageInfo);
      pageRef.current = pageInfo;
      listRef.current = pageInfo.ids;
      setItems(listRef.current);
      console.log("message pageInfo", mids, pageInfo);
    } else {
      //   追加
      const lastMid = listRef.current[0];
      const sorteds = mids.slice(0).sort((a, b) => {
        return Number(b) - Number(a);
      });
      const prepends = sorteds.filter((s) => s > lastMid);
      if (prepends.length) {
        setItems((prevs) => [...prepends, ...prevs]);
      }
      console.log("prepends", prepends, items);
    }
  }, [mids]);
  const pullDown = () => {
    // 向下加载
    const currPageInfo = pageRef.current;
    console.log("pull down", currPageInfo);
    // 最后一页
    if (currPageInfo && currPageInfo.isLast) {
      setHasMore(true);
      return;
    }
    let pageInfo = null;
    if (!currPageInfo) {
      // 初始化
      pageInfo = getFeedWithPagination({
        mids,
      });
    } else {
      const nextPageNumber = currPageInfo.pageNumber + 1;
      pageInfo = getFeedWithPagination({
        mids,
        pageNumber: nextPageNumber,
      });
    }
    pageRef.current = pageInfo;
    listRef.current = [...listRef.current, ...pageInfo.ids];
    setTimeout(() => {
      setItems(listRef.current);
      console.log("pull up", currPageInfo, listRef.current);
      setHasMore(!pageInfo.isLast);
    }, 1000);
  };

  return {
    mids,
    // appends,
    hasMore,
    // pullUp,
    pullDown,
    list: items,
  };
}
