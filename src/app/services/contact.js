import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";

import baseQuery from "./base.query";
import BASE_URL, { ContentTypes } from "../config";
import { addUserMsg } from "../slices/message.user";
import { removeContact } from "../slices/contacts";
import {
  addPendingMessage,
  removePendingMessage,
} from "../slices/message.pending";

export const contactApi = createApi({
  reducerPath: "contact",
  baseQuery,
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({ url: `user` }),
      transformResponse: (data) => {
        return data.map((user) => {
          const avatar =
            user.avatar_updated_at == 0
              ? ""
              : `${BASE_URL}/resource/avatar?uid=${user.uid}&t=${user.avatar_updated_at}`;
          user.avatar = avatar;
          return user;
        });
      },
    }),
    deleteContact: builder.query({
      query: (uid) => ({ url: `/admin/user/${uid}`, method: "DELETE" }),
      async onQueryStarted(uid, { dispatch, queryFulfilled }) {
        // id: who send to ,from_uid: who sent
        const patchResult = dispatch(removeContact(uid));
        try {
          await queryFulfilled;
        } catch {
          console.log("channel update failed");
          patchResult.undo();
        }
      },
    }),
    updateAvatar: builder.mutation({
      query: (data) => ({
        headers: {
          "content-type": "image/png",
        },
        url: `user/avatar`,
        method: "POST",
        body: data,
      }),
    }),
    updateInfo: builder.mutation({
      query: (data) => ({
        url: `user`,
        method: "PUT",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `user/register`,
        method: "POST",
        body: data,
      }),
    }),
    sendMsg: builder.mutation({
      query: ({ id, content, type = "text" }) => ({
        headers: {
          "content-type": ContentTypes[type],
        },
        url: `user/${id}/send`,
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
        dispatch(addPendingMessage({ type: "user", msg: tmpMsg }));
        try {
          // 走sse推送
          const { data: server_mid } = await queryFulfilled;
          // console.log("wtf", wtf);
          // 此处的id，是指给谁发的
          dispatch(
            addUserMsg({ id, ...tmpMsg, mid: server_mid, unread: false })
          );
          dispatch(removePendingMessage({ id, mid, type: "user" }));
        } catch {
          toast.error("Send Message Failed");
          dispatch(removePendingMessage({ id, mid, type: "user" }));
          // patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useLazyDeleteContactQuery,
  useUpdateInfoMutation,
  useUpdateAvatarMutation,
  useGetContactsQuery,
  useLazyGetContactsQuery,
  useSendMsgMutation,
  useRegisterMutation,
} = contactApi;
