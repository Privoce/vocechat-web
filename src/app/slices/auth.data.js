import { createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../config";
import { getNonNullValues } from "../../common/utils";
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
    updateLoginedUserByLogs(state, action) {
      const logs = action.payload;
      logs.forEach(({ action, uid, ...rest }) => {
        switch (action) {
          case "update":
            {
              const vals = getNonNullValues(rest);
              console.log("update vals", vals);
              if (Object.keys(vals).includes("avatar_updated_at")) {
                vals.avatar = `${BASE_URL}/resource/avatar?uid=${uid}&t=${vals.avatar_updated_at}`;
              }
              state.user = { ...state.user, ...vals };
            }

            break;

          default:
            break;
        }
      });
    },
    clearAuthData(state) {
      console.log("clear auth data");
      state.user = null;
      state.token = null;
      state.refreshToken = null;
    },
    updateToken(state, action) {
      const { token, refresh_token } = action.payload;
      console.log("refresh token");
      state.token = token;
      state.refreshToken = refresh_token;
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
  updateToken,
  setAuthData,
  clearAuthData,
  setUsersVersion,
  setAfterMid,
  updateLoginedUserByLogs,
} = authDataSlice.actions;
export default authDataSlice.reducer;
