import { createApi } from "@reduxjs/toolkit/query/react";
// import toast from "react-hot-toast";
import { KEY_UID } from "../config";
import baseQuery from "./base.query";
import { resetAuthData, setUid } from "../slices/auth.data";
import { updateMute } from "../slices/footprint";
import { fullfillContacts } from "../slices/contacts";
import BASE_URL, { ContentTypes } from "../config";
import { onMessageSendStarted } from "./handlers";
export const contactApi = createApi({
  reducerPath: "contactApi",
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
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const local_uid = localStorage.getItem(KEY_UID);
        try {
          const { data: contacts } = await queryFulfilled;
          const matchedUser = contacts.find((c) => c.uid == local_uid);
          console.log("wtf", contacts, matchedUser);
          if (!matchedUser) {
            // 用户已注销或被禁用
            console.log("no matched user, redirect to login");
            dispatch(resetAuthData());
          } else {
            const markedContacts = contacts.map((u) => {
              return u.uid == matchedUser.uid ? { ...u, online: true } : u;
            });
            dispatch(setUid(matchedUser.uid));
            dispatch(fullfillContacts(markedContacts));
          }
        } catch {
          console.log("get contact list error");
        }
      },
    }),
    deleteContact: builder.query({
      query: (uid) => ({ url: `/admin/user/${uid}`, method: "DELETE" }),
    }),
    updateMuteSetting: builder.mutation({
      query: (data) => ({
        url: `/user/mute`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(updateMute(data));
        } catch (error) {
          console.log("update mute failed", error);
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
      query: ({ id, content, type = "text", properties = "" }) => ({
        headers: {
          "content-type": ContentTypes[type],
          "X-Properties": properties ? btoa(JSON.stringify(properties)) : "",
        },
        url: `user/${id}/send`,
        method: "POST",
        body: type == "file" ? JSON.stringify(content) : content,
      }),
      async onQueryStarted(param1, param2) {
        await onMessageSendStarted.call(this, param1, param2, "user");
      },
    }),
  }),
});

export const {
  useUpdateMuteSettingMutation,
  useLazyDeleteContactQuery,
  useUpdateInfoMutation,
  useUpdateAvatarMutation,
  useGetContactsQuery,
  useLazyGetContactsQuery,
  useSendMsgMutation,
  useRegisterMutation,
} = contactApi;
