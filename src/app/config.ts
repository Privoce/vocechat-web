import i18n from "../i18n";
import { Price } from "../types/common";

const prices: Price[] = [
  {
    type: "payment",
    limit: 999999,
    pid: "price_1MbF30GGoUDRyc3jwOg30dVQ",
  },
  {
    type: "booking",
  },
];

const official_dev = `https://dev.voce.chat`;
const local_dev = process.env.REACT_APP_VOCECHAT_ORIGIN_URL;
const dev_origin = process.env.REACT_APP_OFFICIAL_DEMO ? official_dev : local_dev;
export const BASE_ORIGIN = process.env.REACT_APP_RELEASE ? `${location.origin}` : dev_origin;
export const IS_OFFICIAL_DEMO = process.env.REACT_APP_OFFICIAL_DEMO;

const BASE_URL = `${BASE_ORIGIN}/api`;
export const getLicensePriceList = () => {
  const ps = prices.map((p, idx) => {
    switch (idx) {
      // pro
      case 0:
        {
          p.title = i18n.t("price.pro.title");
          p.desc = i18n.t("price.pro.desc");
          p.price = i18n.t("price.pro.price");
        }
        break;
      // supreme
      case 1:
        {
          p.title = i18n.t("price.supreme.title");
          p.desc = i18n.t("price.supreme.desc");
          p.price = i18n.t("price.supreme.price");
        }
        break;

      default:
        break;
    }
    return p;
  });
  return process.env.NODE_ENV === "development"
    ? // 开发环境加入两个测试价格
      [
        ...ps,
        {
          type: "payment",
          price: "1",
          title: "Test VoceChat Enterprise",
          limit: 99999,
          pid: "price_1LkQGpGGoUDRyc3jGTh3GYHw",
          desc: "test price",
        },
        {
          title: "VoceChat Pro",
          price: "1",
          limit: 100,
          pid: "price_1MMNNCGGoUDRyc3jSIGIsb3C",
          desc: "test subscription price",
          type: "subscription",
          sub_dur: "year", //day month year
        },
      ]
    : ps;
};
export const PAYMENT_URL_PREFIX =
  process.env.NODE_ENV === "production"
    ? `https://vera.nicegoodthings.com`
    : `http://localhost:4000`;
