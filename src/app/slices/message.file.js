import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const fileMessageSlice = createSlice({
  name: "fileMessage",
  initialState,
  reducers: {
    resetFileMessage() {
      return initialState;
    },
    fullfillFileMessage(state, action) {
      return action.payload || [];
    },
    addFileMessage(state, action) {
      const mid = action.payload;
      // 加入file message 列表
      const fidIdx = state.findIndex((fid) => fid == mid);
      if (fidIdx == -1) {
        state.unshift(+mid);
      }
    },
    removeFileMessage(state, action) {
      const mids = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      mids.forEach((id) => {
        // 从file message 列表删掉
        const fidIdx = state.findIndex((fid) => fid == id);
        if (fidIdx > -1) {
          state.splice(fidIdx, 1);
        }
      });
    },
  },
});
export const {
  removeFileMessage,
  resetFileMessage,
  fullfillFileMessage,
  addFileMessage,
} = fileMessageSlice.actions;
export default fileMessageSlice.reducer;
