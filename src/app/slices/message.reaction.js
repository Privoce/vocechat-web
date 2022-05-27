import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const reactionMessageSlice = createSlice({
  name: "reactionMessage",
  initialState,
  reducers: {
    resetReactionMessage() {
      return initialState;
    },
    fullfillReactionMessage(state, action) {
      return action.payload;
    },
    removeReactionMessage(state, action) {
      const mids = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      mids.forEach((id) => {
        delete state[id];
      });
    },
    toggleReactionMessage(state, action) {
      // rid: reaction's mid, mid: which message append to
      const { from_uid, mid, rid, action: reaction } = action.payload;
      console.log("msg reaction", mid, from_uid, reaction);
      const ridExisted = state[rid] || false;
      // 已经塞过了
      if (ridExisted) return;
      console.log("ssss");
      // 还未塞过任何一表情
      if (!state[mid]) {
        state[mid] = {};
      }
      // 存在该表情数据
      if (state[mid][reaction]) {
        const reactionUids = state[mid][reaction];
        const idx = reactionUids.findIndex((id) => id == from_uid);
        if (idx > -1) {
          reactionUids.splice(idx, 1);
          if (reactionUids.length == 0) {
            // 没有表情了
            delete state[mid][reaction];
          }
        } else {
          reactionUids.push(from_uid);
        }
      } else {
        state[mid][reaction] = [from_uid];
      }
      state[rid] = true;
    },
  },
});
export const {
  removeReactionMessage,
  resetReactionMessage,
  fullfillReactionMessage,
  toggleReactionMessage,
} = reactionMessageSlice.actions;
export default reactionMessageSlice.reducer;
