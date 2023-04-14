import { createApi } from "@reduxjs/toolkit/query/react";
// import toast from "react-hot-toast";
import baseQuery from "./base.query";
import { updateAutoDeleteSetting, updateMute } from "../slices/footprint";
import { fillUsers, updateContactStatus as updateStatus } from "../slices/users";
import BASE_URL, { ContentTypes } from "../config";
import { onMessageSendStarted } from "./handlers";
import { AutoDeleteMsgDTO, BotAPIKey, Contact, ContactAction, ContactStatus, User, UserCreateDTO, UserDTO, UserForAdmin, UserForAdminDTO } from "../../types/user";
import { ContentTypeKey, MuteDTO } from "../../types/message";
import { RootState } from "../store";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({ url: `/user` }),
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
      async onQueryStarted(data, { dispatch, queryFulfilled, getState }) {
        try {
          const { data: users } = await queryFulfilled;
          const { authData: { user: loginUser } } = getState() as RootState;
          dispatch(fillUsers(users.map((u) => {
            const status = loginUser?.uid == u.uid ? "added" : "";
            return {
              ...u,
              status
            };
          })));
        } catch {
          console.log("get user list error");
        }
      }
    }),
    getContacts: builder.query<Contact[], void>({
      query: () => ({ url: `/user/contacts` }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const { data: users } = await queryFulfilled;
          const payloads = users.map((u) => {
            const { uid, status } = u;
            return {
              uid,
              status
            };
          });
          dispatch(updateStatus(payloads));
        } catch {
          console.log("get contact list error");
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
    searchUser: builder.mutation<User, { search_type: "id" | "email", keyword: string }>({
      query: (input) => ({
        url: `/user/search`,
        body: input,
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

    updateContactStatus: builder.mutation<void, { action: ContactAction, target_uid: number }>({
      query: (payload) => ({
        url: `/user/update_contact_status`,
        method: "POST",
        body: payload
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const map = {
          "add": "added",
          "block": "blocked",
          "remove": "",
          "unblock": "",
        };
        try {
          await queryFulfilled;
          const status = map[data.action] as ContactStatus;
          dispatch(updateStatus({ uid: data.target_uid, status }));
        } catch (error) {
          console.log("update mute failed", error);
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
        // @ts-ignore
        await onMessageSendStarted.call(this, param1, param2, "user");
      }
    }),

  })
});

export const {
  useLazyGetUsersQuery,
  useGetUserByAdminQuery,
  useUpdateAvatarByAdminMutation,
  useUpdateAutoDeleteMsgMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdateMuteSettingMutation,
  useLazyDeleteUserQuery,
  useUpdateInfoMutation,
  useUpdateAvatarMutation,
  useLazyGetContactsQuery,
  useSendMsgMutation,
  useCreateBotAPIKeyMutation,
  useLazyDeleteBotAPIKeyQuery,
  useGetBotAPIKeysQuery,
  useSearchUserMutation,
  useUpdateContactStatusMutation
} = userApi;
