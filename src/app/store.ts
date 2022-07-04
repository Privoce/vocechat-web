import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import listenerMiddleware from "./listener.middleware";
import authDataReducer from "./slices/auth.data";
import footprintReducer from "./slices/footprint";
import serverReducer from "./slices/server";
import uiReducer from "./slices/ui";
import channelsReducer from "./slices/channels";
import usersReducer from "./slices/users";
import reactionMsgReducer from "./slices/message.reaction";
import channelMsgReducer from "./slices/message.channel";
import userMsgReducer from "./slices/message.user";
import favoritesReducer from "./slices/favorites";
import fileMsgReducer from "./slices/message.file";
import messageReducer from "./slices/message";
import { authApi } from "./services/auth";
import { userApi } from "./services/user";
import { channelApi } from "./services/channel";
import { messageApi } from "./services/message";
import { serverApi } from "./services/server";

const reducer = combineReducers({
  authData: authDataReducer,
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

setupListeners(store.dispatch, (dispatch, { onOnline, onOffline, onFocus, onFocusLost }) => {
  const handleFocus = () => dispatch(onFocus());
  const handleFocusLost = () => dispatch(onFocusLost());
  const handleOnline = () => dispatch(onOnline());
  const handleOffline = () => dispatch(onOffline());
  const handleVisibilityChange = () => {
    if (window.document.visibilityState === "visible") {
      handleFocus();
    } else {
      handleFocusLost();
    }
  };

  if (!initialized) {
    if (typeof window !== "undefined" && window.addEventListener) {
      // Handle focus events
      window.addEventListener("visibilitychange", handleVisibilityChange, false);
      window.addEventListener("focus", handleFocus, false);

      // Handle connection events
      window.addEventListener("online", handleOnline, false);
      window.addEventListener("offline", handleOffline, false);
      initialized = true;
    }
  }

  return () => {
    window.removeEventListener("focus", handleFocus);
    window.removeEventListener("visibilitychange", handleVisibilityChange);
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
