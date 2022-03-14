import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  replying: {},
};
const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    resetMessage() {
      return initialState;
    },
    fullfillMessage(state, action) {
      return action.payload;
    },
    updateMessage(state, action) {
      const { mid, ...rest } = action.payload;
      state[mid] = { ...state[mid], ...rest };
    },
    readMessage(state, action) {
      const mids = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      mids.forEach((id) => {
        if (state[id]) {
          state[id].read = true;
        }
      });
    },
    addMessage(state, action) {
      const { mid, sending } = action.payload;
      // 如果是正发送，并且已存在，则不覆盖
      if (sending && state[mid]) return;
      state[mid] = action.payload;
    },
    removeMessage(state, action) {
      const mid = action.payload;
      delete state[mid];
    },
    addReplyingMessage(state, action) {
      const { id, mid } = action.payload;
      console.log("to ", id, mid);
      state.replying[id] = mid;
    },
    removeReplyingMessage(state, action) {
      const id = action.payload;
      if (state.replying[id]) {
        delete state.replying[id];
      }
    },
  },
});
export const {
  resetMessage,
  fullfillMessage,
  setMessage,
  updateMessage,
  readMessage,
  addMessage,
  removeMessage,
  addReplyingMessage,
  removeReplyingMessage,
} = messageSlice.actions;
export default messageSlice.reducer;
