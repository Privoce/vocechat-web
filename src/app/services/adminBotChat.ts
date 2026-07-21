import { createApi } from "@reduxjs/toolkit/query/react";

import { ChatMessage } from "@/types/message";
import { User } from "@/types/user";
import BASE_URL from "../config";
import baseQuery from "./base.query";

export type ConversationTarget = { uid: number } | { gid: number };

export interface ConversationSummary {
  target: ConversationTarget;
  last_mid: number;
  last_created_at: number;
}

export interface BotConversationsResponse {
  conversations: ConversationSummary[];
  next_before: number | null;
}

export const adminBotChatApi = createApi({
  reducerPath: "adminBotChatApi",
  baseQuery,
  endpoints: (builder) => ({
    listBots: builder.query<User[], void>({
      query: () => ({ url: `/admin/bot_chat/bots` }),
      transformResponse: (data: User[]) => {
        return data.map((user) => ({
          ...user,
          avatar:
            user.avatar_updated_at == 0
              ? ""
              : `${BASE_URL}/resource/avatar?uid=${user.uid}&t=${user.avatar_updated_at}`,
        }));
      },
    }),
    listBotConversations: builder.query<
      BotConversationsResponse,
      { botUid: number; before?: number; limit?: number }
    >({
      query: ({ botUid, before, limit = 30 }) => ({
        url: `/admin/bot_chat/${botUid}/conversations?limit=${limit}${
          before ? `&before=${before}` : ""
        }`,
      }),
    }),
    getAdminBotDmHistory: builder.query<
      ChatMessage[],
      { botUid: number; uid: number; before?: number; limit?: number }
    >({
      query: ({ botUid, uid, before, limit = 50 }) => ({
        url: `/admin/bot_chat/${botUid}/user/${uid}/history?limit=${limit}${
          before ? `&before=${before}` : ""
        }`,
      }),
    }),
    getAdminBotGroupHistory: builder.query<
      ChatMessage[],
      { botUid: number; gid: number; before?: number; limit?: number }
    >({
      query: ({ botUid, gid, before, limit = 50 }) => ({
        url: `/admin/bot_chat/${botUid}/group/${gid}/history?limit=${limit}${
          before ? `&before=${before}` : ""
        }`,
      }),
    }),
  }),
});

export const {
  useListBotsQuery,
  useListBotConversationsQuery,
  useLazyGetAdminBotDmHistoryQuery,
  useLazyGetAdminBotGroupHistoryQuery,
} = adminBotChatApi;
