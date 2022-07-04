import { createApi } from "@reduxjs/toolkit/query/react";
// import toast from "react-hot-toast";
import { KEY_UID } from "../config";
import baseQuery from "./base.query";
import { resetAuthData } from "../slices/auth.data";
import { updateMute } from "../slices/footprint";
import { fullfillUsers } from "../slices/users";
import BASE_URL, { ContentTypes } from "../config";
import { onMessageSendStarted } from "./handlers";
import handleChatMessage from "../../common/hook/useStreaming/chat.handler";
import { User } from "../../types/auth";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({ url: `user` }),
      transformResponse: (data: User[]) => {
        return data.map((user) => {
          return {
            ...user,
            avatar:
              user.avatar_updated_at == 0
                ? ""
                : `${BASE_URL}/resource/avatar?uid=${user.uid}&t=${user.avatar_updated_at}`
          };
        });
      },
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const local_uid = localStorage.getItem(KEY_UID);
        try {
          const { data: users } = await queryFulfilled;
          const matchedUser = users.find((c) => c.uid == local_uid);
          console.log("wtf", users, matchedUser);
          if (!matchedUser) {
            // 用户已注销或被禁用
            console.log("no matched user, redirect to login");
            dispatch(resetAuthData());
          } else {
            const markedUsers = users.map((u) => {
              return u.uid == matchedUser.uid ? { ...u, online: true } : u;
            });
            dispatch(fullfillUsers(markedUsers));
          }
        } catch {
          console.log("get user list error");
        }
      }
    }),
    deleteUser: builder.query({
      query: (uid) => ({ url: `/admin/user/${uid}`, method: "DELETE" })
    }),
    updateUser: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/admin/user/${id}`,
        body: rest,
        method: "PUT"
      })
    }),
    updateMuteSetting: builder.mutation({
      query: (data) => ({
        url: `/user/mute`,
        method: "POST",
        body: data
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(updateMute(data));
        } catch (error) {
          console.log("update mute failed", error);
        }
      }
    }),
    updateAvatar: builder.mutation({
      query: (data) => ({
        headers: {
          "content-type": "image/png"
        },
        url: `user/avatar`,
        method: "POST",
        body: data
      })
    }),
    updateInfo: builder.mutation({
      query: (data) => ({
        url: `user`,
        method: "PUT",
        body: data
      })
    }),

    sendMsg: builder.mutation({
      query: ({ id, content, type = "text", properties = "" }) => ({
        headers: {
          "content-type": ContentTypes[type],
          "X-Properties": properties
            ? btoa(unescape(encodeURIComponent(JSON.stringify(properties))))
            : ""
        },
        url: `user/${id}/send`,
        method: "POST",
        body: type == "file" ? JSON.stringify(content) : content
      }),
      async onQueryStarted(param1, param2) {
        await onMessageSendStarted.call(this, param1, param2, "user");
      }
    }),
    getHistoryMessages: builder.query({
      query: ({ id, mid = null, limit = 100 }) => ({
        url: mid
          ? `/user/${id}/history?before=${mid}&limit=${limit}`
          : `/user/${id}/history?limit=${limit}`
      }),
      async onQueryStarted(params, { dispatch, getState, queryFulfilled }) {
        const { data: messages } = await queryFulfilled;
        if (messages?.length) {
          messages.forEach((msg) => {
            handleChatMessage(msg, dispatch, getState());
          });
        }
      }
    })
  })
});

export const {
  useLazyGetHistoryMessagesQuery,
  useUpdateUserMutation,
  useUpdateMuteSettingMutation,
  useLazyDeleteUserQuery,
  useUpdateInfoMutation,
  useUpdateAvatarMutation,
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useSendMsgMutation
} = userApi;
