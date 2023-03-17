import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface State {
  ids: number[];
  // todo: check object type
  byId: { [id: number]: number[] };
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
    fillUserMsg(state, action: PayloadAction<{ [id: number]: any }>) {
      state.ids = Object.keys(action.payload).map((k) => +k);
      state.byId = action.payload;
    },
    addUserMsg(state, action: PayloadAction<{ id: number; mid: number; local_id?: number }>) {
      const { id, mid, local_id } = action.payload;
      if (state.byId[id]) {
        const midExisted = state.byId[id].findIndex((id: number) => id == mid) > -1;
        const localMsgExisted = state.byId[id].findIndex((id: number) => id == local_id) > -1;
        if (midExisted || localMsgExisted) return;
        // 每次入库，都排序
        const newArr = [...state.byId[id], +mid].sort((a, b) => a - b);
        state.byId[id] = newArr;
        // 只要有新消息，就检查下
        if (state.ids.findIndex((uid) => uid == id) == -1) {
          state.ids.push(+id);
        }
      } else {
        state.byId[id] = [+mid];
        state.ids.push(+id);
      }
    },
    removeUserMsg(state, action: PayloadAction<{ id: number, mid: number }>) {
      const { id, mid } = action.payload;
      if (state.byId[id]) {
        const idx = state.byId[id].findIndex((i: number) => i == mid);
        if (idx > -1) {
          // 存在 则再删除
          state.byId[id].splice(idx, 1);
        }
      }
    },
    replaceUserMsg(state, action) {
      const { id, localMid, serverMid } = action.payload;
      if (state.byId[id]) {
        const localIdx = state.byId[id].findIndex((i: number) => i == localMid);
        if (localIdx > -1 && serverMid) {
          // 存在 则再删除
          state.byId[id].splice(localIdx, 1, serverMid);
        }
      }
    },
    removeUserSession(state, action: PayloadAction<number | number[]>) {
      const ids = Array.isArray(action.payload) ? action.payload : [action.payload];
      state.ids = state.ids.filter((id) => ids.findIndex((i) => i == id) == -1);
    }
  }
});
export const {
  removeUserSession,
  resetUserMsg,
  fillUserMsg,
  addUserMsg,
  removeUserMsg,
  replaceUserMsg
} = userMsgSlice.actions;
export default userMsgSlice.reducer;
