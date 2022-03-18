import localforage from "localforage";
import useRehydrate from "./useRehydrate";
import { KEY_UID, CACHE_VERSION } from "../config";
const tables = [
  {
    storeName: "channels",
    description: "store channel list",
  },
  {
    storeName: "contacts",
    description: "store contact list",
  },
  {
    storeName: "messageDM",
    description: "store DM message with IDs",
  },
  {
    storeName: "messageChannel",
    description: "store channel message with IDs",
  },
  {
    storeName: "message",
    description: "store message with key-val full data",
  },
  {
    storeName: "messageReaction",
    description: "store message reaction with key-val full data",
  },
  {
    storeName: "footprint",
    description: "store user visit data",
  },
  {
    storeName: "server",
    description: "store server data",
  },
  // {
  //   storeName: "message",
  //   description: "store message with key-val full data",
  // },
];
const initCache = () => {
  const uid = localStorage.getItem(KEY_UID) || "";
  const name = `local_db_${uid}_v_${CACHE_VERSION.split(".").join("_")}`;
  window.CACHE = {};
  tables.forEach(({ storeName, description }) => {
    window.CACHE[storeName] = localforage.createInstance({
      name,
      storeName,
      description,
    });
  });
};

export { useRehydrate };
export default initCache;
