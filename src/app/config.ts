// const BASE_URL = `${location.origin}/api`;
// const BASE_URL = `https://dev.voce.chat/api`;
const BASE_URL = process.env.REACT_APP_RELEASE
  ? `${location.origin}/api`
  : `https://dev.voce.chat/api`;
export const CACHE_VERSION = `0.3.1`;
export const ContentTypes = {
  text: "text/plain",
  markdown: "text/markdown",
  file: "vocechat/file",
  archive: "vocechat/archive",
  formData: "multipart/form-data",
  json: "application/json"
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
  user: "@"
};
export const vapidKey = `BGXCn-5YRXSFw38Q9lUKJ5bibL212-yIQn1pCvthGhp6_KwA29FO1Ax_d_7if1vfC2a5wTSVO8AcZrc-Hm1aS0Y`;
export const tokenHeader = "X-API-Key";
export const FILE_SLICE_SIZE = 1000 * 200 * 8; //200kb
export const FILE_IMAGE_SIZE = 1000 * 10000 * 8; //10mb
export const KEY_LOGIN_USER = "VOCECHAT_LOGIN_USER";
export const KEY_TOKEN = "VOCECHAT_TOKEN";
export const KEY_EXPIRE = "VOCECHAT_TOKEN_EXPIRE";
export const KEY_REFRESH_TOKEN = "VOCECHAT_REFRESH_TOKEN";
export const KEY_UID = "VOCECHAT_CURR_UID";
export const KEY_DEVICE_KEY = "VOCECHAT_DEVICE_KEY";
export const KEY_USERS_VERSION = "VOCECHAT_USERS_VERSION";
export const KEY_AFTER_MID = "VOCECHAT_AFTER_MID";
export const KEY_PWA_INSTALLED = "VOCECHAT_PWA_INSTALLED";
export const KEY_LOCAL_MAGIC_TOKEN = "VOCECHAT_LOCAL_MAGIC_TOKEN";
export const Emojis = ["👍", "❤️", "😄", "👀", "👎", "🎉", "🙁", "🚀"];
export const Views = {
  item: "item",
  grid: "grid"
};
export default BASE_URL;
