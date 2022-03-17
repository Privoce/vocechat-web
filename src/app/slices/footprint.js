import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  usersVersion: 0,
  afterMid: 0,
  readUsers: {},
  readChannels: {},
};
const footprintSlice = createSlice({
  name: "footprint",
  initialState,
  reducers: {
    resetFootprint() {
      return initialState;
    },
    fullfillFootprint(state, action) {
      const {
        usersVersion = 0,
        afterMid = 0,
        readUsers = {},
        readChannels = {},
      } = action.payload;
      return { usersVersion, afterMid, readUsers, readChannels };
    },
    updateUsersVersion(state, action) {
      const usersVersion = action.payload;
      state.usersVersion = usersVersion;
    },
    updateAfterMid(state, action) {
      const afterMid = action.payload;
      state.afterMid = afterMid;
    },
    updateReadUsers(state, action) {
      const reads = action.payload || [];
      if (reads.length == 0) return;
      reads.forEach(({ uid, mid }) => {
        state.readUsers[uid] = mid;
      });
    },
    updateReadChannels(state, action) {
      const reads = action.payload || [];
      if (reads.length == 0) return;
      reads.forEach(({ gid, mid }) => {
        state.readChannels[gid] = mid;
      });
    },
  },
});
export const {
  resetFootprint,
  fullfillFootprint,
  updateAfterMid,
  updateUsersVersion,
  updateReadChannels,
  updateReadUsers,
} = footprintSlice.actions;
export default footprintSlice.reducer;
