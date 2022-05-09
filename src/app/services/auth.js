import { createApi } from "@reduxjs/toolkit/query/react";
import { nanoid } from "@reduxjs/toolkit";
import baseQuery from "./base.query";
import { updateToken, resetAuthData } from "../slices/auth.data";
import BASE_URL, { KEY_DEVICE_KEY } from "../config";
const getDeviceId = () => {
  let d = localStorage.getItem(KEY_DEVICE_KEY);
  if (!d) {
    d = `web:${nanoid()}`;
    localStorage.setItem(KEY_DEVICE_KEY, d);
  }
  return d;
};
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "token/login",
        method: "POST",
        body: {
          credential: credentials,
          device: getDeviceId(),
          device_token: "test",
        },
      }),
      transformResponse: (data) => {
        const { avatar_updated_at } = data.user;
        data.user.avatar =
          avatar_updated_at == 0
            ? ""
            : `${BASE_URL}/resource/avatar?uid=${data.user.uid}&t=${avatar_updated_at}`;
        return data;
      },
    }),
    // 更新token
    renew: builder.mutation({
      query: ({ token, refreshToken }) => ({
        url: "/token/renew",
        method: "POST",
        body: {
          token,
          refresh_token: refreshToken,
        },
      }),
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateToken(data));
        } catch {
          dispatch(resetAuthData());
          console.log("remove channel error");
        }
      },
    }),
    // 更新 device token
    updateDeviceToken: builder.mutation({
      query: (device_token) => ({
        url: "/token/device_token",
        method: "PUT",
        body: {
          device_token,
        },
      }),
    }),
    //   获取openid
    getOpenid: builder.mutation({
      query: ({ issuer, redirect_uri }) => ({
        url: "/token/openid/authorize",
        method: "POST",
        body: {
          issuer,
          redirect_uri,
        },
      }),
    }),

    checkInviteTokenValid: builder.mutation({
      query: (token) => ({
        url: "user/check_invite_magic_token",
        method: "POST",
        body: { magic_token: token },
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ old_password, new_password }) => ({
        url: "user/change_password",
        method: "POST",
        body: { old_password, new_password },
      }),
    }),
    sendMagicLink: builder.mutation({
      query: (email) => ({
        url: "token/send_magic_link",
        method: "POST",
        body: { email },
      }),
    }),
    getMetamaskNonce: builder.query({
      query: (address) => ({
        url: `/token/metamask/nonce?public_address=${address}`,
      }),
    }),
    getCredentials: builder.query({
      query: () => ({
        url: `/token/credentials`,
      }),
    }),
    logout: builder.query({
      query: () => ({ url: `token/logout` }),
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(resetAuthData());
        } catch {
          console.log("logout error");
        }
      },
    }),
  }),
});

export const {
  useSendMagicLinkMutation,
  useGetCredentialsQuery,
  useUpdateDeviceTokenMutation,
  useGetOpenidMutation,
  useRenewMutation,
  useLazyGetMetamaskNonceQuery,
  useLoginMutation,
  useLazyLogoutQuery,
  useCheckInviteTokenValidMutation,
  useUpdatePasswordMutation,
} = authApi;
