import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  usersVersion: null,
  afterMid: null,
  token: null,
  refreshToken: null,
};
const authDataSlice = createSlice({
  name: "authData",
  initialState,
  reducers: {
    setAuthData(state, action) {
      const { user, token, refresh_token } = action.payload;
      state.user = user;
      state.token = token;
      state.refreshToken = refresh_token;
    },
    clearAuthData(state) {
      console.log("clear auth data");
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      // 清掉本地缓存auth data
      // localStorage.removeItem("AUTH_DATA");
      // state.afterMid = null;
      // state.usersVersion = null;
    },
    setUsersVersion(state, action) {
      const { version } = action.payload;
      state.usersVersion = version;
    },
    setAfterMid(state, action) {
      const { mid } = action.payload;
      state.afterMid = mid;
    },
  },
});
export const {
  setAuthData,
  clearAuthData,
  setUsersVersion,
  setAfterMid,
} = authDataSlice.actions;
export default authDataSlice.reducer;
