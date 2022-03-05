import { createSlice } from "@reduxjs/toolkit";
import { isObjectEqual } from "../../common/utils";

const initialState = {};
const userMsgSlice = createSlice({
  name: "userMessage",
  initialState,
  reducers: {
    clearUserMsg() {
      return initialState;
    },
    initUserMsg(state, action) {
      return action.payload;
    },
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
      } else {
        state[id] = { [mid]: newMsg };
      }
    },
    likeUserMsg(state, action) {
      const { id, mid, action: emoji } = action.payload;
      console.log("add user likes", id, mid, state[id][mid]);
      if (state[id][mid]) {
        const currLikes = state[id][mid].likes;
        state[id][mid].likes = currLikes ? [...currLikes, emoji] : [emoji];
      }
    },
    deleteUserMsg(state, action) {
      const { id, mid } = action.payload;
      console.log("delete user message", id, mid);
      if (state[id][mid]) {
        // 添加removed标识
        // state[id][mid].removed = true;
        delete state[id][mid];
      }
    },
    setUserMsgRead(state, action) {
      const { id, mid } = action.payload;
      console.log("set unread", id, mid);
      state[id][mid].unread = false;
    },
    removeMsg(state, action) {
      const { id, mid } = action.payload;
      console.log("remove user msg", id, mid);
      delete state[id][mid];
    },
  },
});
export const {
  likeUserMsg,
  deleteUserMsg,
  clearUserMsg,
  initUserMsg,
  addUserMsg,
  setUserMsgRead,
  removeMsg,
} = userMsgSlice.actions;
export default userMsgSlice.reducer;
