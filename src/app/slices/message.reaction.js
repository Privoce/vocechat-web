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
    toggleReactionMessage(state, action) {
      const { from_uid, mid, action: reaction } = action.payload;
      console.log("msg reaction", mid, from_uid, reaction);
      if (!state[mid]) {
        state[mid] = {};
      }
      if (state[mid][reaction]) {
        const reactionUids = state[mid][reaction];
        const idx = reactionUids.findIndex((id) => id == from_uid);
        if (idx > -1) {
          reactionUids.splice(idx, 1);
        } else {
          reactionUids.push(from_uid);
        }
      } else {
        state[mid][reaction] = [from_uid];
      }
    },
  },
});
export const {
  resetReactionMessage,
  fullfillReactionMessage,
  toggleReactionMessage,
} = reactionMessageSlice.actions;
export default reactionMessageSlice.reducer;
