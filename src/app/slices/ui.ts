import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UploadFileData } from "@/hooks/useUploadFile";

export type ListView = "item" | "grid";
export interface State {
  online: boolean;
  ready: boolean;
  inputMode: "text";
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
}

const initialState: State = {
  online: true,
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
    user: null
  }
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    fillUI(state, action) {
      return { ...initialState, ...action.payload };
    },
    setReady(state) {
      state.ready = true;
    },
    updateOnline(state, action: PayloadAction<boolean>) {
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
      let files = state.uploadFiles[_key];
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
    }
  }
});

export const {
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
  updateRememberedNavs
} = uiSlice.actions;

export default uiSlice.reducer;
