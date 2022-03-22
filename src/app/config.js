// const BASE_URL = `${location.origin}/api`;
const BASE_URL = `https://dev.rustchat.com/api`;
export const CACHE_VERSION = `0.2.1`;
// const BASE_URL = `https://rustchat.net/api`;
export const ContentTypes = {
  text: "text/plain",
  markdown: "text/markdown",
  image: "image/png",
  imageJPG: "image/jpeg",
  file: "rustchat/file",
  json: "application/json",
};
export const googleClientID =
  "418687074928-naojba82n9ktf0rkvnqoor4nhr54ql1b.apps.googleusercontent.com";
// "840319286941-6ds7lbvk55eq8mjortf68cb2ll65lprt.apps.googleusercontent.com";
export const tokenHeader = "X-API-Key";
export const KEY_TOKEN = "RUSTCHAT_TOKEN";
export const KEY_EXPIRE = "RUSTCHAT_TOKEN_EXPIRE";
export const KEY_REFRESH_TOKEN = "RUSTCHAT_REFRESH_TOKEN";
export const KEY_UID = "RUSTCHAT_CURR_UID";
export const KEY_DEVICE_KEY = "RUSTCHAT_DEVICE_KEY";
export const KEY_USERS_VERSION = "RUSTCHAT_USERS_VERSION";
export const KEY_AFTER_MID = "RUSTCHAT_AFTER_MID";
export const Emojis = ["👍", "❤️", "😄", "👀", "👎", "🎉", "🙁", "🚀"];

export default BASE_URL;
