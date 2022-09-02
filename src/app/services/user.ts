import { createApi } from "@reduxjs/toolkit/query/react";
// import toast from "react-hot-toast";
import baseQuery from "./base.query";
import { updateMute } from "../slices/footprint";
import { fillUsers } from "../slices/users";
import BASE_URL, { ContentTypes } from "../config";
import { onMessageSendStarted } from "./handlers";
import handleChatMessage from "../../common/hook/useStreaming/chat.handler";
import { User, UserDTO, UserForAdmin, UserForAdminDTO } from "../../types/user";
import { ChatMessage, ContentTypeKey, MuteDTO } from "../../types/message";
import { RootState } from "../store";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
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
        // const local_uid = Number(localStorage.getItem(KEY_UID));
        try {
          const { data: users } = await queryFulfilled;
          dispatch(fillUsers(users));
          // }
        } catch {
          console.log("get user list error");
        }
      }
    }),
    deleteUser: builder.query<void, number>({
      query: (uid) => ({ url: `/admin/user/${uid}`, method: "DELETE" })
    }),
    updateUser: builder.mutation<UserForAdmin, UserForAdminDTO>({
      query: ({ id, ...rest }) => ({
        url: `/admin/user/${id}`,
        body: rest,
        method: "PUT"
      })
    }),
    updateMuteSetting: builder.mutation<void, MuteDTO>({
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
    updateAvatar: builder.mutation<void, File>({
      query: (data) => ({
        headers: {
          "content-type": "image/png"
        },
        url: `user/avatar`,
        method: "POST",
        body: data
      })
    }),
    updateInfo: builder.mutation<User, UserDTO>({
      query: (data) => ({
        url: `user`,
        method: "PUT",
        body: data
      })
    }),

    sendMsg: builder.mutation<
      number,
      { id: number; content: string; type: ContentTypeKey; properties?: object }
    >({
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
    getHistoryMessages: builder.query<ChatMessage[], { id: number; mid?: number; limit?: number }>({
      query: ({ id, mid = null, limit = 100 }) => ({
        url: mid
          ? `/user/${id}/history?before=${mid}&limit=${limit}`
          : `/user/${id}/history?limit=${limit}`
      }),
      async onQueryStarted(params, { dispatch, getState, queryFulfilled }) {
        const { data: messages } = await queryFulfilled;
        if (messages?.length) {
          messages.forEach((msg) => {
            handleChatMessage(msg, dispatch, getState() as RootState);
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
