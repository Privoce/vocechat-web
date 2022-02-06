import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  usersVersion: 0,
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
    },
    setUsersVersion(state, action) {
      const { version } = action.payload;
      state.usersVersion = version;
    },
  },
});
export const {
  setAuthData,
  clearAuthData,
  setUsersVersion,
} = authDataSlice.actions;
export default authDataSlice.reducer;
