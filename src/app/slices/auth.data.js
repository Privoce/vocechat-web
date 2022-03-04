import { createSlice } from "@reduxjs/toolkit";
import BASE_URL, { KEY_REFRESH_TOKEN, KEY_TOKEN, KEY_UID } from "../config";
import { getNonNullValues } from "../../common/utils";
const initialState = {
  user: null,
  token: localStorage.getItem(KEY_TOKEN),
  refreshToken: localStorage.getItem(KEY_REFRESH_TOKEN),
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
      // set local data
      localStorage.setItem(KEY_TOKEN, token);
      localStorage.setItem(KEY_REFRESH_TOKEN, refresh_token);
      localStorage.setItem(KEY_UID, user.uid);
    },
    setUserData(state, action) {
      const user = action.payload;
      state.user = user;
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
      // remove local data
      localStorage.removeItem(KEY_TOKEN);
      localStorage.removeItem(KEY_REFRESH_TOKEN);
      localStorage.removeItem(KEY_UID);
    },
    updateToken(state, action) {
      const { token, refresh_token } = action.payload;
      console.log("refresh token");
      state.token = token;
      state.refreshToken = refresh_token;
      localStorage.setItem(KEY_TOKEN, token);
      localStorage.setItem(KEY_REFRESH_TOKEN, refresh_token);
    },
  },
});
export const {
  updateToken,
  setAuthData,
  setUserData,
  clearAuthData,
  updateLoginedUserByLogs,
} = authDataSlice.actions;
export default authDataSlice.reducer;
