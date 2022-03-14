import { createListenerMiddleware } from "@reduxjs/toolkit";
import channelsHandler from "./handler.channels";
import contactsHandler from "./handler.contacts";
import channelMsgHandler from "./handler.channel.msg";
import dmMsgHandler from "./handler.dm.msg";
import messageHandler from "./handler.message";
import reactionHandler from "./handler.reaction";
import footprintHandler from "./handler.footprint";
const operations = [
  "channels",
  "channelMessage",
  "contacts",
  "userMessage",
  "reactionMessage",
  "message",
  "footprint",
];

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    const { type = "" } = action;
    console.log("operation", type);
    const [prefix] = type.split("/");
    return operations.includes(prefix);
    // console.log("listener predicate", action, currentState, previousState);
    // return true;
  },
  effect: async (action, listenerApi) => {
    if (!window.CACHE) return;
    const { type = "", payload } = action;
    // const key = getCacheKey(type);
    // // console.log("listener effect", key, listenerApi.getState(), window.CACHE);
    // if (key && window.CACHE) {
    //   await window.CACHE.setItem(key, listenerApi.getState()[key]);
    // }
    const [prefix, operation] = type.split("/");
    const state = listenerApi.getState()[prefix];
    switch (prefix) {
      case "channels":
        {
          await channelsHandler({
            operation,
            payload,
            data: state,
          });
        }
        break;
      case "contacts":
        {
          await contactsHandler({
            operation,
            payload,
            data: state,
          });
        }
        break;
      case "channelMessage":
        {
          await channelMsgHandler({
            operation,
            payload,
            data: state,
          });
        }
        break;
      case "userMessage":
        {
          await dmMsgHandler({
            operation,
            payload,
            data: state,
          });
        }
        break;
      case "message":
        {
          await messageHandler({
            operation,
            payload,
            data: state,
          });
        }
        break;
      case "reactionMessage":
        {
          await reactionHandler({
            operation,
            payload,
            data: state,
          });
        }
        break;
      case "footprint":
        {
          await footprintHandler({
            operation,
            payload,
            data: state,
          });
        }
        break;

      default:
        break;
    }
  },
});

export default listenerMiddleware;
