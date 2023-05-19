import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// import  { ContentTypes } from "../config";
// import { normalizeFileMessage } from "../../common/utils";
// import { ContentType } from "@/types/message";
import { Archive } from "@/types/resource";

export interface State {
  [key: string]: Archive;
}
const initialState: State = {};

const messageArchiveSlice = createSlice({
  name: "archiveMessage",
  initialState,
  reducers: {
    resetArchiveMessage() {
      return initialState;
    },
    fillArchiveMessage(state, action) {
      return Object.assign({ ...initialState }, action.payload);
    },
    upsertArchiveMessage(state, action: PayloadAction<{ filePath: string; data: Archive }>) {
      const { filePath, data } = action.payload;
      state[filePath] = data;
    }
  }
});

export const { resetArchiveMessage, fillArchiveMessage, upsertArchiveMessage } =
  messageArchiveSlice.actions;

export default messageArchiveSlice.reducer;
