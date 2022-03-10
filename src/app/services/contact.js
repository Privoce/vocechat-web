import { createApi } from "@reduxjs/toolkit/query/react";
// import toast from "react-hot-toast";
import baseQuery from "./base.query";
import BASE_URL, { ContentTypes } from "../config";
import { removeContact } from "../slices/contacts";
import { onMessageSendStarted } from "./handlers";
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
      async onQueryStarted(param1, param2) {
        await onMessageSendStarted.call(this, param1, param2, "user");
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
