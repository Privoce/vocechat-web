import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./base.query";
import {
  AvailableChannelType,
  EnabledChannelType,
  ToggleChannelTypeDTO,
  UserNotificationChannel,
  CreateUserChannelDTO,
  UpdateUserChannelDTO,
} from "@/types/notification";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery,
  tagTypes: ["EnabledChannelTypes", "AvailableChannelTypes", "UserChannels"],
  endpoints: (builder) => ({
    // Admin endpoints
    getEnabledChannelTypes: builder.query<EnabledChannelType[], void>({
      query: () => ({ url: `/admin/notification/channel-types` }),
      providesTags: ["EnabledChannelTypes"],
    }),
    toggleChannelType: builder.mutation<EnabledChannelType, ToggleChannelTypeDTO>({
      query: (data) => ({
        url: `/admin/notification/channel-types`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["EnabledChannelTypes", "AvailableChannelTypes"],
    }),
    deleteChannelType: builder.mutation<string, string>({
      query: (channelType) => ({
        url: `/admin/notification/channel-types/${channelType}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EnabledChannelTypes", "AvailableChannelTypes"],
    }),

    // User endpoints
    getAvailableChannelTypes: builder.query<AvailableChannelType[], void>({
      query: () => ({ url: `/user/notification/available-types` }),
      providesTags: ["AvailableChannelTypes"],
    }),
    getUserChannels: builder.query<UserNotificationChannel[], void>({
      query: () => ({ url: `/user/notification/channels` }),
      providesTags: ["UserChannels"],
    }),
    createUserChannel: builder.mutation<UserNotificationChannel, CreateUserChannelDTO>({
      query: (data) => ({
        url: `/user/notification/channels`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UserChannels"],
    }),
    updateUserChannel: builder.mutation<UserNotificationChannel, UpdateUserChannelDTO>({
      query: ({ id, ...data }) => ({
        url: `/user/notification/channels/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["UserChannels"],
    }),
    deleteUserChannel: builder.mutation<string, number>({
      query: (id) => ({
        url: `/user/notification/channels/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserChannels"],
    }),
    testUserChannel: builder.mutation<string, number>({
      query: (id) => ({
        url: `/user/notification/channels/${id}/test`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetEnabledChannelTypesQuery,
  useToggleChannelTypeMutation,
  useDeleteChannelTypeMutation,
  useGetAvailableChannelTypesQuery,
  useGetUserChannelsQuery,
  useCreateUserChannelMutation,
  useUpdateUserChannelMutation,
  useDeleteUserChannelMutation,
  useTestUserChannelMutation,
} = notificationApi;
