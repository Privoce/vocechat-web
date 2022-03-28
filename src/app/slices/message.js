import { createSlice } from "@reduxjs/toolkit";
import BASE_URL, { ContentTypes } from "../config";
const initialState = {
  replying: {},
  fileMessages: [],
};
const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    resetMessage() {
      return initialState;
    },
    fullfillMessage(state, action) {
      return Object.assign({ ...initialState }, action.payload);
    },
    updateMessage(state, action) {
      const { mid, ...rest } = action.payload;
      state[mid] = { ...state[mid], ...rest };
    },
    readMessage(state, action) {
      const mids = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      mids.forEach((id) => {
        if (state[id]) {
          state[id].read = true;
        }
      });
    },
    addMessage(state, action) {
      const data = action.payload;
      const { mid, sending, content_type, content } = data;
      // 如果是正发送，并且已存在，则不覆盖
      if (sending && state[mid]) return;
      const isImage = content_type.startsWith("image");
      const isFile = content_type == ContentTypes.file;
      // file
      if (!sending && isFile) {
        data.file_path = content;
        data.content = `${BASE_URL}/resource/file?file_path=${encodeURIComponent(
          data.file_path
        )}`;
        // 加入file message 列表
        state.fileMessages.unshift(mid);
      }
      // image
      if (!sending && isImage) {
        data.image_id = content;
        data.content = `${BASE_URL}/resource/image?id=${encodeURIComponent(
          data.image_id
        )}`;
        data.thumbnail = `${BASE_URL}/resource/thumbnail?id=${encodeURIComponent(
          data.image_id
        )}`;
      }
      state[mid] = data;
    },
    removeMessage(state, action) {
      const mids = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      mids.forEach((id) => {
        delete state[id];
        // 从file message 列表删掉
        const fidIdx = state.fileMessages.findIndex((fid) => fid == id);
        if (fidIdx > -1) {
          state.fileMessages.splice(fidIdx, 1);
        }
      });
    },
    addReplyingMessage(state, action) {
      const { id, mid } = action.payload;
      console.log("to ", id, mid);
      state.replying[id] = mid;
    },
    removeReplyingMessage(state, action) {
      const id = action.payload;
      if (state.replying[id]) {
        delete state.replying[id];
      }
    },
  },
});
export const {
  resetMessage,
  fullfillMessage,
  setMessage,
  updateMessage,
  readMessage,
  addMessage,
  removeMessage,
  addReplyingMessage,
  removeReplyingMessage,
} = messageSlice.actions;
export default messageSlice.reducer;