export const CACHE_VERSION = `0.3.37`;
export const WIDGET_USER_PWD = `123123`;
export const GuestRoutes = ["/", "/chat", "/chat/channel/:channel_id"];
export const ContentTypes = {
  text: "text/plain",
  markdown: "text/markdown",
  file: "vocechat/file",
  audio: "vocechat/audio",
  archive: "vocechat/archive",
  formData: "multipart/form-data",
  json: "application/json",
};
export const MessageTypes = {
  text: "text/plain",
  markdown: "text/markdown",
  audio: "vocechat/audio",
  file: "vocechat/file",
  archive: "vocechat/archive",
};
export const firebaseConfig = {
  apiKey: "AIzaSyCc3VuCJZgzQLIH2wrYdQzsUOc1DuZiIOA",
  authDomain: "vocechatdev.firebaseapp.com",
  projectId: "vocechatdev",
  storageBucket: "vocechatdev.appspot.com",
  messagingSenderId: "526613312184",
  appId: "1:526613312184:web:d13c92582baf470d487a4d",
  measurementId: "G-82RQ3YSCP7",
};
export const ChatPrefixes = {
  channel: "#",
  dm: "@",
};
export const vapidKey = `BOmzyZhw-DcIGYQ77mzQUVqLlcvn0bm_76P_kc7rpwRxzXNbui-JP8iPyEQYfyoxyJeq43Ud4IiIsJSMNHNujn0`;
export const tokenHeader = "X-API-Key";
export const KEY_SERVER_VERSION = "VC_SERVER_VERSION"; //
export const FILE_SLICE_SIZE = 1000 * 1000; //
export const FILE_IMAGE_SIZE = 1000 * 10000 * 8; //10mb
export const KEY_SET_EMAIL_MSG_TIP = "SET_EMAIL_MSG_TIP";
export const KEY_MOBILE_APP_TIP = "MOBILE_APP_TIP";
export const KEY_LOGIN_USER = "VOCECHAT_LOGIN_USER";
export const KEY_TOKEN = "VOCECHAT_TOKEN";
export const KEY_EXPIRE = "VOCECHAT_TOKEN_EXPIRE";
export const KEY_REFRESH_TOKEN = "VOCECHAT_REFRESH_TOKEN";
export const KEY_UID = "VOCECHAT_CURR_UID";
export const KEY_DEVICE_ID = "VOCECHAT_DEVICE_KEY";
export const KEY_DEVICE_TOKEN = "VOCECHAT_DEVICE_TOKEN";
export const KEY_USERS_VERSION = "VOCECHAT_USERS_VERSION";
export const KEY_AFTER_MID = "VOCECHAT_AFTER_MID";
export const KEY_PWA_INSTALLED = "VOCECHAT_PWA_INSTALLED";
export const KEY_LOCAL_MAGIC_TOKEN = "VOCECHAT_LOCAL_MAGIC_TOKEN";
export const KEY_LOCAL_TRY_PATH = "VOCECHAT_TRY_PATH";
export const Emojis = ["👍", "❤️", "😄", "👀", "👎", "🎉", "🙁", "🚀"];
export const getInviteLinkExpireList = () => [
  {
    label: i18n.t("auth:invite_expire.min30"),
    value: 30 * 60,
  },
  {
    label: i18n.t("auth:invite_expire.h1"),
    value: 60 * 60,
  },
  {
    label: i18n.t("auth:invite_expire.h6"),
    value: 6 * 60 * 60,
  },
  {
    label: i18n.t("auth:invite_expire.h12"),
    value: 12 * 60 * 60,
  },
  {
    label: i18n.t("auth:invite_expire.d1"),
    value: 24 * 60 * 60,
  },
  {
    label: i18n.t("auth:invite_expire.d7"),
    value: 7 * 24 * 60 * 60,
  },
  {
    label: i18n.t("auth:invite_expire.d30"),
    value: 30 * 24 * 60 * 60,
  },
];
export const getInviteLinkTimesList = () => [
  {
    label: i18n.t("auth:invite_times.no_limit"),
    value: 10000000,
  },
  {
    label: i18n.t("auth:invite_times.time1"),
    value: 1,
  },
  {
    label: i18n.t("auth:invite_times.times5"),
    value: 5,
  },
  {
    label: i18n.t("auth:invite_times.times10"),
    value: 10,
  },
  {
    label: i18n.t("auth:invite_times.times25"),
    value: 25,
  },
  {
    label: i18n.t("auth:invite_times.times50"),
    value: 50,
  },
  {
    label: i18n.t("auth:invite_times.times100"),
    value: 100,
  },
];
export const getEmailNotifyDelayList = () => [
  {
    label: i18n.t("setting:overview.server_msg_notify.delay_5_min"),
    value: 5 * 60,
  },
  {
    label: i18n.t("setting:overview.server_msg_notify.delay_15_min"),
    value: 15 * 60,
  },
  {
    label: i18n.t("setting:overview.server_msg_notify.delay_1_hour"),
    value: 60 * 60,
  },
  {
    label: i18n.t("setting:overview.server_msg_notify.delay_3_hour"),
    value: 3 * 60 * 60,
  },
  {
    label: i18n.t("setting:overview.server_msg_notify.delay_12_hour"),
    value: 12 * 60 * 60,
  },
];
export const KEY_ADMIN_ONLY_INVITE = `admin_only_can_invite`;
export const KEY_ADMIN_SEE_CHANNEL_MEMBERS = `only_admin_can_see_channel_members`;
export const KEY_MSG_URL_PREVIEW = `enable_msg_url_preview`;
export default BASE_URL;
