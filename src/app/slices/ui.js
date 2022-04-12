import { createSlice } from "@reduxjs/toolkit";
import { Views } from "../config";
const initialState = {
  online: true,
  ready: false,
  inputMode: "text",
  menuExpand: false,
  fileListView: Views.item,
};
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    fullfillUI(state, action) {
      return { ...initialState, ...action.payload };
    },
    setReady(state) {
      state.ready = true;
    },
    updateOnline(state, action) {
      state.online = action.payload;
    },
    toggleMenuExpand(state) {
      state.menuExpand = !state.menuExpand;
    },
    updateInputMode(state, action) {
      state.inputMode = action.payload;
    },
    updateFileListView(state, action) {
      state.fileListView = action.payload;
    },
  },
});
export const {
  fullfillUI,
  setReady,
  updateOnline,
  updateInputMode,
  toggleMenuExpand,
  updateFileListView,
} = uiSlice.actions;
export default uiSlice.reducer;
