import { createApi } from "@reduxjs/toolkit/query/react";

import { Channel } from "@/types/channel";
import { ContentTypeKey } from "@/types/message";
import {
  AgoraChannelUsersResponse,
  AgoraConfig,
  AgoraTokenResponse,
  AgoraVoicingListResponse,
  CreateAdminDTO,
  FirebaseConfig,
  GithubAuthConfig,
  GoogleAuthConfig,
  LicenseResponse,
  LoginConfig,
  RenewLicense,
  RenewLicenseResponse,
  Server,
  SMTPConfig,
  SystemCommon,
  TestEmailDTO,
  VocespaceConfig,
} from "@/types/server";
import { User } from "@/types/user";
import { compareVersion, encodeBase64 } from "@/utils";
import BASE_URL, {
  ContentTypes,
  IS_OFFICIAL_DEMO,
  KEY_SERVER_VERSION,
  PAYMENT_URL_PREFIX,
} from "../config";
import { updateInfo } from "../slices/server";
import { updateCallInfo, upsertVoiceList } from "../slices/voice";
import { RootState } from "../store";
import baseQuery from "./base.query";
import { GetFilesDTO, VoceChatFile } from "@/types/resource";

export const serverApi = createApi({
  reducerPath: "serverApi",
  baseQuery,
  endpoints: (builder) => ({
    getServer: builder.query<Server, void>({
      query: () => ({ url: `/admin/system/organization` }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const { data: server } = await queryFulfilled;
          const logo = `${BASE_URL}/resource/organization/logo?t=${+new Date()}`;
          dispatch(updateInfo({ ...server, logo }));
        } catch {
          console.error("get server info error");
        }
      },
    }),
    getThirdPartySecret: builder.query<string, void>({
      query: () => ({
        url: `/admin/system/third_party_secret`,
        responseHandler: "text",
      }),
      keepUnusedDataFor: 0,
    }),
    updateThirdPartySecret: builder.mutation<string, void>({
      query: () => ({
        url: `/admin/system/third_party_secret`,
        method: "POST",
        responseHandler: "text",
      }),
    }),
    getServerVersion: builder.query<string, void>({
      query: () => ({
        headers: {
          accept: "text/plain",
        },
        url: `/admin/system/version`,
        responseHandler: "text",
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const resp = await queryFulfilled;
          localStorage.setItem(KEY_SERVER_VERSION, resp.data);
          dispatch(updateInfo({ version: resp.data }));
        } catch {
          console.error("get server version error");
        }
      },
    }),
    getFirebaseConfig: builder.query<FirebaseConfig, void>({
      query: () => ({ url: `/admin/fcm/config` }),
    }),
    getGoogleAuthConfig: builder.query<GoogleAuthConfig, void>({
      query: () => ({ url: `/admin/google_auth/config` }),
    }),
    updateGoogleAuthConfig: builder.mutation<void, GoogleAuthConfig>({
      query: (data) => ({
        url: `/admin/google_auth/config`,
        method: "POST",
        body: data,
      }),
    }),
    getGithubAuthConfig: builder.query<GithubAuthConfig, void>({
      query: () => ({ url: `/admin/github_auth/config` }),
    }),
    updateGithubAuthConfig: builder.mutation<void, GithubAuthConfig>({
      query: (data) => ({
        url: `/admin/github_auth/config`,
        method: "POST",
        body: data,
      }),
    }),
    sendTestEmail: builder.mutation<void, TestEmailDTO>({
      query: (data) => ({
        url: `/admin/system/send_mail`,
        method: "POST",
        body: data,
      }),
    }),
    updateFirebaseConfig: builder.mutation<void, FirebaseConfig>({
      query: (data) => ({
        url: `/admin/fcm/config`,
        method: "POST",
        body: data,
      }),
    }),
    getVocespaceConfig: builder.query<VocespaceConfig, void>({
      query: () => ({ url: `/admin/vocespace/config` }),
    }),
    getAgoraConfig: builder.query<AgoraConfig, void>({
      query: () => ({ url: `/admin/agora/config` }),
    }),
    getAgoraChannels: builder.query<
      AgoraVoicingListResponse,
      { page_no: number; page_size: number }
    >({
      query: (param = { page_no: 0, page_size: 100 }) => ({
        url: `/admin/agora/channel/${param.page_no}/${param.page_size}`,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled, getState }) {
        try {
          const {
            voice: { callingFrom },
            authData,
          } = getState() as RootState;
          const { data: resp } = await queryFulfilled;
          const { success } = resp;
          if (success) {
            const arr = resp.data.channels.map((data) => {
              const [type, id] = data.channel_name.split(":").slice(-2);
              const count = data.user_count;
              const context = type === "group" ? ("channel" as const) : ("dm" as const);
              return {
                id: +id,
                context,
                memberCount: count,
                channelName: data.channel_name,
              };
            });
            dispatch(upsertVoiceList(arr));
            const hasMyself = arr.some(
              (data) => data.context === "dm" && data.id == authData?.user?.uid
            );
            const sendByMe = callingFrom && callingFrom === authData?.user?.uid;
            // reset dm call setting
            if (callingFrom && !sendByMe && !hasMyself) {
              dispatch(updateCallInfo({ from: 0, to: 0, calling: false }));
            }
          }
        } catch {
          console.error("get voice list error");
        }
      },
    }),
    getAgoraUsersByChannel: builder.query<number[], string>({
      query: (channel_name) => ({ url: `/admin/agora/channel/user/${channel_name}/false` }),
      transformResponse: (resp: AgoraChannelUsersResponse) => {
        if (resp.success && resp.data.channel_exist) {
          return resp.data.users ?? [];
        }
        return [];
      },
    }),
    updateAgoraConfig: builder.mutation<void, AgoraConfig>({
      query: (data) => ({
        url: `/admin/agora/config`,
        method: "POST",
        body: data,
      }),
    }),
    updateVocespaceConfig: builder.mutation<void, VocespaceConfig>({
      query: (data) => ({
        url: `/admin/vocespace/config`,
        method: "POST",
        body: data,
      }),
    }),
    getAgoraStatus: builder.query<boolean, void>({
      query: () => ({ url: `/admin/agora/enabled` }),
    }),
    generateAgoraToken: builder.mutation<AgoraTokenResponse, { uid: number } | { gid: number }>({
      query: (data) => ({
        url: `/admin/agora/token`,
        method: "POST",
        body: data,
      }),
    }),
    getSystemCommon: builder.query<SystemCommon, void>({
      query: () => ({ url: `/admin/system/common` }),
      transformResponse: (resp: SystemCommon) => {
        let tmp = resp;
        tmp.chat_layout_mode = resp.chat_layout_mode ?? "Left";
        tmp.contact_verification_enable = resp.contact_verification_enable ?? false;
        tmp.max_file_expiry_mode = resp.max_file_expiry_mode ?? "Off";
        return tmp;
      },
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const resp = await queryFulfilled;
          dispatch(updateInfo(resp.data));
        } catch {
          console.error("get server common error");
        }
      },
    }),
    updateSystemCommon: builder.mutation<void, Partial<SystemCommon>>({
      query: (data) => ({
        url: `/admin/system/common`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(updateInfo(data));
        } catch {
          console.error("update server common error");
        }
      },
    }),
    getSMTPConfig: builder.query<SMTPConfig, void>({
      query: () => ({ url: `/admin/smtp/config` }),
    }),
    getSMTPStatus: builder.query<boolean, void>({
      query: () => ({ url: `/admin/smtp/enabled` }),
    }),
    updateSMTPConfig: builder.mutation<void, SMTPConfig>({
      query: (data) => ({
        url: `/admin/smtp/config`,
        method: "POST",
        body: data,
      }),
    }),
    getLoginConfig: builder.query<LoginConfig, void>({
      query: () => ({ url: `/admin/login/config` }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const resp = await queryFulfilled;
          if (resp.data) {
            console.info("update login config in redux", resp.data);
            dispatch(updateInfo({ loginConfig: resp.data }));
          }
        } catch {
          console.error("get login config error");
        }
      },
    }),
    getFiles: builder.query<VoceChatFile[], GetFilesDTO>({
      query: (params) => ({
        url: `/admin/system/files?${new URLSearchParams(
          params as Record<string, string>
        ).toString()}`,
      }),
    }),
    updateLoginConfig: builder.mutation<void, Partial<LoginConfig>>({
      query: (data) => ({
        url: `/admin/login/config`,
        method: "POST",
        body: data,
      }),
    }),
    updateLogo: builder.mutation<void, File>({
      query: (data) => ({
        headers: {
          "content-type": "image/png",
        },
        url: `/admin/system/organization/logo`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            updateInfo({
              logo: `${BASE_URL}/resource/organization/logo?t=${+new Date()}`,
            })
          );
        } catch {
          console.error("update server logo error");
        }
      },
    }),
    updateServer: builder.mutation<void, Partial<Server>>({
      query: (data) => ({
        url: "admin/system/organization",
        method:
          compareVersion(localStorage.getItem(KEY_SERVER_VERSION) ?? "", "0.3.8") > 0
            ? "PUT"
            : "POST",
        body: data,
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
      },
    }),
    createAdmin: builder.mutation<User, CreateAdminDTO>({
      query: (data) => ({
        url: "/admin/system/create_admin",
        method: "POST",
        body: data,
      }),
    }),
    getFrontendUrl: builder.query<string, void>({
      query: () => ({
        url: `/admin/system/frontend_url`,
        responseHandler: "text",
      }),
    }),
    updateFrontendUrl: builder.mutation<void, string>({
      query: (url) => ({
        url: `/admin/system/update_frontend_url`,
        method: "POST",
        headers: {
          "content-type": "text/plain",
        },
        body: url,
      }),
    }),
    getLicense: builder.query<LicenseResponse, void>({
      query: () => ({
        url: `/license`,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled, getState }) {
        // vocechat 官方 demo 则忽略
        if (IS_OFFICIAL_DEMO) return;
        const rootStore = getState() as RootState;
        const { upgraded: prevValue } = rootStore.server;
        try {
          const {
            data: { user_limit },
          } = await queryFulfilled;
          const currValue = user_limit > 20;
          if (prevValue !== currValue) {
            dispatch(updateInfo({ upgraded: currValue }));
          }
        } catch {
          console.error("get license failed ");
        }
      },
    }),

    getLicensePaymentUrl: builder.mutation<RenewLicenseResponse, RenewLicense>({
      query: (data) => ({
        url: `${PAYMENT_URL_PREFIX}/vocechat/payment/create`,
        method: "POST",
        body: data,
      }),
    }),
    getGeneratedLicense: builder.query<{ license: string }, string>({
      query: (session_id) => ({
        url: `${PAYMENT_URL_PREFIX}/vocechat/licenses/${session_id}`,
      }),
    }),
    checkLicense: builder.mutation<LicenseResponse, string>({
      query: (license) => ({
        url: "/license/check",
        method: "POST",
        body: { license },
      }),
    }),
    upsertLicense: builder.mutation<boolean, string>({
      query: (license) => ({
        url: "/license",
        method: "PUT",
        body: { license },
      }),
    }),
    clearAllMessages: builder.query<void, void>({
      query: () => ({
        url: "/admin/system/message/clear",
        method: "DELETE",
      }),
    }),
    clearAllFiles: builder.query<void, void>({
      query: () => ({
        url: "/resource/file/delete",
        method: "DELETE",
      }),
    }),
    getWidgetExtCSS: builder.query<string, void>({
      query: () => ({
        url: "/resource/widget-extra.css",
        responseHandler: "text",
      }),
    }),
    updateWidgetExtCSS: builder.mutation<boolean, string>({
      query: (css) => ({
        url: "/resource/widget-extra.css",
        method: "PUT",
        body: { data: css },
      }),
    }),
    getBotRelatedChannels: builder.query<Channel[], { api_key: string; public_only?: boolean }>({
      query: ({ api_key, public_only = false }) => ({
        url: public_only ? `/bot?public_only=${public_only}` : `/bot`,
        headers: {
          "x-api-key": api_key,
        },
      }),
    }),
    sendMessageByBot: builder.mutation<
      number,
      {
        uid?: number;
        cid?: number;
        api_key: string;
        content: string;
        type?: ContentTypeKey;
        properties?: object;
      }
    >({
      query: ({ uid, cid, api_key, type = "text", properties, content }) => ({
        headers: {
          "x-api-key": api_key,
          "content-type": ContentTypes[type],
          "X-Properties": properties ? encodeBase64(JSON.stringify(properties)) : "",
        },
        url: cid ? `/bot/send_to_group/${cid}` : `/bot/send_to_user/${uid}`,
        method: "POST",
        body: content,
      }),
    }),
  }),
});

