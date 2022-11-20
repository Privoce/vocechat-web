import { createApi } from "@reduxjs/toolkit/query/react";
import BASE_URL, { PAYMENT_URL_PREFIX } from "../config";
import { updateInfo } from "../slices/server";
import baseQuery from "./base.query";
import { RootState } from "../store";
import { User } from "../../types/user";
import {
  FirebaseConfig,
  GoogleAuthConfig,
  LoginConfig,
  Server,
  TestEmailDTO,
  CreateAdminDTO,
  SMTPConfig,
  AgoraConfig,
  GithubAuthConfig,
  LicenseResponse,
  RenewLicense,
  RenewLicenseResponse
} from "../../types/server";

const defaultExpireDuration = 2 * 24 * 60 * 60;

export const serverApi = createApi({
  reducerPath: "serverApi",
  baseQuery,
  endpoints: (builder) => ({
    getServer: builder.query<Server, void>({
      query: () => ({ url: `admin/system/organization` }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const { data: server } = await queryFulfilled;
          const logo = `${BASE_URL}/resource/organization/logo?t=${+new Date()}`;
          dispatch(updateInfo({ ...server, logo }));
        } catch {
          console.error("get server info error");
        }
      }
    }),
    getThirdPartySecret: builder.query<string, void>({
      query: () => ({
        url: `/admin/system/third_party_secret`,
        responseHandler: (response: Response) => response.text()
      }),
      keepUnusedDataFor: 0
    }),
    updateThirdPartySecret: builder.mutation<string, void>({
      query: () => ({
        url: `/admin/system/third_party_secret`,
        method: "POST",
        responseHandler: (response: Response) => response.text()
      })
    }),
    getServerVersion: builder.query<string, void>({
      query: () => ({
        headers: {
          accept: "text/plain"
        },
        url: `/admin/system/version`,
        responseHandler: (response: Response) => response.text()
      })
    }),
    getFirebaseConfig: builder.query<FirebaseConfig, void>({
      query: () => ({ url: `admin/fcm/config` })
    }),
    getGoogleAuthConfig: builder.query<GoogleAuthConfig, void>({
      query: () => ({ url: `admin/google_auth/config` })
    }),
    updateGoogleAuthConfig: builder.mutation<void, GoogleAuthConfig>({
      query: (data) => ({
        url: `admin/google_auth/config`,
        method: "POST",
        body: data
      })
    }),
    getGithubAuthConfig: builder.query<GithubAuthConfig, void>({
      query: () => ({ url: `admin/github_auth/config` })
    }),
    updateGithubAuthConfig: builder.mutation<void, GithubAuthConfig>({
      query: (data) => ({
        url: `admin/github_auth/config`,
        method: "POST",
        body: data
      })
    }),
    sendTestEmail: builder.mutation<void, TestEmailDTO>({
      query: (data) => ({
        url: `/admin/system/send_mail`,
        method: "POST",
        body: data
      })
    }),
    updateFirebaseConfig: builder.mutation<void, FirebaseConfig>({
      query: (data) => ({
        url: `admin/fcm/config`,
        method: "POST",
        body: data
      })
    }),
    getAgoraConfig: builder.query<AgoraConfig, void>({
      query: () => ({ url: `admin/agora/config` })
    }),
    updateAgoraConfig: builder.mutation<void, AgoraConfig>({
      query: (data) => ({
        url: `admin/agora/config`,
        method: "POST",
        body: data
      })
    }),
    getSMTPConfig: builder.query<SMTPConfig, void>({
      query: () => ({ url: `admin/smtp/config` })
    }),
    getSMTPStatus: builder.query<boolean, void>({
      query: () => ({ url: `/admin/smtp/enabled` })
    }),
    updateSMTPConfig: builder.mutation<void, SMTPConfig>({
      query: (data) => ({
        url: `admin/smtp/config`,
        method: "POST",
        body: data
      })
    }),
    getLoginConfig: builder.query<LoginConfig, void>({
      query: () => ({ url: `admin/login/config` })
    }),
    updateLoginConfig: builder.mutation<void, Partial<LoginConfig>>({
      query: (data) => ({
        url: `admin/login/config`,
        method: "POST",
        body: data
      })
    }),
    updateLogo: builder.mutation<void, File>({
      query: (data) => ({
        headers: {
          "content-type": "image/png"
        },
        url: `admin/system/organization/logo`,
        method: "POST",
        body: data
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            updateInfo({
              logo: `${BASE_URL}/resource/organization/logo?t=${+new Date()}`
            })
          );
        } catch {
          console.error("update server logo error");
        }
      }
    }),
    createInviteLink: builder.query<string, number>({
      query: (expired_in = defaultExpireDuration) => ({
        headers: {
          "content-type": "text/plain",
          accept: "text/plain"
        },
        url: `/admin/system/create_invite_link?expired_in=${expired_in}`,
        responseHandler: (response: Response) => response.text()
      }),
      transformResponse: (link: string) => {
        // 替换掉域名
        const invite = new URL(link);
        return `${location.origin}${invite.pathname}${invite.search}${invite.hash}`;
      }
    }),
    updateServer: builder.mutation<void, Server>({
      query: (data) => ({
        url: "admin/system/organization",
        method: "POST",
        body: data
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled, getState }) {
        const rootStore = getState() as RootState;
        const { name: prevName, description: prevDesc } = rootStore.server;
        dispatch(updateInfo(data));
        try {
          await queryFulfilled;
        } catch {
          dispatch(updateInfo({ name: prevName, description: prevDesc }));
        }
      }
    }),
    createAdmin: builder.mutation<User, CreateAdminDTO>({
      query: (data) => ({
        url: "/admin/system/create_admin",
        method: "POST",
        body: data
      })
    }),
    getLicense: builder.query<LicenseResponse, void>({
      query: () => ({
        url: `/license`
      })
    }),

    getLicensePaymentUrl: builder.mutation<RenewLicenseResponse, RenewLicense>({
      query: (data) => ({
        url: `${PAYMENT_URL_PREFIX}/vocechat/payment/create`,
        method: "POST",
        body: data
      })
    }),
    getGeneratedLicense: builder.query<{ license: string }, string>({
      query: (session_id) => ({
        url: `${PAYMENT_URL_PREFIX}/vocechat/licenses/${session_id}`
      })
    }),
    checkLicense: builder.mutation<LicenseResponse, string>({
      query: (license) => ({
        url: "/license/check",
        method: "POST",
        body: { license }
      })
    }),
    upsertLicense: builder.mutation<boolean, string>({
      query: (license) => ({
        url: "/license",
        method: "PUT",
        body: { license }
      })
    })
  })
});

