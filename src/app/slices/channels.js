import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
const channelsSlice = createSlice({
  name: `channels`,
  initialState,
  reducers: {
    setChannels(state, action) {
      console.log("set channels store", state);
      const chs = action.payload || [];
      return Object.fromEntries(
        chs.map((c) => {
          const { gid, ...rest } = c;
          return [gid, rest];
        })
      );
    },
    addChannel(state, action) {
      // console.log("set channels store", action);
      const ch = action.payload;
      const { gid, ...rest } = ch;
      state[gid] = rest;
    },
    deleteChannel(state, action) {
      const gid = action.payload;
      delete state[gid];
    },
    // clearAuthData(state) {
    //   console.log("clear auth data");
    //   state.user = null;
    //   state.token = null;
    //   state.refreshToken = null;
    // },
  },
});
export const { setChannels, addChannel, deleteChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
