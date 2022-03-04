import { useState } from "react";
import localforage from "localforage";
import { useDispatch } from "react-redux";
import { initChannelMsg } from "./slices/message.channel";
import { initUserMsg } from "./slices/message.user";
import { setChannels } from "./slices/channels";
import { setMark } from "./slices/visit.mark";
import { KEY_UID } from "./config";
const initCache = () => {
  const uid = localStorage.getItem(KEY_UID) || "";
  const name = `cache_db_${uid}`;
  // const channels = localforage.createInstance({
  //   name,
  //   storeName: "channels",
  //   description: "channel list",
  // });
  // const contacts = localforage.createInstance({
  //   name,
  //   storeName: "contacts",
  //   description: "contact list",
  // });
  // const msgs_user = localforage.createInstance({
  //   name,
  //   storeName: "msgs_dm",
  //   description: "DM message list",
  // });
  // const msgs_channel = localforage.createInstance({
  //   name,
  //   storeName: "msgs_channel",
  //   description: "channel message list",
  // });
  window.CACHE = localforage.createInstance({
    name,
    storeName: "data",
    description: "rustchat cache data by uid",
  });
};
export const useRehydrate = () => {
  const [iterated, setIterated] = useState(false);
  const dispatch = useDispatch();
  const rehydrate = async () => {
    const res = await window.CACHE.iterate((data, key) => {
      switch (key) {
        case "visitMark":
          dispatch(setMark(data));
          break;
        case "channels":
          dispatch(setChannels(data));
          break;
        // case "contacts":
        //   dispatch(initChannelMsg(data));
        //   break;
        case "channelMessage":
          dispatch(initChannelMsg(data));
          break;
        case "userMessage":
          dispatch(initUserMsg(data));
          break;

        default:
          break;
      }
    });
    setIterated(true);
    console.log("iterate", res);
  };
  return { rehydrate, cacheFirst: iterated };
};

export default initCache;
