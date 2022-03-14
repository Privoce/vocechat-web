import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  usersVersion: 0,
  afterMid: 0,
};
const footprintSlice = createSlice({
  name: "footprint",
  initialState,
  reducers: {
    resetFootprint() {
      return initialState;
    },
    fullfillFootprint(state, action) {
      return action.payload;
    },
    updateUsersVersion(state, action) {
      const usersVersion = action.payload;
      state.usersVersion = usersVersion;
    },
    updateAfterMid(state, action) {
      const afterMid = action.payload;
      state.afterMid = afterMid;
    },
  },
});
export const {
  resetFootprint,
  fullfillFootprint,
  updateAfterMid,
  updateUsersVersion,
} = footprintSlice.actions;
export default footprintSlice.reducer;
