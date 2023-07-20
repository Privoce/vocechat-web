import { createApi } from "@reduxjs/toolkit/query/react";

import { Channel, ChannelDTO, CreateChannelDTO } from "@/types/channel";
import { ContentTypeKey } from "@/types/message";
import { transformInviteLink } from "@/utils";
import BASE_URL, { ContentTypes } from "../config";
import { removeChannel, updateChannel } from "../slices/channels";
import { removeMessage } from "../slices/message";
import { removeChannelSession } from "../slices/message.channel";
import { removeReactionMessage } from "../slices/message.reaction";
import { updateRememberedNavs } from "../slices/ui";
import { RootState } from "../store";
// import toast from "react-hot-toast";
import baseQuery from "./base.query";
import { onMessageSendStarted } from "./handlers";

export const channelApi = createApi({
  reducerPath: "channelApi",
  baseQuery,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getChannels: builder.query<Channel[], void>({
      query: () => ({ url: `/group` })
    }),
    getChannel: builder.query<Channel, number>({
      query: (id) => ({ url: `/group/${id}` })
    }),
    leaveChannel: builder.query<void, number>({
      query: (id) => ({ url: `/group/${id}/leave` }),
      async onQueryStarted(gid, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(removeChannel(gid));
        } catch {
          console.error("channel update failed");
        }
      }
    }),
    createChannel: builder.mutation<{ gid: number; created_at: number } | number, CreateChannelDTO>(
      {
        query: (data) => ({
          url: "group",
          method: "POST",
          body: data
        })
      }
    ),
    changeChannelType: builder.mutation<
      number,
      { is_public: boolean; id: number; members?: number[] }
    >({
      query: ({ id, is_public, members }) => ({
        url: `/group/${id}/change_type`,
        method: "POST",
        body: members ? { is_public, members } : { is_public }
      }),
      async onQueryStarted({ id, is_public, members }, { dispatch, queryFulfilled, getState }) {
        try {
          await queryFulfilled;
          // 后面有可能删掉的临时逻辑：及时更新members
          const userIds = (getState() as RootState).users.ids;
          const mbs = is_public ? [] : members ?? userIds;
          dispatch(updateChannel({ gid: id, members: mbs }));
        } catch {
          console.error("channel update failed");
        }
      }
    }),
    updateChannel: builder.mutation<void, ChannelDTO>({
      query: ({ id, ...data }) => ({
        url: `/group/${id}`,
        method: "PUT",
        body: data
      }),
      async onQueryStarted({ id, name, description }, { dispatch, queryFulfilled }) {
        // id: who send to ,from_uid: who sent
        dispatch(updateChannel({ gid: id, name, description }));
        try {
          await queryFulfilled;
        } catch {
          console.error("channel update failed");
        }
      }
    }),
    createInviteLink: builder.query<string, { expire: number; times: number }>({
      query: (data) => ({
        headers: {
          "content-type": "text/plain",
          accept: "text/plain"
        },
        url: `/group/create_reg_magic_link?expired_in=${data.expire}&max_times=${data.times}`,
        responseHandler: "text"
      }),
      transformResponse: (link: string) => {
        return transformInviteLink(link);
      }
    }),
    clearChannelMessage: builder.query<void, number>({
      query: (id) => ({
        url: `/group/${id}/clear`,
        method: "DELETE"
      }),
      async onQueryStarted(id, { dispatch, getState, queryFulfilled }) {
        const { channelMessage } = getState() as RootState;
        try {
          await queryFulfilled;
          // 删掉该channel下的所有消息&reaction
          const mids = channelMessage[id];
          if (mids) {
            dispatch(removeMessage(mids));
            dispatch(removeReactionMessage(mids));
          }
        } catch {
          console.error("clear channel msg error");
        }
      }
    }),
    createPrivateInviteLink: builder.query<
      string,
      { cid: number; expire: number; times: number | null }
    >({
      query: (data) => ({
        headers: {
          "content-type": "text/plain",
          accept: "text/plain"
        },
        // 七天过期
        url: `/group/create_invite_private_magic_link?expired_in=${data.expire}&max_times=${data.times}&gid=${data.cid}`,
        responseHandler: "text"
      }),
      transformResponse: (link: string) => {
        return transformInviteLink(link);
      }
    }),
    removeChannel: builder.query<void, number>({
      query: (id) => ({
        url: `/group/${id}`,
        method: "DELETE"
      }),
      async onQueryStarted(id, { dispatch, getState, queryFulfilled }) {
        const {
          channelMessage,
          ui: {
            rememberedNavs: { chat: rememberedPath }
          }
        } = getState() as RootState;
        try {
          await queryFulfilled;
          // 删掉该channel下的所有消息&reaction
          const mids = channelMessage[id];
          if (rememberedPath == `/chat/channel/${id}`) {
            dispatch(updateRememberedNavs({ path: null }));
          }
          if (mids) {
            dispatch(removeChannelSession(id));
            dispatch(removeMessage(mids));
            dispatch(removeReactionMessage(mids));
          }
        } catch {
          console.error("remove channel error");
        }
      }
    }),
    sendChannelMsg: builder.mutation<
      number,
      {
        id: number;
        content: string | { path: string };
        type: ContentTypeKey;
        properties?: object;
        from_uid?: number;
        ignoreLocal?: boolean;
      }
    >({
      query: ({ id, content, type = "text", properties = {} }) => ({
        headers: {
          "content-type": ContentTypes[type],
          "X-Properties": properties ? btoa(JSON.stringify(properties)) : ""
        },
        url: `/group/${id}/send`,
        method: "POST",
        body: type == "file" ? JSON.stringify(content) : content
      }),
      async onQueryStarted(param1, param2) {
        await onMessageSendStarted.call(this, param1, param2, "channel");
      }
    }),
    addMembers: builder.mutation<void, { id: number; members: number[] }>({
      query: ({ id, members }) => ({
        url: `/group/${id}/members/add`,
        method: "POST",
        body: members
      })
    }),
    removeMembers: builder.mutation<void, { id: number; members: number[] }>({
      query: ({ id, members }) => ({
        url: `/group/${id}/members/remove`,
        method: "POST",
        body: members
      })
    }),
    joinPrivateChannel: builder.mutation<Channel, { magic_token: string }>({
      query: (body) => ({
        url: `/user/join_private`,
        method: "POST",
        body
      })
    }),
    updateIcon: builder.mutation<void, { gid: number; image: File }>({
      query: ({ gid, image }) => ({
        headers: {
          "content-type": "image/png"
        },
        url: `/group/${gid}/avatar`,
        method: "POST",
        body: image
      }),
      async onQueryStarted({ gid }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            updateChannel({
              gid,
              icon: `${BASE_URL}/resource/group_avatar?gid=${gid}&t=${+new Date()}`
            })
          );
        } catch (error) {
          console.error("err", error);
        }
      }
    })
  })
});

export const {
  useChangeChannelTypeMutation,
  useLazyLeaveChannelQuery,
  useLazyCreateInviteLinkQuery,
  useJoinPrivateChannelMutation,
  useLazyCreatePrivateInviteLinkQuery,
  useCreateInviteLinkQuery,
  useGetChannelQuery,
  useLazyGetChannelQuery,
  useUpdateChannelMutation,
  useLazyRemoveChannelQuery,
  useGetChannelsQuery,
  useCreateChannelMutation,
  useSendChannelMsgMutation,
  useAddMembersMutation,
  useRemoveMembersMutation,
  useUpdateIconMutation,
  useLazyClearChannelMessageQuery
} = channelApi;
