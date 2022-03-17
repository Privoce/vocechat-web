import { createSlice } from "@reduxjs/toolkit";
const initialState = {
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
      } = action.payload;
      return { inviteLink };
    },
    updateInviteLink(state, action) {
      const { link, expire = 7 * 24 * 60 * 60 } = action.payload;
      state.inviteLink = { link, expire };
    },
  },
});
export const {
  resetServer,
  fullfillServer,
  updateInviteLink,
} = serverSlice.actions;
export default serverSlice.reducer;
