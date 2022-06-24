import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  ids: string[];
  // todo: check object type
  byId: { [id: number]: any; };
}

const initialState: State = {
  ids: [],
  byId: {}
};

const userMsgSlice = createSlice({
  name: "userMessage",
  initialState,
  reducers: {
    resetUserMsg() {
      return initialState;
    },
    fullfillUserMsg(state, action: PayloadAction<{ [id: string]: any; }>) {
      state.ids = Object.keys(action.payload);
      state.byId = action.payload;
    },
    addUserMsg(state, action) {
      const { id, mid, local_id } = action.payload;
      if (state.byId[id]) {
        const midExsited = state.byId[id].findIndex((id) => id == mid) > -1;
        const localMsgExsited = state.byId[id].findIndex((id) => id == local_id) > -1;
        if (midExsited || localMsgExsited) return;

        state.byId[id].push(+mid);
        // 只要有新消息，就检查下
        if (state.ids.findIndex((uid) => uid == id) == -1) {
          state.ids.push(+id);
        }
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
    replaceUserMsg(state, action) {
      const { id, localMid, serverMid } = action.payload;
      if (state.byId[id]) {
        const localIdx = state.byId[id].findIndex((i) => i == localMid);
        if (localIdx > -1 && serverMid) {
          // 存在 则再删除
          state.byId[id].splice(localIdx, 1, serverMid);
        }
      }
    },
    removeUserSession(state, action) {
      const ids = Array.isArray(action.payload) ? action.payload : [action.payload];
      state.ids = state.ids.filter((id) => ids.findIndex((i) => i == id) == -1);
      // ids.forEach((id) => {
      //   delete state.byId[id];
      // });
    }
  }
});
export const {
  removeUserSession,
  resetUserMsg,
  fullfillUserMsg,
  addUserMsg,
  removeUserMsg,
  replaceUserMsg
} = userMsgSlice.actions;
export default userMsgSlice.reducer;
