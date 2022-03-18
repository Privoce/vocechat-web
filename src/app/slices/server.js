import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name: "",
  description: "",
  logo: "",
  inviteLink: {
    link: "",
    expire: 0,
  },
};
const serverSlice = createSlice({
  name: "server",
  initialState,
  reducers: {
    resetServer() {
      return initialState;
    },
    fullfillServer(state, action) {
      const {
        inviteLink = {
          link: "",
          expire: 0,
        },
        name = "",
        description = "",
      } = action.payload || {};
      return { name, description, inviteLink };
    },
    updateInfo(state, action) {
      const values = action.payload || {};
      Object.keys(values).forEach((_key) => {
        state[_key] = values[_key];
      });
    },
    updateInviteLink(state, action) {
      const { link, expire = 7 * 24 * 60 * 60 } = action.payload;
      state.inviteLink = { link, expire };
    },
  },
});
export const {
  updateInfo,
  resetServer,
  fullfillServer,
  updateInviteLink,
} = serverSlice.actions;
export default serverSlice.reducer;
