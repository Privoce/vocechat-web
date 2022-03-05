import { createApi } from "@reduxjs/toolkit/query/react";
// import BASE_URL from "../config";

import baseQuery from "./base.query";

export const messageApi = createApi({
  reducerPath: "message",
  baseQuery,
  endpoints: (builder) => ({
    editMessage: builder.mutation({
      query: ({ mid, data }) => ({
        url: `/message/${mid}/edit`,
        method: "PUT",
        body: data,
      }),
    }),
    likeMessage: builder.mutation({
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
      query: (mid, data) => ({
        url: `/message/${mid}/reply`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useEditMessageMutation,
  useLikeMessageMutation,
  useReplyMessageMutation,
  useLazyDeleteMessageQuery,
} = messageApi;
