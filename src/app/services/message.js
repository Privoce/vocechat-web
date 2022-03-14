import { createApi } from "@reduxjs/toolkit/query/react";
import { ContentTypes } from "../config";
import { onMessageSendStarted } from "./handlers";

// import { updateMessage } from "../slices/message";
import baseQuery from "./base.query";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery,
  endpoints: (builder) => ({
    editMessage: builder.mutation({
      query: ({ mid, content, type = "text" }) => ({
        headers: {
          "content-type": ContentTypes[type],
        },
        url: `/message/${mid}/edit`,
        method: "PUT",
        body: content,
      }),
      // async onQueryStarted({mid,content},{dispatch}){
      //   dispatch()
      // }
    }),
    reactMessage: builder.mutation({
      query: ({ mid, action }) => ({
        url: `/message/${mid}/like`,
        method: "PUT",
        body: { action },
      }),
    }),
    deleteMessage: builder.query({
      query: (mid) => ({
        url: `/message/${mid}`,
        method: "DELETE",
      }),
    }),
    replyMessage: builder.mutation({
      query: ({ reply_mid, content, type = "text" }) => ({
        headers: {
          "content-type": ContentTypes[type],
        },
        url: `/message/${reply_mid}/reply`,
        method: "POST",
        body: content,
      }),
      async onQueryStarted(param1, param2) {
        await onMessageSendStarted.call(this, param1, param2, param1.context);
      },
    }),
  }),
});

export const {
  useEditMessageMutation,
  useReactMessageMutation,
  useReplyMessageMutation,
  useLazyDeleteMessageQuery,
} = messageApi;
