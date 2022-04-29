import { createApi } from "@reduxjs/toolkit/query/react";
import { ContentTypes } from "../config";
import { updateReadChannels, updateReadUsers } from "../slices/footprint";
import {
  fullfillFavorites,
  populateFavorite,
  addFavorite,
  deleteFavorite,
} from "../slices/favorites";
import { onMessageSendStarted } from "./handlers";
import { normalizeArchiveData } from "../../common/utils";
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
    createArchive: builder.mutation({
      query: (mids = []) => ({
        url: `/resource/archive`,
        method: "POST",
        body: { mid_list: mids },
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
    getOGInfo: builder.query({
      query: (url) => ({
        url: `/resource/open_graphic_parse?url=${encodeURIComponent(url)}`,
      }),
    }),
    getArchiveMessage: builder.query({
      query: (file_path) => ({
        url: `/resource/archive?file_path=${encodeURIComponent(file_path)}`,
      }),
    }),
    pinMessage: builder.mutation({
      query: ({ gid, mid }) => ({
        url: `/group/${gid}/pin`,
        method: "POST",
        body: { mid },
      }),
    }),
    unpinMessage: builder.mutation({
      query: ({ gid, mid }) => ({
        url: `/group/${gid}/unpin`,
        method: "POST",
        body: { mid },
      }),
    }),
    favoriteMessage: builder.mutation({
      query: (mids) => ({
        url: `/favorite`,
        method: "POST",
        body: { mid_list: mids },
      }),
      async onQueryStarted(mids, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { created_at, id } = data;
          dispatch(addFavorite({ id, created_at }));
          dispatch(messageApi.endpoints.getFavoriteDetails.initiate(id));
        } catch (err) {
          console.log("get favorite list error", err);
        }
      },
    }),
    removeFavorite: builder.query({
      query: (id) => ({
        url: `/favorite/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(deleteFavorite(id));
        } catch (err) {
          console.log("get favorite list error", err);
        }
      },
    }),
    getFavoriteDetails: builder.query({
      query: (id) => ({
        url: `/favorite/${id}`,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const messages = normalizeArchiveData(data, id);
          dispatch(populateFavorite({ id, messages }));
        } catch (err) {
          console.log("get favorite list error", err);
        }
      },
    }),
    getFavorites: builder.query({
      query: () => ({
        url: `/favorite`,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const { data: favorites } = await queryFulfilled;
          dispatch(fullfillFavorites(favorites));
          for (const fav of favorites) {
            const { id } = fav;
            dispatch(messageApi.endpoints.getFavoriteDetails.initiate(id));
          }
        } catch (err) {
          console.log("get favorite list error", err);
        }
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
        if (users) {
          dispatch(updateReadUsers(users));
        }
        if (groups) {
          dispatch(updateReadChannels(groups));
        }
        try {
          await queryFulfilled;
        } catch {
          // todo
        }
      },
    }),
  }),
});

export const {
  useLazyRemoveFavoriteQuery,
  useUnpinMessageMutation,
  useLazyGetFavoritesQuery,
  useFavoriteMessageMutation,
  usePinMessageMutation,
  useLazyGetArchiveMessageQuery,
  useGetArchiveMessageQuery,
  useLazyGetOGInfoQuery,
  usePrepareUploadFileMutation,
  useUploadFileMutation,
  useEditMessageMutation,
  useReactMessageMutation,
  useReplyMessageMutation,
  useLazyDeleteMessageQuery,
  useReadMessageMutation,
  useCreateArchiveMutation,
} = messageApi;
