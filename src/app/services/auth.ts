import { createApi } from "@reduxjs/toolkit/query/react";
import { nanoid } from "@reduxjs/toolkit";
import baseQuery from "./base.query";
import { setAuthData, updateToken, resetAuthData, updateInitialized } from "../slices/auth.data";
import BASE_URL, { KEY_DEVICE_KEY } from "../config";
import { AuthData } from '../../types/auth';

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
          device_token: "test"
        }
      }),
      transformResponse: (data: AuthData) => {
        const { avatar_updated_at } = data.user;
        data.user.avatar =
          avatar_updated_at == 0
            ? ""
            : `${BASE_URL}/resource/avatar?uid=${data.user.uid}&t=${avatar_updated_at}`;
        return data;
      },
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            console.log("login resp", data);
            dispatch(setAuthData(data));
          }
        } catch {
          console.log("login error");
        }
      }
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `user/register`,
        method: "POST",
        body: data
      })
    }),
    // 更新token
    renew: builder.mutation({
      query: ({ token, refreshToken }) => ({
        url: "/token/renew",
        method: "POST",
        body: {
          token,
          refresh_token: refreshToken
        }
      }),
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateToken(data));
        } catch {
          dispatch(resetAuthData());
          console.log("renew token error");
        }
      }
    }),
    // 更新 device token
    updateDeviceToken: builder.mutation({
      query: (device_token) => ({
        url: "/token/device_token",
        method: "PUT",
        body: {
          device_token
        }
      })
    }),
    //   获取openid
    getOpenid: builder.mutation({
      query: ({ issuer, redirect_uri }) => ({
        url: "/token/openid/authorize",
        method: "POST",
        body: {
          issuer,
          redirect_uri
        }
      })
    }),

    checkMagicTokenValid: builder.mutation({
      query: (token) => ({
        url: "user/check_magic_token",
        method: "POST",
        body: { magic_token: token }
      })
    }),
    updatePassword: builder.mutation({
      query: ({ old_password, new_password }) => ({
        url: "user/change_password",
        method: "POST",
        body: { old_password, new_password }
      })
    }),
    sendLoginMagicLink: builder.mutation({
      query: (email) => ({
        headers: {
          // "content-type": "text/plain",
          accept: "text/plain"
        },
        url: `user/send_login_magic_link?email=${encodeURIComponent(email)}`,
        method: "POST",
        responseHandler: (response) => response.text()
        // body: { email }
      })
    }),
    sendRegMagicLink: builder.mutation({
      query: (data) => ({
        url: `user/send_reg_magic_link`,
        method: "POST",
        body: data
      })
    }),
    getMetamaskNonce: builder.query({
      query: (address) => ({
        url: `/token/metamask/nonce?public_address=${address}`
      })
    }),
    checkEmail: builder.query({
      query: (email) => ({
        url: `/user/check_email?email=${encodeURIComponent(email)}`
      })
    }),
    getCredentials: builder.query({
      query: () => ({ url: "/token/credentials" })
    }),
    logout: builder.query({
      query: () => ({ url: "token/logout" }),
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(resetAuthData());
        } catch {
          console.log("logout error");
        }
      }
    }),
    getInitialized: builder.query({
      query: () => ({ url: "/admin/system/initialized" }),
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data: isInitialized } = await queryFulfilled;
          dispatch(updateInitialized(isInitialized));
        } catch {
          console.log("api initialized error");
        }
      }
    })
  })
});

export const {
  useLazyCheckEmailQuery,
  useGetInitializedQuery,
  useSendLoginMagicLinkMutation,
  useSendRegMagicLinkMutation,
  useGetCredentialsQuery,
  useUpdateDeviceTokenMutation,
  useGetOpenidMutation,
  useRenewMutation,
  useLazyGetMetamaskNonceQuery,
  useLoginMutation,
  useLazyLogoutQuery,
  useCheckMagicTokenValidMutation,
  useUpdatePasswordMutation,
  useRegisterMutation
} = authApi;
