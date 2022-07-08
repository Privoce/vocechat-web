import { createSlice } from "@reduxjs/toolkit";
import BASE_URL, { ContentTypes } from "../config";
import { isImage } from "../../common/utils";

export interface State {
  replying: {};
}

const initialState: State = {
  replying: {}
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    resetMessage() {
      return initialState;
    },
    fillMessage(state, action) {
      return Object.assign({ ...initialState }, action.payload);
    },
    updateMessage(state, action) {
      const { mid, ...rest } = action.payload;
      state[mid] = { ...state[mid], ...rest };
    },
    addMessage(state, action) {
      const data = action.payload;
      const { mid, sending, content_type, content, properties = {} } = data;
      // 如果是正发送，并且已存在，则不覆盖
      if (sending && state[mid]) return;
      const isFile = content_type == ContentTypes.file;
      // image
      const props = properties ?? {};
      const isPic = isImage(props.content_type, props.size);
      if (isFile) {
        if (!sending) {
          data.file_path = content;
          data.content = `${BASE_URL}/resource/file?file_path=${encodeURIComponent(
            data.file_path
          )}`;
          data.download = `${BASE_URL}/resource/file?file_path=${encodeURIComponent(
            data.file_path
          )}&download=true`;
          data.thumbnail = isPic
            ? `${BASE_URL}/resource/file?file_path=${encodeURIComponent(
                data.file_path
              )}&thumbnail=true`
            : "";
        } else if (isPic) {
          data.thumbnail = content;
        }
      }
      state[mid] = data;
    },
    removeMessage(state, action) {
      const mids = Array.isArray(action.payload) ? action.payload : [action.payload];
      mids.forEach((id) => {
        delete state[id];
      });
    },
    addReplyingMessage(state, action) {
      const { key, mid } = action.payload;
      console.log("to ", key, mid);
      state.replying[key] = mid;
    },
    removeReplyingMessage(state, action) {
      const key = action.payload;
      if (state.replying[key]) {
        delete state.replying[key];
      }
    }
  }
});

export const {
  resetMessage,
  fillMessage,
  setMessage,
  updateMessage,
  addMessage,
  removeMessage,
  addReplyingMessage,
  removeReplyingMessage
} = messageSlice.actions;

export default messageSlice.reducer;
