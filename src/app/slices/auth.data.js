import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
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
  },
});
export const { setAuthData } = authDataSlice.actions;
export default authDataSlice.reducer;
