import { createSlice } from "@reduxjs/toolkit";
// import  { KEY_REFRESH_TOKEN, KEY_TOKEN, KEY_UID } from "../config";
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
    },
    setAfterMid(state, action) {
      const { mid } = action.payload;
      state.afterMid = mid;
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
