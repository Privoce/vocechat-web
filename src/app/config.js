// const BASE_URL = `${location.origin}/api`;
const BASE_URL = `https://dev.rustchat.com/api`;
// TODO: Load Base URL For Easier Local Development;
export const CACHE_VERSION = `0.2.10`;
// const BASE_URL = `https://rustchat.net/api`;
// const BASE_URL = `http://localhost:3000/api`;
export const ContentTypes = {
 text: 'text/plain',
 markdown: 'text/markdown',
 file: 'rustchat/file',
 formData: 'multipart/form-data',
 json: 'application/json',
 archive: 'rustchat/archive'
};
export const firebaseConfig = {
 apiKey: 'AIzaSyDyJ6B1Ouenoha_gdGkBwIkBNStlwhlbO0',
 authDomain: 'rustchat-develop.firebaseapp.com',
 projectId: 'rustchat-develop',
 storageBucket: 'rustchat-develop.appspot.com',
 messagingSenderId: '418687074928',
 appId: '1:418687074928:web:753286adbf239f5af9eab5',
 measurementId: 'G-XV476KEC8P'
};
export const vapidKey = `BGXCn-5YRXSFw38Q9lUKJ5bibL212-yIQn1pCvthGhp6_KwA29FO1Ax_d_7if1vfC2a5wTSVO8AcZrc-Hm1aS0Y`;
export const googleClientID =
 '418687074928-naojba82n9ktf0rkvnqoor4nhr54ql1b.apps.googleusercontent.com';
// "840319286941-6ds7lbvk55eq8mjortf68cb2ll65lprt.apps.googleusercontent.com";
export const tokenHeader = 'X-API-Key';
export const FILE_SLICE_SIZE = 1000 * 200 * 8; //200kb
export const FILE_IMAGE_SIZE = 1000 * 10000 * 8; //10mb
export const KEY_TOKEN = 'RUSTCHAT_TOKEN';
export const KEY_EXPIRE = 'RUSTCHAT_TOKEN_EXPIRE';
export const KEY_REFRESH_TOKEN = 'RUSTCHAT_REFRESH_TOKEN';
export const KEY_UID = 'RUSTCHAT_CURR_UID';
export const KEY_DEVICE_KEY = 'RUSTCHAT_DEVICE_KEY';
export const KEY_USERS_VERSION = 'RUSTCHAT_USERS_VERSION';
export const KEY_AFTER_MID = 'RUSTCHAT_AFTER_MID';
export const Emojis = ['👍', '❤️', '😄', '👀', '👎', '🎉', '🙁', '🚀'];
export const Views = {
 item: 'item',
 grid: 'grid'
};
export default BASE_URL;