export const {
  useGetWidgetExtCSSQuery,
  useUpdateWidgetExtCSSMutation,
  useLazyGetServerVersionQuery,
  useGetServerVersionQuery,
  useGetGithubAuthConfigQuery,
  useUpdateGithubAuthConfigMutation,
  useGetGoogleAuthConfigQuery,
  useUpdateGoogleAuthConfigMutation,
  useGetSMTPStatusQuery,
  useSendTestEmailMutation,
  useUpdateFirebaseConfigMutation,
  useGetFirebaseConfigQuery,
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
  useGetThirdPartySecretQuery,
  useUpdateThirdPartySecretMutation,
  useCreateAdminMutation,
  useUpsertLicenseMutation,
  useCheckLicenseMutation,
  useGetLicenseQuery,
  useGetLicensePaymentUrlMutation,
  useLazyGetGeneratedLicenseQuery,
  useLazyGetBotRelatedChannelsQuery,
  useSendMessageByBotMutation,
  useUpdateFrontendUrlMutation,
  useGetFrontendUrlQuery,
  useGetAgoraConfigQuery,
  useGetAgoraStatusQuery,
  useGetAgoraChannelsQuery,
  useUpdateSystemCommonMutation,
  useLazyGetSystemCommonQuery,
  useGetSystemCommonQuery,
  useGenerateAgoraTokenMutation,
  useLazyGetAgoraUsersByChannelQuery,
  useLazyClearAllFilesQuery,
  useLazyClearAllMessagesQuery,
  useLazyGetFilesQuery,
  useGetVocespaceConfigQuery,
  useLazyGetVocespaceConfigQuery,
  useUpdateVocespaceConfigMutation,
} = serverApi;
