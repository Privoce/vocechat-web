import { useState } from "react";

import { useDispatch, batch } from "react-redux";
import { fullfillReactionMessage } from "../slices/message.reaction";
import { fullfillServer } from "../slices/server";
import { fullfillMessage } from "../slices/message";
import { fullfillChannelMsg } from "../slices/message.channel";
import { fullfillUserMsg } from "../slices/message.user";
import { fullfillChannels } from "../slices/channels";
import { fullfillContacts } from "../slices/contacts";
import { fullfillFootprint } from "../slices/footprint";
import { fullfillFileMessage } from "../slices/message.file";
import { fullfillUI } from "../slices/ui";
const useRehydrate = () => {
  const [iterated, setIterated] = useState(false);
  const dispatch = useDispatch();
  const rehydrate = async () => {
    const rehydrateData = {
      channels: [],
      contacts: [],
      fileMessage: {},
      channelMessage: {},
      userMessage: {},
      reactionMessage: {},
      message: { replying: {} },
      footprint: {},
      ui: {},
      server: {},
    };
    const tables = Object.keys(window.CACHE);
    const results = await Promise.all(
      tables.map((_key) => {
        return window.CACHE[_key].iterate((data, key) => {
          // console.log("iterated", key);
          switch (_key) {
            case "channels":
              if (data) {
                rehydrateData.channels.push(data);
              }
              break;
            case "contacts":
              if (data) {
                rehydrateData.contacts.push(data);
              }
              break;
            case "footprint":
              rehydrateData.footprint[key] = data;
              break;
            case "ui":
              rehydrateData.ui[key] = data;
              break;
            case "messageChannel":
              rehydrateData.channelMessage[key] = data;
              break;
            case "messageFile":
              rehydrateData.fileMessage[key] = data || [];
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
      // file message
      dispatch(fullfillFileMessage(rehydrateData.fileMessage.list));
      dispatch(fullfillChannelMsg(rehydrateData.channelMessage));
      dispatch(fullfillUserMsg(rehydrateData.userMessage));
      dispatch(fullfillMessage(rehydrateData.message));
      dispatch(fullfillFootprint(rehydrateData.footprint));
      dispatch(fullfillUI(rehydrateData.ui));
      dispatch(fullfillReactionMessage(rehydrateData.reactionMessage));
    });

    setIterated(true);
    console.log("iterate results", rehydrateData, results);
  };
  return { rehydrate, rehydrated: iterated };
};
export default useRehydrate;
