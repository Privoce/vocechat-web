import { createApi } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../config";

import baseQuery from "./base.query";

export const serverApi = createApi({
  reducerPath: "serverApi",
  baseQuery,
  endpoints: (builder) => ({
    getServer: builder.query({
      query: () => ({ url: `admin/system/organization` }),
      transformResponse: (data) => {
        data.logo = `${BASE_URL}/resource/organization/logo`;
        return data;
      },
    }),
    getMetrics: builder.query({
      query: () => ({ url: `/admin/system/metrics` }),
    }),
    getFirebaseConfig: builder.query({
      query: () => ({ url: `admin/fcm/config` }),
    }),
    updateFirebaseConfig: builder.mutation({
      query: (data) => ({
        url: `admin/fcm/config`,
        method: "POST",
        body: data,
      }),
    }),
    getAgoraConfig: builder.query({
      query: () => ({ url: `admin/agora/config` }),
    }),
    updateAgoraConfig: builder.mutation({
      query: (data) => ({
        url: `admin/agora/config`,
        method: "POST",
        body: data,
      }),
    }),
    getSMTPConfig: builder.query({
      query: () => ({ url: `admin/smtp/config` }),
    }),
    updateSMTPConfig: builder.mutation({
      query: (data) => ({
        url: `admin/smtp/config`,
        method: "POST",
        body: data,
      }),
    }),
    updateLogo: builder.mutation({
      query: (data) => ({
        headers: {
          "content-type": "image/png",
        },
        url: `admin/system/organization/logo`,
        method: "POST",
        body: data,
      }),
    }),
    updateServer: builder.mutation({
      query: (data) => ({
        url: `admin/system/organization`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useUpdateFirebaseConfigMutation,
  useGetFirebaseConfigQuery,
  useGetSMTPConfigQuery,
  useUpdateSMTPConfigMutation,
  useGetAgoraConfigQuery,
  useUpdateAgoraConfigMutation,
  useGetServerQuery,
  useLazyGetMetricsQuery,
  useLazyGetServerQuery,
  useUpdateServerMutation,
  useUpdateLogoMutation,
} = serverApi;
