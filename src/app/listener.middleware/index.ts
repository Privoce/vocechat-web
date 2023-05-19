import { createListenerMiddleware } from "@reduxjs/toolkit";

import { RootState } from "../store";
import archiveMessageHandler from "./handler.archive.msg";
import channelMsgHandler from "./handler.channel.msg";
import channelsHandler from "./handler.channels";
import dmMsgHandler from "./handler.dm.msg";
import fileMessageHandler from "./handler.file.msg";
import footprintHandler from "./handler.footprint";
import messageHandler from "./handler.message";
import reactionHandler from "./handler.reaction";
import rtkqHandler from "./handler.rtkq";
import serverHandler from "./handler.server";
import UIHandler from "./handler.ui";
import usersHandler from "./handler.users";

const operations = [
  "__rtkq",
  "channels",
  "channelMessage",
  "users",
  "userMessage",
  "reactionMessage",
  "fileMessage",
  "archiveMessage",
  "message",
  "ui",
  "footprint",
  "server"
];

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listenerMiddleware.startListening({
  predicate: (action) => {
    const { type = "" } = action;
    const [prefix] = type.split("/");
    // console.log("operation", type);
    return operations.includes(prefix);
    // console.log("listener predicate", action, currentState, previousState);
    // return true;
  },
  effect: async (action, listenerApi) => {
    const { type = "", payload } = action;
    const [prefix, operation]: [keyof RootState | "__rtkq", string] = type.split("/");
    // console.log("effect opt", action);
    if (!window.CACHE && prefix !== "__rtkq") return;
    const currentState = listenerApi.getState() as RootState;
    const state = prefix == "__rtkq" ? null : currentState[prefix];
    switch (prefix) {
      case "__rtkq":
        {
          rtkqHandler({
            operation,
            payload,
            dispatch: listenerApi.dispatch
          });
        }
        break;
      case "channels":
        {
          await channelsHandler({
            operation,
            payload,
            data: state
          });
        }
        break;
      case "users":
        {
          await usersHandler({
            operation,
            payload,
            data: state
          });
        }
        break;
      case "channelMessage":
        {
          await channelMsgHandler({
            operation,
            payload,
            data: state
          });
        }
        break;
      case "userMessage":
        {
          await dmMsgHandler({
            operation,
            payload,
            data: state
          });
        }
        break;
      case "fileMessage":
        {
          await fileMessageHandler({
            operation,
            // payload,
            data: state
          });
        }
        break;
      case "archiveMessage":
        {
          await archiveMessageHandler({
            operation,
            payload
          });
        }
        break;
      case "message":
        {
          await messageHandler({
            operation,
            payload,
            data: state
          });
        }
        break;
      case "reactionMessage":
        {
          await reactionHandler({
            operation,
            payload,
            data: state
          });
        }
        break;
      case "footprint":
        {
          await footprintHandler({
            operation,
            payload,
            data: state
          });
        }
        break;
      case "ui":
        {
          await UIHandler({
            operation,
            payload,
            data: state
          });
        }
        break;
      case "server":
        {
          await serverHandler({
            operation,
            payload,
            data: state
          });
        }
        break;

      default:
        break;
    }
  }
});

export default listenerMiddleware;
