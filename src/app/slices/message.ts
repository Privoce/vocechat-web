import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import BASE_URL, { ContentTypes } from "../config";
import { isImage } from "../../common/utils";
export interface MessagePayload {
  mid: number;
  sending: boolean;
  content_type: string;
  content: string;
  properties?: {
    content_type: string;
    size: number;
  };
  file_path?: string;
  download?: string;
  thumbnail?: string;
}
export interface State {
  [key: number]: MessagePayload;
  replying: {
    [key: string | number]: number;
  };
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
    updateMessage(state, action: PayloadAction<{ mid: number; [key: string | number]: any }>) {
      const { mid, ...rest } = action.payload;
      state[mid] = { ...state[mid], ...rest };
    },
    addMessage(state, action: PayloadAction<MessagePayload>) {
      const data = action.payload;
      const { mid, sending, content_type, content, properties } = data;
      // 如果是正发送，并且已存在，则不覆盖
      if (sending && state[mid]) return;
      const isFile = content_type == ContentTypes.file;
      // image
      const props = properties;
      const isPic = isImage(props?.content_type, props?.size);
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
    removeMessage(state, action: PayloadAction<number | number[]>) {
      const mids = Array.isArray(action.payload) ? action.payload : [action.payload];
      mids.forEach((id: number) => {
        delete state[id];
      });
    },
    addReplyingMessage(state, action: PayloadAction<{ key: string | number; mid: number }>) {
      const { key, mid } = action.payload;
      console.log("to ", key, mid);
      state.replying[key] = mid;
    },
    removeReplyingMessage(state, action: PayloadAction<string | number>) {
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
  updateMessage,
  addMessage,
  removeMessage,
  addReplyingMessage,
  removeReplyingMessage
} = messageSlice.actions;

export default messageSlice.reducer;
