import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import baseQuery from "./base.query";
import { ContentTypes } from "../config";
import { addChannelMsg } from "../slices/message.channel";
import { updateChannel } from "../slices/channels";
import {
  addPendingMessage,
  removePendingMessage,
} from "../slices/message.pending";
export const channelApi = createApi({
  reducerPath: "channel",
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
      async onQueryStarted(
        { id, content, type, from_uid },
        { dispatch, queryFulfilled }
      ) {
        // id: who send to ,from_uid: who sent
        const mid = new Date().getTime();
        const tmpMsg = {
          id,
          content,
          content_type: ContentTypes[type],
          created_at: new Date().getTime(),
          mid,
          from_uid,
          unread: false,
        };
        dispatch(addPendingMessage({ type: "channel", msg: tmpMsg }));
        try {
          const { data: server_mid } = await queryFulfilled;
          console.log("channel server mid", server_mid);
          // 此处的id，是指给谁发的
          dispatch(
            addChannelMsg({ ...tmpMsg, mid: server_mid, unread: false })
          );
          dispatch(removePendingMessage({ id, mid, type: "channel" }));
        } catch {
          console.log("channel message send failed");
          toast.error("Send Message Failed");
          dispatch(removePendingMessage({ id, mid, type: "channel" }));
          // patchResult.undo();
        }
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
