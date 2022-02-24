import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  channel: {},
};
const pendingMessageSlice = createSlice({
  name: "pendingMessage",
  initialState,
  reducers: {
    addPendingMessage(state, action) {
      const { type = "user", msg } = action.payload;
      const { id, mid } = msg;
      const curr = state[type][id] || {};
      curr[mid] = { ...msg, pending: true };
      state[type][id] = curr;
    },
    removePendingMessage(state, action) {
      const { id, mid, type = "user" } = action.payload;
      console.log("remove msg", type, id, mid);
      delete state[type][id][mid];
    },
  },
});
export const {
  addPendingMessage,
  removePendingMessage,
} = pendingMessageSlice.actions;
export default pendingMessageSlice.reducer;
