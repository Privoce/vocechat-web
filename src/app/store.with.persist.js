import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authDataReducer from "./slices/auth.data";
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
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    ui: uiReducer,
    contacts: contactsReducer,
    channels: channelsReducer,
    pendingMsg: pendingMsgReducer,
    userMsg: userMsgReducer,
    channelMsg: channelMsgReducer,
    authData: authDataReducer,
    [authApi.reducerPath]: authApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [channelApi.reducerPath]: channelApi.reducer,
    [serverApi.reducerPath]: serverApi.reducer,
  })
);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      contactApi.middleware,
      channelApi.middleware,
      serverApi.middleware
    ),
});
setupListeners(store.dispatch);
// export function swapToUserStore(userId) {
//   console.log({ userId });
//   const newConfig = {
//     ...persistConfig,
//     keyPrefix: userId,
//   };
//   store.replaceReducer(
//     persistReducer(
//       newConfig,
//       combineReducers({
//         ui: uiReducer,
//         channels: channelsReducer,
//         userMsg: userMsgReducer,
//         channelMsg: channelMsgReducer,
//         authData: authDataReducer,
//         [authApi.reducerPath]: authApi.reducer,
//         [contactApi.reducerPath]: contactApi.reducer,
//         [channelApi.reducerPath]: channelApi.reducer,
//         [serverApi.reducerPath]: serverApi.reducer,
//       })
//     )
//   );
// }
export default store;
