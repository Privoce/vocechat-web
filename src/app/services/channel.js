import { createApi } from "@reduxjs/toolkit/query/react";
// import toast from "react-hot-toast";
import baseQuery from "./base.query";
import { ContentTypes } from "../config";
import { updateChannel } from "../slices/channels";
import { onMessageSendStarted } from "./handlers";
export const channelApi = createApi({
  reducerPath: "channelApi",
  baseQuery,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ({ url: `group` }),
    }),
    getChannel: builder.query({
      query: (id) => ({ url: `group/${id}` }),
    }),
    createChannel: builder.mutation({
      query: (data) => ({
        url: "group",
        method: "POST",
        body: data,
      }),
    }),
    updateChannel: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `group/${id}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(
        { id, name, description },
        { dispatch, queryFulfilled }
      ) {
        // id: who send to ,from_uid: who sent
        const patchResult = dispatch(updateChannel({ id, name, description }));
        try {
          await queryFulfilled;
        } catch {
          console.log("channel update failed");
          patchResult.undo();
        }
      },
    }),
    removeChannel: builder.query({
      query: (id) => ({
        url: `group/${id}`,
        method: "DELETE",
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
      async onQueryStarted(param1, param2) {
        await onMessageSendStarted.call(this, param1, param2, "channel");
      },
    }),
  }),
});

export const {
  useGetChannelQuery,
  useUpdateChannelMutation,
  useLazyRemoveChannelQuery,
  useGetChannelsQuery,
  useCreateChannelMutation,
  useSendChannelMsgMutation,
} = channelApi;
