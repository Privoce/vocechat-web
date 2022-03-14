import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import listenerMiddleware from "./listener.middleware";
import authDataReducer from "./slices/auth.data";
import footprintReducer from "./slices/footprint";
import uiReducer from "./slices/ui";
import channelsReducer from "./slices/channels";
import contactsReducer from "./slices/contacts";
import reactionMsgReducer from "./slices/message.reaction";
import channelMsgReducer from "./slices/message.channel";
import userMsgReducer from "./slices/message.user";
import messageReducer from "./slices/message";
import { authApi } from "./services/auth";
import { contactApi } from "./services/contact";
import { channelApi } from "./services/channel";
import { messageApi } from "./services/message";
import { serverApi } from "./services/server";
import { streamingApi } from "./services/streaming";

const reducer = combineReducers({
  authData: authDataReducer,
  ui: uiReducer,
  footprint: footprintReducer,
  contacts: contactsReducer,
  channels: channelsReducer,
  reactionMessage: reactionMsgReducer,
  userMessage: userMsgReducer,
  channelMessage: channelMsgReducer,
  message: messageReducer,
  [authApi.reducerPath]: authApi.reducer,
  [messageApi.reducerPath]: messageApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,
  [channelApi.reducerPath]: channelApi.reducer,
  [serverApi.reducerPath]: serverApi.reducer,
  [streamingApi.reducerPath]: streamingApi.reducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        authApi.middleware,
        contactApi.middleware,
        channelApi.middleware,
        serverApi.middleware,
        messageApi.middleware,
        streamingApi.middleware
      )
      .prepend(listenerMiddleware.middleware),
});
setupListeners(store.dispatch);
export default store;
