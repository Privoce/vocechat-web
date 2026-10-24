import { createListenerMiddleware } from "@reduxjs/toolkit";

import { userApi } from "../services/user";
import { clearUserEmails } from "../slices/users";
import { updateLoginUser } from "../slices/auth.data";
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
    return operations.includes(prefix) || prefix === "authData";
    // console.log("listener predicate", action, currentState, previousState);
    // return true;
  },
  effect: async (action, listenerApi) => {
    const { type = "", payload } = action;
    const [prefix, operation]: [keyof RootState | "__rtkq", string] = type.split("/");
    // console.log("effect opt", action);
    let currentState = listenerApi.getState() as RootState;
    if (
      prefix === "server" &&
      operation === "updateInfo" &&
      (listenerApi.getOriginalState() as RootState).server.hide_user_email &&
      !currentState.server.hide_user_email &&
      currentState.authData.user &&
      !currentState.authData.user?.is_admin
    ) {
      // A reconnect may have no user logs; fetch emails without replacing contact state.
      listenerApi.dispatch(userApi.endpoints.refreshUserEmails.initiate(undefined, {
        subscribe: false,
        forceRefetch: true
      }));
    }
    if (
      ["server", "users", "authData"].includes(prefix) &&
      currentState.server.hide_user_email &&
      !currentState.authData.user?.is_admin
    ) {
      if (Object.values(currentState.users.byId).some((user) => user.email != null)) {
        listenerApi.dispatch(clearUserEmails());
      }
      if (currentState.authData.user?.email != null) {
        listenerApi.dispatch(updateLoginUser({ email: null }));
      }
      currentState = listenerApi.getState() as RootState;
    }
    if (!window.CACHE && prefix !== "__rtkq") return;
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
