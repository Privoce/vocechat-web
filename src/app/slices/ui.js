import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  online: true,
  ready: false,
  inputMode: "text",
  menuExpand: false,
  setting: false,
  channelSetting: null,
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
} = uiSlice.actions;
export default uiSlice.reducer;
