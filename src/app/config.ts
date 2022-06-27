// const BASE_URL = `${location.origin}/api`;
const BASE_URL = `https://dev.rustchat.com/api`;
export const CACHE_VERSION = `0.3.0`;
export const ContentTypes = {
  text: "text/plain",
  markdown: "text/markdown",
  file: "rustchat/file",
  archive: "rustchat/archive",
  formData: "multipart/form-data",
  json: "application/json"
};
export const firebaseConfig = {
  apiKey: "AIzaSyDyJ6B1Ouenoha_gdGkBwIkBNStlwhlbO0",
  authDomain: "rustchat-develop.firebaseapp.com",
  projectId: "rustchat-develop",
  storageBucket: "rustchat-develop.appspot.com",
  messagingSenderId: "418687074928",
  appId: "1:418687074928:web:753286adbf239f5af9eab5",
  measurementId: "G-XV476KEC8P"
};
export const ChatPrefixs = {
  channel: "#",
  user: "@"
};
export const vapidKey = `BGXCn-5YRXSFw38Q9lUKJ5bibL212-yIQn1pCvthGhp6_KwA29FO1Ax_d_7if1vfC2a5wTSVO8AcZrc-Hm1aS0Y`;
// "840319286941-6ds7lbvk55eq8mjortf68cb2ll65lprt.apps.googleusercontent.com";
export const tokenHeader = "X-API-Key";
export const FILE_SLICE_SIZE = 1000 * 200 * 8; //200kb
export const FILE_IMAGE_SIZE = 1000 * 10000 * 8; //10mb
export const KEY_TOKEN = "VOCECHAT_TOKEN";
export const KEY_EXPIRE = "VOCECHAT_TOKEN_EXPIRE";
export const KEY_REFRESH_TOKEN = "VOCECHAT_REFRESH_TOKEN";
export const KEY_UID = "VOCECHAT_CURR_UID";
export const KEY_DEVICE_KEY = "VOCECHAT_DEVICE_KEY";
export const KEY_USERS_VERSION = "VOCECHAT_USERS_VERSION";
export const KEY_AFTER_MID = "VOCECHAT_AFTER_MID";
export const KEY_PWA_INSTALLED = "VOCECHAT_PWA_INSTALLED";
export const Emojis = ["👍", "❤️", "😄", "👀", "👎", "🎉", "🙁", "🚀"];
export const Views = {
  item: "item",
  grid: "grid"
};
export default BASE_URL;
