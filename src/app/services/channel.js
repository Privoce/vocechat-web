import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./base.query";
import { REHYDRATE } from "redux-persist";
export const channelApi = createApi({
  reducerPath: "channel",
  baseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload ? action.payload[reducerPath] : undefined;
    }
  },
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ({ url: `group` }),
    }),
    createChannel: builder.mutation({
      query: (data) => ({
        url: "group",
        method: "POST",
        body: data,
      }),
    }),
    sendChannelMsg: builder.mutation({
      query: ({ gid, message }) => ({
        url: `group/${gid}/send`,
        method: "POST",
        body: message,
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useCreateChannelMutation,
  useSendChannelMsgMutation,
} = channelApi;
