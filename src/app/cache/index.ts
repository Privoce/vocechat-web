import * as localforage from "localforage";
import { extendPrototype } from 'localforage-setitems';

import useRehydrate from "./useRehydrate";
import { KEY_UID, CACHE_VERSION } from "../config";

extendPrototype(localforage);
const tables = [
  {
    storeName: "channels",
    description: "store channel list"
  },
  {
    storeName: "users",
    description: "store user list"
  },
  {
    storeName: "messageDM",
    description: "store DM message with IDs"
  },
  {
    storeName: "messageChannel",
    description: "store channel message with IDs"
  },
  {
    storeName: "message",
    description: "store message with key-val full data"
  },
  {
    storeName: "messageFile",
    description: "store file message list"
  },
  {
    storeName: "messageArchive",
    description: "store archive message"
  },
  {
    storeName: "messageReaction",
    description: "store message reaction with key-val full data"
  },
  {
    storeName: "footprint",
    description: "store user visit data"
  },
  {
    storeName: "server",
    description: "store server data"
  },
  {
    storeName: "ui",
    description: "store UI state"
  }
];
const initCache = () => {
  const uid = localStorage.getItem(KEY_UID) || "";
  // 没有uid，就没有本地缓存
  if (!uid) return;
  const name = `local_db_${uid}_v_${CACHE_VERSION.split(".").join("_")}`;
  window.CACHE = {};
  tables.forEach(({ storeName, description }) => {
    window.CACHE[storeName] = localforage.createInstance({
      name,
      storeName,
      description
    });
  });
};

export { useRehydrate };
export default initCache;
