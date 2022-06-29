import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  KEY_EXPIRE,
  KEY_PWA_INSTALLED,
  KEY_LOGIN_USER,
  KEY_REFRESH_TOKEN,
  KEY_TOKEN,
  KEY_UID
} from "../config";
import { AuthData, AuthToken, User } from "../../types/auth";

interface State {
  initialized: boolean;
  user: User | undefined;
  token: string | null;
  expireTime: number;
  refreshToken: string | null;
}
const loginUser = localStorage.getItem(KEY_LOGIN_USER) || "";
const initialState: State = {
  initialized: true,
  user: loginUser ? JSON.parse(loginUser) : undefined,
  token: localStorage.getItem(KEY_TOKEN),
  expireTime: Number(localStorage.getItem(KEY_EXPIRE) || +new Date()),
  refreshToken: localStorage.getItem(KEY_REFRESH_TOKEN)
};

const emptyState: State = {
  initialized: true,
  user: undefined,
  token: null,
  expireTime: +new Date(),
  refreshToken: null
};

const authDataSlice = createSlice({
  name: "authData",
  initialState,
  reducers: {
    setAuthData(state, { payload }: PayloadAction<AuthData>) {
      const { initialized = true, user, token, refresh_token, expired_in = 0 } = payload;
      const { uid } = user;
      state.initialized = initialized;
      state.user = user;
      state.token = token;
      state.refreshToken = refresh_token;
      // 当前时间往后推expire时长
      const expireTime = +new Date() + Number(expired_in) * 1000;
      state.expireTime = expireTime;
      // set local data
      localStorage.setItem(KEY_LOGIN_USER, JSON.stringify(user));
      localStorage.setItem(KEY_EXPIRE, `${expireTime}`);
      localStorage.setItem(KEY_TOKEN, token);
      localStorage.setItem(KEY_REFRESH_TOKEN, refresh_token);
      localStorage.setItem(KEY_UID, `${uid}`);
    },
    resetAuthData() {
      // remove local data
      localStorage.removeItem(KEY_EXPIRE);
      localStorage.removeItem(KEY_TOKEN);
      localStorage.removeItem(KEY_REFRESH_TOKEN);
      localStorage.removeItem(KEY_UID);
      localStorage.removeItem(KEY_PWA_INSTALLED);

      return emptyState;
    },
    updateInitialized(state, action: PayloadAction<boolean>) {
      state.initialized = action.payload;
    },
    updateToken(state, action: PayloadAction<AuthToken>) {
      const { token, refresh_token, expired_in } = action.payload;
      state.token = token;
      const et = +new Date() + Number(expired_in) * 1000;
      state.expireTime = et;
      state.refreshToken = refresh_token;
      localStorage.setItem(KEY_EXPIRE, `${et}`);
      localStorage.setItem(KEY_TOKEN, token);
      localStorage.setItem(KEY_REFRESH_TOKEN, refresh_token);
    }
  }
});

export const { updateInitialized, setAuthData, resetAuthData, updateToken } = authDataSlice.actions;
export default authDataSlice.reducer;
