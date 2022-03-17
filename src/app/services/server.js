import { createApi } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../config";
import { updateInviteLink } from "../slices/server";
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
    createInviteLink: builder.query({
      query: (expired_in = 7 * 24 * 60 * 60) => ({
        headers: {
          "content-type": "text/plain",
          accept: "text/plain",
        },
        url: `/admin/user/create_invite_link?expired_in=${expired_in}`,
        responseHandler: (response) => response.text(),
      }),
      async onQueryStarted(expire, { dispatch, queryFulfilled, getState }) {
        const {
          expire: prevExp,
          link: prevLink,
        } = getState().server.inviteLink;
        try {
          const { data: link } = await queryFulfilled;
          console.log("link", link);
          dispatch(updateInviteLink({ expire, link }));
        } catch {
          dispatch(updateInviteLink({ expire: prevExp, link: prevLink }));
        }
      },
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
  useLazyCreateInviteLinkQuery,
} = serverApi;
