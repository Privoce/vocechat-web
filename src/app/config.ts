import i18n from "../i18n";
import { Price } from "../types/common";

let prices: Price[] = [
  {
    type: "payment",
    limit: 999999,
    pid: "price_1MbF30GGoUDRyc3jwOg30dVQ"
  },
  {
    type: "booking"
  }
];
const official_dev = `https://dev.voce.chat`;
// const local_dev = `https://dev.voce.chat`;
const local_dev = `http://localhost:3000`;
const dev_origin = process.env.REACT_APP_OFFICIAL_DEMO ? official_dev : local_dev;

// const local_dev = `http://07333.qicp.vip:3030`;
// const local_dev = `https://im.ttt.td`;
export const BASE_ORIGIN = process.env.REACT_APP_RELEASE ? `${location.origin}` : dev_origin;
export const IS_OFFICIAL_DEMO = BASE_ORIGIN === official_dev;

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
          desc: "test price"
        },
        {
          title: "VoceChat Pro",
          price: "1",
          limit: 100,
          pid: "price_1MMNNCGGoUDRyc3jSIGIsb3C",
          desc: "test subscription price",
          type: "subscription",
          sub_dur: "year" //day month year
        }
      ]
    : ps;
};
export const PAYMENT_URL_PREFIX =
  process.env.NODE_ENV === "production"
    ? `https://vera.nicegoodthings.com`
    : `http://localhost:4000`;
export const CACHE_VERSION = `0.3.37`;
export const GuestRoutes = ["/", "/chat", "/chat/channel/:channel_id"];
export const ContentTypes = {
  text: "text/plain",
  markdown: "text/markdown",
  file: "vocechat/file",
  audio: "vocechat/audio",
  archive: "vocechat/archive",
  formData: "multipart/form-data",
  json: "application/json"
};
export const MessageTypes = {
  text: "text/plain",
  markdown: "text/markdown",
  audio: "vocechat/audio",
  file: "vocechat/file",
  archive: "vocechat/archive"
};
export const firebaseConfig = {
  apiKey: "AIzaSyCc3VuCJZgzQLIH2wrYdQzsUOc1DuZiIOA",
  authDomain: "vocechatdev.firebaseapp.com",
  projectId: "vocechatdev",
  storageBucket: "vocechatdev.appspot.com",
  messagingSenderId: "526613312184",
  appId: "1:526613312184:web:d13c92582baf470d487a4d",
  measurementId: "G-82RQ3YSCP7"
};
export const ChatPrefixes = {
  channel: "#",
  dm: "@"
};
export const vapidKey = `BOmzyZhw-DcIGYQ77mzQUVqLlcvn0bm_76P_kc7rpwRxzXNbui-JP8iPyEQYfyoxyJeq43Ud4IiIsJSMNHNujn0`;
export const tokenHeader = "X-API-Key";
export const FILE_SLICE_SIZE = 1000 * 200 * 8; //200kb
export const FILE_IMAGE_SIZE = 1000 * 10000 * 8; //10mb
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

export default BASE_URL;
