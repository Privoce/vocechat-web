import { createSlice } from "@reduxjs/toolkit";
import { isObjectEqual } from "../../common/utils";

const initialState = {};
const userMsgSlice = createSlice({
  name: "userMessage",
  initialState,
  reducers: {
    addUserMsg(state, action) {
      const {
        id,
        content,
        content_type,
        created_at,
        mid,
        from_uid,
        unread = true,
      } = action.payload;
      const newMsg = { content, content_type, created_at, from_uid, unread };
      if (state[id]) {
        let replaceMsg = state[id][mid];
        // 如果存在，并且新消息和缓存消息不一样，则替换掉
        if (replaceMsg) {
          const copyMsg = { ...replaceMsg };
          if (!isObjectEqual(copyMsg, newMsg)) {
            state[id][mid] = { ...newMsg, unread: false };
          }
        } else {
          state[id][mid] = newMsg;
        }
        // let replaceIdx = state[id].findIndex((m) => m.mid == mid);
        // if (replaceIdx > -1) {
        //   const copyMsg = { ...state[id][replaceIdx] };
        //   console.log("current user msg", copyMsg, newMsg);
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
    setUserMsgRead(state, action) {
      const { id, mid } = action.payload;
      console.log("set unread", id, mid);
      state[id][mid].unread = false;
    },
  },
});
export const { addUserMsg, setUserMsgRead } = userMsgSlice.actions;
export default userMsgSlice.reducer;
