import { createApi } from "@reduxjs/toolkit/query/react";
// import { batch } from "react-redux";

import BASE_URL, { ContentTypes } from "../config";
import { updateReadChannels, updateReadUsers } from "../slices/footprint";
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
    prepareUploadFile: builder.mutation({
      query: (meta = {}) => ({
        url: `/resource/file/prepare`,
        method: "POST",
        body: meta,
      }),
    }),
    uploadFile: builder.mutation({
      query: (formData) => ({
        // headers: {
        //   "content-type": ContentTypes.formData,
        // },
        url: `/resource/file/upload`,
        method: "POST",
        body: formData,
      }),
      transformResponse: (data) => {
        console.log("upload file response", data);
        return data ? data : {};
      },
    }),
    uploadImage: builder.mutation({
      query: (image) => ({
        headers: {
          "content-type": ContentTypes.image,
        },
        url: `/resource/image`,
        method: "POST",
        body: image,
      }),
      transformResponse: (image_id) => {
        return `${BASE_URL}/resource/image?id=${encodeURIComponent(image_id)}`;
      },
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
    readMessage: builder.mutation({
      query: (data) => ({
        url: `/user/read-index`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const { users = null, groups = null } = data;
        // const { readUsers, readChannels } = getState().footprint;
        // const prevUsers = users.map(({ uid }) => {
        //   return { uid, mid: readUsers[uid] };
        // });
        // const prevChannels = users.map(({ gid }) => {
        //   return { gid, mid: readChannels[gid] };
        // });
        // batch(() => {
        if (users) {
          dispatch(updateReadUsers(users));
        }
        if (groups) {
          dispatch(updateReadChannels(groups));
        }
        // });
        try {
          await queryFulfilled;
        } catch {
          // todo
          // batch(() => {
          //   dispatch(updateReadChannels(prevChannels));
          //   dispatch(updateReadUsers(prevUsers));
          // });
        }
      },
    }),
  }),
});

export const {
  usePrepareUploadFileMutation,
  useUploadFileMutation,
  useUploadImageMutation,
  useEditMessageMutation,
  useReactMessageMutation,
  useReplyMessageMutation,
  useLazyDeleteMessageQuery,
  useReadMessageMutation,
} = messageApi;
