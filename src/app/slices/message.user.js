import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  ids: [],
  byId: {},
};
const userMsgSlice = createSlice({
  name: "userMessage",
  initialState,
  reducers: {
    resetUserMsg() {
      return initialState;
    },
    fullfillUserMsg(state, action) {
      state.ids = Object.keys(action.payload);
      state.byId = action.payload;
    },
    addUserMsg(state, action) {
      const { id, mid, local_id } = action.payload;
      if (state.byId[id]) {
        const midExsited = state.byId[id].findIndex((id) => id == mid) > -1;
        const localMsgExsited =
          state.byId[id].findIndex((id) => id == local_id) > -1;
        if (midExsited || localMsgExsited) return;

        state.byId[id].push(+mid);
      } else {
        state.byId[id] = [+mid];
        state.ids.push(+id);
      }
    },
    removeUserMsg(state, action) {
      const { id, mid } = action.payload;
      if (state.byId[id]) {
        const idx = state.byId[id].findIndex((i) => i == mid);
        if (idx > -1) {
          // 存在 则再删除
          state.byId[id].splice(idx, 1);
        }
      }
    },
    removeUserSession(state, action) {
      const ids = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      state.ids = state.ids.filter((id) => ids.findIndex((i) => i == id) == -1);
      // ids.forEach((id) => {
      //   delete state.byId[id];
      // });
    },
  },
});
export const {
  removeUserSession,
  resetUserMsg,
  fullfillUserMsg,
  addUserMsg,
  removeUserMsg,
} = userMsgSlice.actions;
export default userMsgSlice.reducer;
