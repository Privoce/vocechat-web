import { createSlice } from "@reduxjs/toolkit";
import { isObjectEqual } from "../../common/utils";

const initialState = {};
const channelMsgSlice = createSlice({
  name: "channelMessage",
  initialState,
  reducers: {
    addChannelMsg(state, action) {
      const { id, content, created_at, mid, from_uid } = action.payload;
      const newMsg = { content, created_at, from_uid };
      if (state[id]) {
        let replaceMsg = state[id][mid];
        // 如果存在，并且新消息和缓存消息不一样，则替换掉
        if (replaceMsg) {
          const copyMsg = { ...replaceMsg };
          if (!isObjectEqual(copyMsg, newMsg)) {
            state[id][mid] = newMsg;
          }
        } else {
          state[id][mid] = newMsg;
        }
        // let replaceIdx = state[id].findIndex((m) => m.mid == mid);
        // if (replaceIdx > -1) {
        //   const copyMsg = { ...state[id][replaceIdx] };
        //   console.log("current channel msg", copyMsg, newMsg);
        //   if (!isObjectEqual(copyMsg, newMsg)) {
        //     state[id][replaceIdx] = newMsg;
        //   }
        // } else {
        //   state[id] = [...state[id], newMsg];
        // }
      } else {
        state[id] = { [mid]: newMsg };
      }
    },
  },
});
export const { addChannelMsg } = channelMsgSlice.actions;
export default channelMsgSlice.reducer;
