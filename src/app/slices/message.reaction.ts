import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// todo: check entity type
export interface State {
  [mid: number]:
    | {
        [reaction: string]: number[];
      }
    | undefined;
}

const initialState: State = {};
const reactionMessageSlice = createSlice({
  name: "reactionMessage",
  initialState,
  reducers: {
    resetReactionMessage() {
      return initialState;
    },
    fillReactionMessage(state, action: PayloadAction<State>) {
      return action.payload;
    },
    removeReactionMessage(state, action: PayloadAction<number | number[]>) {
      const mids = Array.isArray(action.payload) ? action.payload : [action.payload];
      mids.forEach((id) => {
        delete state[id];
      });
    },
    toggleReactionMessage(
      state,
      action: PayloadAction<{ from_uid: number; mid: number; rid: number; action: string }>
    ) {
      // rid: reaction's mid, mid: which message append to
      const { from_uid, mid, rid, action: reaction } = action.payload;
      const ridExisted = state[rid] || false;
      // 已经塞过了
      if (ridExisted) return;
      // 还未塞过任何一表情
      if (!state[mid]) {
        state[mid] = {};
      }
      // 存在该表情数据
      if (state[mid]![reaction]) {
        const reactionUids = state[mid]![reaction];
        const idx = reactionUids.findIndex((id) => id == from_uid);
        if (idx > -1) {
          reactionUids.splice(idx, 1);
          if (reactionUids.length == 0) {
            // 没有表情了
            delete state[mid]![reaction];
          }
        } else {
          reactionUids.push(from_uid);
        }
      } else {
        state[mid]![reaction] = [from_uid];
      }
    }
  }
});

export const {
  removeReactionMessage,
  resetReactionMessage,
  fillReactionMessage,
  toggleReactionMessage
} = reactionMessageSlice.actions;

export default reactionMessageSlice.reducer;
