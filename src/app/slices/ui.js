import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuExpand: true,
};
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMenuExpand(state) {
      state.menuExpand = !state.menuExpand;
    },
  },
});
export const { toggleMenuExpand } = uiSlice.actions;
export default uiSlice.reducer;
