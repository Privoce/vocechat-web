import { createListenerMiddleware } from "@reduxjs/toolkit";
const getCacheKey = (action = "") => {
  const [type] = action.split("/");
  const keys = [
    "visitMark",
    "channels",
    "contacts",
    "userMessage",
    "channelMessage",
    // "pendingMessage",
  ];
  const [tmp = ""] = keys.filter((k) => k == type);
  return tmp;
};

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    const { type = "" } = action;

    return !!getCacheKey(type);
    // console.log("listener predicate", action, currentState, previousState);
    // return true;
  },
  effect: async (action, listenerApi) => {
    const { type = "" } = action;
    const key = getCacheKey(type);
    // console.log("listener effect", key, listenerApi.getState(), window.CACHE);
    if (key && window.CACHE) {
      await window.CACHE.setItem(key, listenerApi.getState()[key]);
    }
  },
});

export default listenerMiddleware;
