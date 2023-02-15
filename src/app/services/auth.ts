import { createApi } from "@reduxjs/toolkit/query/react";
import { nanoid } from "@reduxjs/toolkit";
import baseQuery from "./base.query";
import { setAuthData, updateToken, resetAuthData, updateInitialized } from "../slices/auth.data";
import BASE_URL, { KEY_DEVICE_ID, KEY_DEVICE_TOKEN, KEY_LOCAL_MAGIC_TOKEN } from "../config";
import {
  AuthData,
  CredentialResponse,
  LoginCredential,
  RenewTokenDTO,
  RenewTokenResponse
} from "../../types/auth";

const getDeviceId = () => {
  let d = localStorage.getItem(KEY_DEVICE_ID);
  let dt = localStorage.getItem(KEY_DEVICE_TOKEN) || "";
  if (!d) {
    d = `web:${nanoid()}`;
    localStorage.setItem(KEY_DEVICE_ID, d);
  }
  return { device: d, device_token: dt };
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<AuthData, LoginCredential>({
      query: (credential) => ({
        url: "token/login",
        method: "POST",
        body: {
          credential,
          device: getDeviceId().device,
          device_token: getDeviceId().device_token
        }
      }),
      transformResponse: (data: AuthData) => {
        const { avatar_updated_at } = data.user;
        return {
          ...data,
          avatar:
            avatar_updated_at == 0
              ? ""
              : `${BASE_URL}/resource/avatar?uid=${data.user.uid}&t=${avatar_updated_at}`
        };
      },
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setAuthData(data));
          }
          // 从localstorage 去掉 magic token
          localStorage.removeItem(KEY_LOCAL_MAGIC_TOKEN);
        } catch {
          console.log("login error");
        }
      }
    }),
    guestLogin: builder.query<AuthData, void>({
      query: () => ({ url: "/token/login_guest" }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setAuthData(data));
            // 从localstorage 去掉 magic token
            localStorage.removeItem(KEY_LOCAL_MAGIC_TOKEN);
          }
        } catch {
          console.log("guest login error");
        }
      }
    }),
    register: builder.mutation<any, any>({
      query: (data) => ({
        url: `user/register`,
        method: "POST",
        body: data
      })
    }),
    // 更新token
    renew: builder.mutation<RenewTokenResponse, RenewTokenDTO>({
      query: (data) => ({
        url: "/token/renew",
        method: "POST",
        body: data
      }),
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateToken(data));
        } catch {
          // dispatch(resetAuthData());
          console.error("renew token error");
        }
      }
    }),
    // 更新 device token
    updateDeviceToken: builder.mutation<void, string>({
      query: (device_token) => ({
        url: "/token/device_token",
        method: "PUT",
        body: {
          device_token
        }
      })
    }),
    //   获取openid
    getOpenid: builder.mutation<{ url: string }, { issuer: string; redirect_uri: string }>({
      query: (data) => ({
        url: "/token/openid/authorize",
        method: "POST",
        body: data
      })
    }),

    checkMagicTokenValid: builder.mutation<boolean, string>({
      query: (token) => ({
        url: "user/check_magic_token",
        method: "POST",
        body: { magic_token: token }
      })
    }),
    updatePassword: builder.mutation<void, { old_password: string; new_password: string }>({
      query: (data) => ({
        url: "user/change_password",
        method: "POST",
        body: data
      })
    }),
    sendLoginMagicLink: builder.mutation<string, string>({
      query: (email) => ({
        headers: {
          accept: "text/plain"
        },
        url: `user/send_login_magic_link?email=${encodeURIComponent(email)}`,
        method: "POST",
        responseHandler: "text"
      })
    }),
    sendRegMagicLink: builder.mutation<
      {
        new_magic_token: string;
        mail_is_sent: boolean;
      },
      {
        magic_token: string;
        email: string;
        password: string;
      }
    >({
      query: (data) => ({
        url: `user/send_reg_magic_link`,
        method: "POST",
        body: data
      })
    }),
    getMetamaskNonce: builder.query<string, string>({
      query: (address) => ({
        url: `/token/metamask/nonce?public_address=${address}`
      })
    }),
    checkEmail: builder.query<boolean, string>({
      query: (email) => ({
        url: `/user/check_email?email=${encodeURIComponent(email)}`
      })
    }),
    getCredentials: builder.query<CredentialResponse, void>({
      query: () => ({ url: "/token/credentials" })
    }),
    logout: builder.query<void, void>({
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
    getInitialized: builder.query<boolean, void>({
      query: () => ({ url: "/admin/system/initialized" }),
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data: isInitialized } = await queryFulfilled;
          dispatch(updateInitialized(isInitialized));
        } catch {
          console.log("api initialized error");
        }
      }
    }),
    deleteCurrentAccount: builder.query<void, void>({
      query: () => ({
        url: `/user/delete`,
        method: "DELETE"
      })
    })
  })
});

export const {
  useLazyGuestLoginQuery,
  useGuestLoginQuery,
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
  useRegisterMutation,
  useLazyDeleteCurrentAccountQuery,
  useGuestLoginWithNoEffectQuery
} = authApi;
