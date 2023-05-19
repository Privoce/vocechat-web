import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import listenerMiddleware from "./listener.middleware";
import { authApi } from "./services/auth";
import { channelApi } from "./services/channel";
import { messageApi } from "./services/message";
import { serverApi } from "./services/server";
import { userApi } from "./services/user";
import authDataReducer from "./slices/auth.data";
import channelsReducer from "./slices/channels";
import favoritesReducer from "./slices/favorites";
import footprintReducer from "./slices/footprint";
import messageReducer from "./slices/message";
import archiveMsgReducer from "./slices/message.archive";
import channelMsgReducer from "./slices/message.channel";
import fileMsgReducer from "./slices/message.file";
import reactionMsgReducer from "./slices/message.reaction";
import userMsgReducer from "./slices/message.user";
import serverReducer from "./slices/server";
import uiReducer from "./slices/ui";
import usersReducer from "./slices/users";
import voiceReducer from "./slices/voice";

const reducer = combineReducers({
  authData: authDataReducer,
  voice: voiceReducer,
  ui: uiReducer,
  footprint: footprintReducer,
  server: serverReducer,
  favorites: favoritesReducer,
  users: usersReducer,
  channels: channelsReducer,
  reactionMessage: reactionMsgReducer,
  userMessage: userMsgReducer,
  channelMessage: channelMsgReducer,
  fileMessage: fileMsgReducer,
  archiveMessage: archiveMsgReducer,
  message: messageReducer,
  [authApi.reducerPath]: authApi.reducer,
  [messageApi.reducerPath]: messageApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [channelApi.reducerPath]: channelApi.reducer,
  [serverApi.reducerPath]: serverApi.reducer
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        authApi.middleware,
        userApi.middleware,
        channelApi.middleware,
        serverApi.middleware,
        messageApi.middleware
      )
      .prepend(listenerMiddleware.middleware)
});

let initialized = false;

setupListeners(store.dispatch, (dispatch, { onOnline, onOffline }) => {
  const handleOnline = () => dispatch(onOnline());
  const handleOffline = () => dispatch(onOffline());

  if (!initialized) {
    if (typeof window !== "undefined" && window.addEventListener) {
      // Handle connection events
      window.addEventListener("online", handleOnline, false);
      window.addEventListener("offline", handleOffline, false);
      initialized = true;
    }
  }

  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
    initialized = false;
  };
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
