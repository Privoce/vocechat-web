import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reply: {},
  user: {},
  channel: {},
};
const pendingMessageSlice = createSlice({
  name: "pendingMessage",
  initialState,
  reducers: {
    clearPendingMsg() {
      return initialState;
    },
    addPendingMessage(state, action) {
      const { type = "user", msg } = action.payload;
      const { id, mid } = msg;
      const curr = state[type][id] || {};
      curr[mid] = { ...msg, pending: true };
      state[type][id] = curr;
    },
    setReplyMessage(state, action) {
      const { id, msg } = action.payload;
      console.log("reply to ", id, msg);
      state.reply[id] = msg;
    },
    removeReplyMessage(state, action) {
      const id = action.payload;
      if (state.reply[id]) {
        delete state.reply[id];
      }
    },
    removePendingMessage(state, action) {
      const { id, mid, type = "user" } = action.payload;
      console.log("remove msg", type, id, mid);
      delete state[type][id][mid];
    },
  },
});
export const {
  clearPendingMsg,
  addPendingMessage,
  removePendingMessage,
  removeReplyMessage,
  setReplyMessage,
} = pendingMessageSlice.actions;
export default pendingMessageSlice.reducer;
