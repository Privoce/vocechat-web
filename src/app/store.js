import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import listenerMiddleware from "./listener.middleware";
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
import { messageApi } from "./services/message";
import { serverApi } from "./services/server";

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
  [messageApi.reducerPath]: messageApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,
  [channelApi.reducerPath]: channelApi.reducer,
  [serverApi.reducerPath]: serverApi.reducer,
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
        messageApi.middleware
      )
      .prepend(listenerMiddleware.middleware),
});
setupListeners(store.dispatch);
export default store;
