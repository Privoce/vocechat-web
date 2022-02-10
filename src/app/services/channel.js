import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./base.query";
import { REHYDRATE } from "redux-persist";
import { ContentTypes } from "../config";

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
      query: ({ id, content, type = "text" }) => ({
        headers: {
          "content-type": ContentTypes[type],
        },
        url: `group/${id}/send`,
        method: "POST",
        body: content,
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useCreateChannelMutation,
  useSendChannelMsgMutation,
} = channelApi;
