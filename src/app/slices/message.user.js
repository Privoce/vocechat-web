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
      const { id, mid } = action.payload;
      if (state.byId[id]) {
        if (state.byId[id].findIndex((id) => id == mid) > -1) return;
        state.byId[id].push(mid);
      } else {
        state.byId[id] = [mid];
        state.ids.push(id);
      }
    },
    removeUserMsg(state, action) {
      const { id, mid } = action.payload;
      if (state.byId[id]) {
        const idx = state.byId[id].findIndex((i) => i == mid);
        state.byId[id].splice(idx, 1);
      }
    },
  },
});
export const {
  resetUserMsg,
  fullfillUserMsg,
  addUserMsg,
  removeUserMsg,
} = userMsgSlice.actions;
export default userMsgSlice.reducer;
