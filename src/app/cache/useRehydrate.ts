import { useState } from "react";
import { useDispatch } from "react-redux";

import { fillChannels } from "../slices/channels";
import { fillFootprint } from "../slices/footprint";
import { fillMessage } from "../slices/message";
import { fillChannelMsg } from "../slices/message.channel";
import { fillFileMessage } from "../slices/message.file";
import { fillReactionMessage } from "../slices/message.reaction";
import { fillUserMsg } from "../slices/message.user";
import { fillServer } from "../slices/server";
import { fillUI } from "../slices/ui";
import { fillUsers } from "../slices/users";

const useRehydrate = () => {
  const [iterated, setIterated] = useState(false);
  const dispatch = useDispatch();
  const rehydrate = async () => {
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
    if (!window.CACHE) {
      setIterated(true);
      return;
    }
    const tables = Object.keys(window.CACHE);
    try {
      // iOS Safari(尤其 standalone)下 IndexedDB 可能永久挂起,超时后放弃本地缓存,直接走网络
      await Promise.race([
        Promise.all(
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
        ),
        new Promise((_, reject) => {
          setTimeout(() => reject(new Error("rehydrate timeout")), 8 * 1000);
        })
      ]);
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
    } catch (err) {
      // 超时/读取失败:不 dispatch 半成品数据(iterate 回调可能仍在后台写 rehydrateData),改走网络
      console.error("rehydrate from local cache failed", err);
    } finally {
      setIterated(true);
    }
  };
  return { rehydrate, rehydrated: iterated };
};

export default useRehydrate;
