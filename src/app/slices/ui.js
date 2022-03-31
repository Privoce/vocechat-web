import { createSlice } from "@reduxjs/toolkit";
import { Views } from "../config";
const initialState = {
  online: true,
  ready: false,
  inputMode: "text",
  menuExpand: false,
  setting: false,
  channelSetting: null,
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
    toggleSetting(state) {
      state.setting = !state.setting;
    },
    toggleChannelSetting(state, action) {
      console.log("toggle channel setting payload", action);
      const id = action.payload;
      state.channelSetting = state.channelSetting ? null : id;
    },
  },
});
export const {
  fullfillUI,
  setReady,
  updateOnline,
  updateInputMode,
  toggleSetting,
  toggleMenuExpand,
  toggleChannelSetting,
  updateFileListView,
} = uiSlice.actions;
export default uiSlice.reducer;
