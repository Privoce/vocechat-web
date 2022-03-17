import { useState } from "react";
import localforage from "localforage";
import { useDispatch, batch } from "react-redux";
import { fullfillReactionMessage } from "./slices/message.reaction";
import { fullfillServer } from "./slices/server";
import { fullfillMessage } from "./slices/message";
import { fullfillChannelMsg } from "./slices/message.channel";
import { fullfillUserMsg } from "./slices/message.user";
import { fullfillChannels } from "./slices/channels";
import { fullfillContacts } from "./slices/contacts";
import { fullfillFootprint } from "./slices/footprint";
import { KEY_UID } from "./config";
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
  const name = `local_db_${uid}`;
  window.CACHE = {};
  tables.forEach(({ storeName, description }) => {
    window.CACHE[storeName] = localforage.createInstance({
      name,
      storeName,
      description,
    });
  });
};
export const useRehydrate = () => {
  const [iterated, setIterated] = useState(false);
  const dispatch = useDispatch();
  const rehydrate = async () => {
    const rehydrateData = {
      channels: [],
      contacts: [],
      channelMessage: {},
      userMessage: {},
      reactionMessage: {},
      message: { replying: {} },
      footprint: {},
      server: {},
    };
    const tables = Object.keys(window.CACHE);
    const results = await Promise.all(
      tables.map((_key) => {
        return window.CACHE[_key].iterate((data, key) => {
          // console.log("iterated", key);
          switch (_key) {
            case "channels":
              rehydrateData.channels.push(data);
              break;
            case "contacts":
              rehydrateData.contacts.push(data);
              break;
            case "footprint":
              rehydrateData.footprint[key] = data;
              break;
            case "messageChannel":
              rehydrateData.channelMessage[key] = data;
              break;
            case "messageDM":
              rehydrateData.userMessage[key] = data;
              break;
            case "messageReaction":
              rehydrateData.reactionMessage[key] = data;
              break;
            case "message":
              rehydrateData.message[key] = data;
              break;
            case "server":
              rehydrateData.server[key] = data;
              break;

            default:
              break;
          }
        });
      })
    );
    batch(() => {
      dispatch(fullfillContacts(rehydrateData.contacts));
      dispatch(fullfillServer(rehydrateData.server));
      console.log("fullfill channels from indexedDB");
      dispatch(fullfillChannels(rehydrateData.channels));
      dispatch(fullfillChannelMsg(rehydrateData.channelMessage));
      dispatch(fullfillUserMsg(rehydrateData.userMessage));
      dispatch(fullfillMessage(rehydrateData.message));
      dispatch(fullfillFootprint(rehydrateData.footprint));
      dispatch(fullfillReactionMessage(rehydrateData.reactionMessage));
    });

    setIterated(true);
    console.log("iterate results", rehydrateData, results);
  };
  return { rehydrate, rehydrated: iterated };
};

export default initCache;
