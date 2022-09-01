import { useState } from "react";
import { useDispatch } from "react-redux";
import { fillReactionMessage } from "../slices/message.reaction";
import { fillServer } from "../slices/server";
import { fillMessage } from "../slices/message";
import { fillChannelMsg } from "../slices/message.channel";
import { fillUserMsg } from "../slices/message.user";
import { fillChannels } from "../slices/channels";
import { fillUsers } from "../slices/users";
import { fillFootprint } from "../slices/footprint";
import { fillFileMessage } from "../slices/message.file";
import { fillUI } from "../slices/ui";
import { useAppSelector } from "../store";

const useRehydrate = () => {
  const [iterated, setIterated] = useState(false);
  const dispatch = useDispatch();
  const { isGuest } = useAppSelector((store) => {
    return {
      isGuest: store.authData.user?.create_by == "guest"
    };
  });
  const rehydrate = async () => {
    // 如果是游客，直接忽略
    if (isGuest) {
      setIterated(true);
      return;
    }
    const rehydrateData = {
      channels: [],
      users: [],
      fileMessage: {},
      channelMessage: {},
      userMessage: {},
      reactionMessage: {},
      message: { replying: {} },
      footprint: {},
      ui: {},
      server: {}
    };
    const tables = Object.keys(window.CACHE);
    await Promise.all(
      tables.map((_key) => {
        return window.CACHE[_key]?.iterate((data: any, key) => {
          // console.log("iterated", key);
          switch (_key) {
            case "channels":
              if (data) {
                rehydrateData.channels.push(data);
              }
              break;
            case "users":
              if (data) {
                rehydrateData.users.push(data);
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
    dispatch(fillUsers(rehydrateData.users));
    dispatch(fillServer(rehydrateData.server));
    dispatch(fillChannels(rehydrateData.channels));
    // file message
    dispatch(fillFileMessage(rehydrateData.fileMessage.list));
    dispatch(fillChannelMsg(rehydrateData.channelMessage));
    dispatch(fillUserMsg(rehydrateData.userMessage));
    dispatch(fillMessage(rehydrateData.message));
    dispatch(fillFootprint(rehydrateData.footprint));
    dispatch(fillUI(rehydrateData.ui));
    dispatch(fillReactionMessage(rehydrateData.reactionMessage));

    setIterated(true);
  };
  return { rehydrate, rehydrated: iterated };
};

export default useRehydrate;
