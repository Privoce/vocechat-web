import { createSlice } from "@reduxjs/toolkit";
import {
  msgReaction,
  msgAdd,
  msgSetRead,
  msgUpdate,
  msgDelete,
} from "./message.handler";
const initialState = {};
const userMsgSlice = createSlice({
  name: "userMessage",
  initialState,
  reducers: {
    clearUserMsg() {
      return initialState;
    },
    initUserMsg(state, action) {
      return action.payload;
    },
    addUserMsg(state, action) {
      msgAdd(state, action.payload);
    },
    likeUserMsg(state, action) {
      msgReaction(state, action.payload);
    },
    updateUserMsg(state, action) {
      msgUpdate(state, action.payload);
    },
    deleteUserMsg(state, action) {
      msgDelete(state, action.payload);
    },
    setUserMsgRead(state, action) {
      msgSetRead(state, action.payload);
    },
  },
});
export const {
  updateUserMsg,
  likeUserMsg,
  deleteUserMsg,
  clearUserMsg,
  initUserMsg,
  addUserMsg,
  setUserMsgRead,
} = userMsgSlice.actions;
export default userMsgSlice.reducer;
