import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UploadFileData } from "@/hooks/useUploadFile";
import { ChatContext } from "@/types/common";

export type ListView = "item" | "grid";
export type SSEStatus = "connecting" | "connected" | "disconnected" | "reconnecting";
export type InputMode = "text" | "markdown";
export interface UIState {
  SSEStatus: SSEStatus;
  online: boolean;
  ready: boolean;
  msgSound: boolean;
  inputMode: InputMode;
  menuExpand: boolean;
  // todo
  fileListView: ListView;
  uploadFiles: {
    [key: string]: UploadFileData[];
  };
  selectMessages: { [key: string]: number[] | null };
  draftMarkdown: { [key: string]: any };
  draftMixedText: { [key: string]: any };
  rememberedNavs: {
    chat: null | string;
    user: null | string;
  };
  jumpToMessage: { context: ChatContext; id: number; mid: number } | null;
}

const initialState: UIState = {
  SSEStatus: "disconnected",
  online: true,
  msgSound: true,
  ready: false,
  inputMode: "text",
  menuExpand: false,
  fileListView: "grid",
  uploadFiles: {},
  selectMessages: {},
  draftMarkdown: {},
  draftMixedText: {},
  // todo: typo
  rememberedNavs: {
    chat: null,
    user: null,
  },
  jumpToMessage: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    fillUI(state, action: PayloadAction<Partial<UIState>>) {
      const {
        SSEStatus,
        ready,
        online,
        msgSound = true,
        fileListView = "item",
        ...rest
      } = action.payload;
      window.MSG_SOUND = msgSound;
      return { ...state, msgSound, fileListView, ...rest };
    },
    setReady(state, action: PayloadAction<boolean>) {
      state.ready = action.payload;
    },
    updateSSEStatus(state, action: PayloadAction<SSEStatus>) {
      state.SSEStatus = action.payload;
    },
    updateMsgSoundSetting(state, action: PayloadAction<boolean>) {
      window.MSG_SOUND = action.payload;
      state.msgSound = action.payload;
    },
    updateOnline(state, action: PayloadAction<boolean>) {
      state.online = action.payload;
    },
    toggleMenuExpand(state) {
      state.menuExpand = !state.menuExpand;
    },
    updateInputMode(state, action: PayloadAction<InputMode>) {
      state.inputMode = action.payload;
    },
    updateFileListView(state, action: PayloadAction<ListView>) {
      state.fileListView = action.payload;
    },
    updateRememberedNavs(
      state,
      action: PayloadAction<{ key?: "chat" | "user"; path?: string | null } | undefined>
    ) {
      const { key = "chat", path = null } = action.payload || {};
      state.rememberedNavs[key] = path;
    },
    updateDraftMarkdown(state, action) {
      const { key, value } = action.payload;
      state.draftMarkdown[key] = value;
    },
    updateDraftMixedText(state, action) {
      const { key, value } = action.payload;
      state.draftMixedText[key] = value;
    },
    updateUploadFiles(state, action) {
      const { context = "channel", id = null, operation = "add", ...rest } = action.payload;
      if (!id || !context) return;
      const _key = `${context}_${id}`;
      const files = state.uploadFiles[_key];
      switch (operation) {
        case "add":
          {
            const { data } = rest;
            const isArray = Array.isArray(data);
            if (files) {
              if (isArray) {
                data.forEach((item) => {
                  files.push(item);
                });
                // files = [...files, ...data];
              } else {
                files.push(rest);
              }
            } else {
              state.uploadFiles[_key] = isArray ? data : [data];
            }
          }

          break;
        case "replace":
          {
            const { data, idx } = rest;
            if (files) {
              state.uploadFiles[_key][idx] = data;
            }
          }

          break;

        case "reset":
          {
            state.uploadFiles[_key] = [];
          }

          break;
        case "remove":
          {
            const { index } = rest;
            const file = files[index];
            if (file) {
              files.splice(index, 1);
              URL.revokeObjectURL(file.url);
            }
          }

          break;

        case "update":
          {
            const { index, name } = rest;
            const file = files[index];
            if (file) {
              file.name = name;
            }
          }

          break;

        default:
          break;
      }
    },
    updateSelectMessages(state, action) {
      const { context = "channel", id = null, operation = "add", data = null } = action.payload;
      let currData = state.selectMessages[`${context}_${id}`];
      switch (operation) {
        case "add": {
          currData = currData ? [...currData, data] : [data];
          break;
        }
        case "remove": {
          if (currData) {
            currData = currData.filter((mid) => mid != data);
          }
          break;
        }
        case "reset": {
          currData = null;
          break;
        }
        default:
          break;
      }
      state.selectMessages[`${context}_${id}`] = currData;
    },
    setJumpToMessage(state, action: PayloadAction<{ context: ChatContext; id: number; mid: number }>) {
      state.jumpToMessage = action.payload;
    },
    clearJumpToMessage(state) {
      state.jumpToMessage = null;
    },
  },
});

export const {
  updateSSEStatus,
  fillUI,
  setReady,
  updateOnline,
  updateInputMode,
  toggleMenuExpand,
  updateFileListView,
  updateUploadFiles,
  updateSelectMessages,
  updateDraftMarkdown,
  updateDraftMixedText,
  updateRememberedNavs,
  updateMsgSoundSetting,
  setJumpToMessage,
  clearJumpToMessage,
} = uiSlice.actions;

export default uiSlice.reducer;
