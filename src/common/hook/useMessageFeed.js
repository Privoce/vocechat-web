import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useLazyGetHistoryMessagesQuery } from "../../app/services/channel";
const getFeedWithPagination = (config) => {
  const { pageNumber = 1, pageSize = 20, mids = [] } = config || {};
  const shadowMids = mids.slice(0);

  if (shadowMids.length == 0)
    return {
      isFirst: true,
      isLast: true,
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
  const [loadMoreFromServer] = useLazyGetHistoryMessagesQuery();
  const listRef = useRef([]);
  const pageRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [prepends, setPrepends] = useState([]);
  // const [appends, setAppends] = useState([]);
  const [items, setItems] = useState([]);
  const { mids } = useSelector((store) => {
    return {
      mids:
        context == "channel"
          ? store.channelMessage[id] || []
          : store.userMessage.byId[id] || [],
      // messageData: store.message,
    };
  });
  useEffect(() => {
    listRef.current = [];
    pageRef.current = [];
    setItems([]);
    setPrepends([]);
    setHasMore(true);
    // setAppends([]);
  }, [context, id]);
  // useEffect(() => {
  //   if (prepends.length) {
  //     const feedsWrapperEle = document.querySelector(
  //       `#RUSTCHAT_FEED_${context}_${id}`
  //     );
  //     const [newestId]=prepends;

  //     if (feedsWrapperEle) {
  //       feedsWrapperEle.scrollTop = feedsWrapperEle.scrollHeight;
  //     }
  //   }
  // }, [prepends, context, id,messageData]);
  useEffect(() => {
    const container = document.querySelector(`#RUSTCHAT_FEED_${context}_${id}`);
    const handler = (e) => {
      e.preventDefault();
      var n = 0;
      if ("deltaY" in e) n = 1 === e.deltaMode ? 20 * -e.deltaY : -e.deltaY;
      else if ("wheelDeltaY" in e) n = (e.wheelDeltaY / 120) * 20;
      else if ("wheelDelta" in e) n = (e.wheelDelta / 120) * 20;
      else {
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
  }, [context, id]);

  useEffect(() => {
    const fetchMore = () => {
      if (listRef.current.length == 0 && mids.length) {
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
          setPrepends(prepends);
        }
        console.log("prepends", prepends, items);
      }
    };
    fetchMore();
  }, [mids]);

  const pullDown = async () => {
    // 向下加载
    const currPageInfo = pageRef.current;
    console.log("pull down", currPageInfo);
    // 最后一页
    if (currPageInfo && currPageInfo.isLast) {
      const [mid] = currPageInfo.ids.slice(-1);
      const { data: newList } = await loadMoreFromServer({ mid, gid: id });
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
      setHasMore(!pageInfo.isLast);
      setItems(listRef.current);
      console.log("pull down update", currPageInfo, listRef.current);
    }, 1000);
  };

  return {
    mids,
    prepends,
    // appends,
    hasMore,
    // pullUp,
    pullDown,
    list: items,
  };
}