export const {
  useGetServerVersionQuery,
  useGetGithubAuthConfigQuery,
  useUpdateGithubAuthConfigMutation,
  useGetGoogleAuthConfigQuery,
  useUpdateGoogleAuthConfigMutation,
  useGetSMTPStatusQuery,
  useSendTestEmailMutation,
  useUpdateFirebaseConfigMutation,
  useLazyGetFirebaseConfigQuery,
  useLazyGetAgoraConfigQuery,
  useLazyGetSMTPConfigQuery,
  useLazyGetLoginConfigQuery,
  useGetLoginConfigQuery,
  useUpdateLoginConfigMutation,
  useGetSMTPConfigQuery,
  useUpdateSMTPConfigMutation,
  useUpdateAgoraConfigMutation,
  useGetServerQuery,
  useLazyGetServerQuery,
  useUpdateServerMutation,
  useUpdateLogoMutation,
  useCreateInviteLinkQuery,
  useLazyCreateInviteLinkQuery,
  useGetThirdPartySecretQuery,
  useUpdateThirdPartySecretMutation,
  useCreateAdminMutation,
  useUpsertLicenseMutation,
  useCheckLicenseMutation,
  useGetLicenseQuery,
  useGetLicensePaymentUrlMutation,
  useLazyGetGeneratedLicenseQuery
} = serverApi;
