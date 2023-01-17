import { createApi } from "@reduxjs/toolkit/query/react";
// import toast from "react-hot-toast";
import baseQuery from "./base.query";
import { updateAutoDeleteSetting, updateMute } from "../slices/footprint";
import { fillUsers } from "../slices/users";
import BASE_URL, { ContentTypes } from "../config";
import { onMessageSendStarted } from "./handlers";
import handleChatMessage from "../../common/hook/useStreaming/chat.handler";
import { AutoDeleteMsgDTO, BotAPIKey, User, UserCreateDTO, UserDTO, UserForAdmin, UserForAdminDTO } from "../../types/user";
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
        try {
          const { data: users } = await queryFulfilled;
          dispatch(fillUsers(users));
        } catch {
          console.log("get user list error");
        }
      }
    }),
    deleteUser: builder.query<void, number>({
      query: (uid) => ({ url: `/admin/user/${uid}`, method: "DELETE" })
    }),
    createUser: builder.mutation<UserForAdmin, UserCreateDTO>({
      query: (data) => ({
        url: `/admin/user`,
        body: data,
        method: "POST"
      })
    }),
    updateUser: builder.mutation<UserForAdmin, UserForAdminDTO>({
      query: ({ id, ...rest }) => ({
        url: `/admin/user/${id}`,
        body: rest,
        method: "PUT"
      })
    }),

    updateAutoDeleteMsg: builder.mutation<void, AutoDeleteMsgDTO>({
      query: (data) => ({
        url: `/user/burn-after-reading`,
        body: data,
        method: "POST"
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          if (data.users) {
            // users
            dispatch(updateAutoDeleteSetting({ burn_after_reading_users: data.users }));
          }
          if (data.groups) {
            // channel
            dispatch(updateAutoDeleteSetting({ burn_after_reading_groups: data.groups }));
          }
        } catch {
          console.log("update auto delete message setting error");
        }
      }
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
    updateAvatarByAdmin: builder.mutation<void, { uid: number, file: File }>({
      query: ({ uid, file }) => ({
        headers: {
          "content-type": "image/png"
        },
        url: `admin/user/${uid}/avatar`,
        method: "POST",
        body: file
      })
    }),
    getUserByAdmin: builder.query<UserForAdmin, number>({
      query: (uid) => ({ url: `/admin/user/${uid}` })
    }),
    // bot operations
    createBotAPIKey: builder.mutation<void, { uid: number, name: string }>({
      query: ({ uid, name }) => ({
        url: `admin/user/bot-api-key/${uid}`,
        method: "POST",
        body: { name },
      }),

    }),
    getBotAPIKeys: builder.query<BotAPIKey[], number>({
      query: (uid) => ({ url: `/admin/user/bot-api-key/${uid}` })
    }),
    deleteBotAPIKey: builder.query<void, { uid: number, kid: number }>({
      query: ({ uid, kid }) => ({ url: `/admin/user/bot-api-key/${uid}/${kid}`, method: "DELETE" })
    }),
    // bot operations end
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
    }),

  })
});

export const {
  useGetUserByAdminQuery,
  useUpdateAvatarByAdminMutation,
  useUpdateAutoDeleteMsgMutation,
  useCreateUserMutation,
  useLazyGetHistoryMessagesQuery,
  useUpdateUserMutation,
  useUpdateMuteSettingMutation,
  useLazyDeleteUserQuery,
  useUpdateInfoMutation,
  useUpdateAvatarMutation,
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useSendMsgMutation,
  useCreateBotAPIKeyMutation,
  useLazyDeleteBotAPIKeyQuery,
  useGetBotAPIKeysQuery
} = userApi;
