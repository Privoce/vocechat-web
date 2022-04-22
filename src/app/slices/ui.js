import { createSlice } from "@reduxjs/toolkit";
import { Views } from "../config";
const initialState = {
  online: true,
  ready: false,
  userGuide: {
    visible: false,
    step: 1,
  },
  inputMode: "text",
  menuExpand: false,
  fileListView: Views.grid,
  uploadFiles: {},
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
    updateUserGuide(state, action) {
      const obj = action.payload || {};
      Object.keys(obj).forEach((key) => {
        state.userGuide[key] = obj[key];
      });
    },
    updateUploadFiles(state, action) {
      const {
        context = "channel",
        id = null,
        operation = "add",
        ...rest
      } = action.payload;
      if (!id || !context) return;
      const _key = `${context}_${id}`;
      let files = state.uploadFiles[_key];
      switch (operation) {
        case "add":
          {
            const { data } = rest;
            const isArray = Array.isArray(data);
            console.log("add opt", data, files, isArray);
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
  },
});
export const {
  fullfillUI,
  setReady,
  updateOnline,
  updateInputMode,
  toggleMenuExpand,
  updateFileListView,
  updateUploadFiles,
  updateUserGuide,
} = uiSlice.actions;
export default uiSlice.reducer;
