import {
  configureStore,
  combineReducers,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authDataReducer from "./slices/auth.data";
import visitMarkReducer from "./slices/visit.mark";
import uiReducer from "./slices/ui";
import channelsReducer from "./slices/channels";
import contactsReducer from "./slices/contacts";
import pendingMsgReducer from "./slices/message.pending";
import channelMsgReducer from "./slices/message.channel";
import userMsgReducer from "./slices/message.user";
import { authApi } from "./services/auth";
import { contactApi } from "./services/contact";
import { channelApi } from "./services/channel";
import { serverApi } from "./services/server";
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
const reducer = combineReducers({
  ui: uiReducer,
  visitMark: visitMarkReducer,
  contacts: contactsReducer,
  channels: channelsReducer,
  pendingMessage: pendingMsgReducer,
  userMessage: userMsgReducer,
  channelMessage: channelMsgReducer,
  authData: authDataReducer,
  [authApi.reducerPath]: authApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,
  [channelApi.reducerPath]: channelApi.reducer,
  [serverApi.reducerPath]: serverApi.reducer,
});
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
    console.log("listener effect", key, listenerApi.getState(), window.CACHE);
    if (key && window.CACHE) {
      await window.CACHE.setItem(key, listenerApi.getState()[key]);
    }
  },
});
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        authApi.middleware,
        contactApi.middleware,
        channelApi.middleware,
        serverApi.middleware
      )
      .prepend(listenerMiddleware.middleware),
});
setupListeners(store.dispatch);
export default store;
