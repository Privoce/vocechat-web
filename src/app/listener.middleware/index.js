import { createListenerMiddleware } from "@reduxjs/toolkit";
import rtkqHandler from "./handler.rtkq";
import channelsHandler from "./handler.channels";
import contactsHandler from "./handler.contacts";
import channelMsgHandler from "./handler.channel.msg";
import dmMsgHandler from "./handler.dm.msg";
import serverHandler from "./handler.server";
import messageHandler from "./handler.message";
import reactionHandler from "./handler.reaction";
import UIHandler from "./handler.ui";
import footprintHandler from "./handler.footprint";
const operations = [
  "__rtkq",
  "channels",
  "channelMessage",
  "contacts",
  "userMessage",
  "reactionMessage",
  "message",
  "ui",
  "footprint",
  "server",
];

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    const { type = "" } = action;
    const [prefix] = type.split("/");
    console.log("operation", type, operations.includes(prefix));
    return operations.includes(prefix);
    // console.log("listener predicate", action, currentState, previousState);
    // return true;
  },
  effect: async (action, listenerApi) => {
    const { type = "", payload } = action;
    const [prefix, operation] = type.split("/");
    console.log("effect opt", action);
    if (!window.CACHE && prefix !== "__rtkq") return;

    const state = listenerApi.getState()[prefix];
    switch (prefix) {
      case "__rtkq":
        {
          rtkqHandler({
            operation,
            payload,
            dispatch: listenerApi.dispatch,
          });
        }
        break;
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
      case "ui":
        {
          await UIHandler({
            operation,
            payload,
            data: state,
          });
        }
        break;
      case "server":
        {
          await serverHandler({
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
