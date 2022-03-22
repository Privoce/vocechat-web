import { createSlice } from "@reduxjs/toolkit";
import { KEY_REFRESH_TOKEN, KEY_TOKEN, KEY_UID, KEY_EXPIRE } from "../config";
const initialState = {
  uid: null,
  token: localStorage.getItem(KEY_TOKEN),
  expireTime: localStorage.getItem(KEY_EXPIRE) || new Date().getTime(),
  refreshToken: localStorage.getItem(KEY_REFRESH_TOKEN),
};
const emptyState = {
  uid: null,
  token: null,
  expireTime: new Date().getTime(),
  refreshToken: null,
};
const authDataSlice = createSlice({
  name: "authData",
  initialState,
  reducers: {
    setAuthData(state, action) {
      const {
        user: { uid },
        token,
        refresh_token,
        expired_in = 0,
      } = action.payload;
      state.uid = uid;
      state.token = token;
      state.refreshToken = refresh_token;
      // 当前时间往后推expire时长
      console.log("expire", expired_in);
      const expireTime = new Date().getTime() + Number(expired_in) * 1000;
      state.expireTime = expireTime;
      // set local data
      localStorage.setItem(KEY_EXPIRE, expireTime);
      localStorage.setItem(KEY_TOKEN, token);
      localStorage.setItem(KEY_REFRESH_TOKEN, refresh_token);
      localStorage.setItem(KEY_UID, uid);
    },
    resetAuthData() {
      console.log("clear auth data");
      // remove local data
      localStorage.removeItem(KEY_EXPIRE);
      localStorage.removeItem(KEY_TOKEN);
      localStorage.removeItem(KEY_REFRESH_TOKEN);
      localStorage.removeItem(KEY_UID);
      return emptyState;
    },
    setUid(state, action) {
      const uid = action.payload;
      state.uid = uid;
      console.log("set uid orginal");
    },
    updateToken(state, action) {
      const { token, refresh_token, expired_in } = action.payload;
      console.log("refresh token");
      state.token = token;
      const et = new Date().getTime() + Number(expired_in) * 1000;
      state.expireTime = et;
      state.refreshToken = refresh_token;
      localStorage.setItem(KEY_EXPIRE, et);
      localStorage.setItem(KEY_TOKEN, token);
      localStorage.setItem(KEY_REFRESH_TOKEN, refresh_token);
    },
  },
});
export const {
  setAuthData,
  resetAuthData,
  setUid,
  updateToken,
} = authDataSlice.actions;
export default authDataSlice.reducer;
