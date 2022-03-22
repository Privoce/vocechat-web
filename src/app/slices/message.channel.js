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
      const { id, mid, local_id = null } = action.payload;
      if (state[id]) {
        const midExsited = state[id].findIndex((id) => id == mid) > -1;
        const localMsgExsited =
          state[id].findIndex((id) => id == local_id) > -1;
        if (midExsited || localMsgExsited) return;
        state[id].push(+mid);
      } else {
        state[id] = [+mid];
      }
    },
    removeChannelMsg(state, action) {
      const { id, mid } = action.payload;
      if (state[id]) {
        const idx = state[id].findIndex((i) => i == mid);
        if (idx > -1) {
          // 存在 则再删除
          state[id].splice(idx, 1);
        }
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
