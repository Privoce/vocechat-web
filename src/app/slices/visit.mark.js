import { createSlice } from "@reduxjs/toolkit";
import { KEY_AFTER_MID, KEY_USERS_VERSION, KEY_UID } from "../config";
const initialState = {
  usersVersion: null,
  afterMid: null,
};
const visitMarkSlice = createSlice({
  name: "visitMark",
  initialState,
  reducers: {
    clearMark() {
      return initialState;
    },
    setMark(state, action) {
      const mark = action.payload;
      return mark;
    },
    setUsersVersion(state, action) {
      const { version } = action.payload;
      state.usersVersion = version;
      let currUid = localStorage.getItem(KEY_UID);
      localStorage.setItem(`${KEY_USERS_VERSION}_${currUid}`, version);
    },
    setAfterMid(state, action) {
      const { mid } = action.payload;
      state.afterMid = mid;
      let currUid = localStorage.getItem(KEY_UID);
      localStorage.setItem(`${KEY_AFTER_MID}_${currUid}`, mid);
    },
  },
});
export const {
  setMark,
  setUsersVersion,
  setAfterMid,
  clearMark,
} = visitMarkSlice.actions;
export default visitMarkSlice.reducer;
