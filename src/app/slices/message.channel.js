import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const channelMsgSlice = createSlice({
  name: "channelMessage",
  initialState,
  reducers: {
    resetChannelMsg() {
      return initialState;
    },
    fullfillChannelMsg(state, action) {
      return action.payload;
    },
    addChannelMsg(state, action) {
      const { id, mid } = action.payload;
      if (state[id]) {
        if (state[id].findIndex((id) => id == mid) > -1) return;
        state[id].push(+mid);
      } else {
        state[id] = [+mid];
      }
    },
    removeChannelMsg(state, action) {
      const { id, mid } = action.payload;
      if (state[id]) {
        const idx = state[id].findIndex((i) => i == mid);
        state[id].splice(idx, 1);
      }
    },
    removeChannelSession(state, action) {
      const ids = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      ids.forEach((id) => {
        delete state[id];
      });
    },
  },
});
export const {
  removeChannelSession,
  resetChannelMsg,
  fullfillChannelMsg,
  addChannelMsg,
  removeChannelMsg,
} = channelMsgSlice.actions;
export default channelMsgSlice.reducer;
