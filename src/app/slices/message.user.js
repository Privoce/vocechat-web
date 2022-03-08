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
      const { id, from_uid, mid, action: reaction } = action.payload;
      console.log("user likes: likes", id, mid, from_uid, reaction);
      if (state[id] && state[id][mid]) {
        if (!state[id][mid].likes) {
          console.log("user likes: initial ");
          state[id][mid].likes = {};
        }
        const currLikes = state[id][mid].likes;
        // state[id][mid].likes = currLikes ? [...currLikes, reaction] : [reaction];
        if (currLikes[reaction]) {
          if (currLikes[reaction].includes(from_uid)) {
            const idx = currLikes[reaction].findIndex((id) => {
              return id == from_uid;
            });
            console.log("remove reaction", currLikes[reaction], idx, from_uid);
            currLikes[reaction].splice(idx, 1);
          } else {
            currLikes[reaction].push(from_uid);
          }
        } else {
          currLikes[reaction] = [from_uid];
        }
        // state[id][mid].likes = currLikes;
      }
    },
    updateUserMsg(state, action) {
      const { id, mid, content, time } = action.payload;
      console.log("update user message", id, mid);
      if (state[id][mid]) {
        state[id][mid].content = content;
        state[id][mid].edited = time;
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
  updateUserMsg,
  likeUserMsg,
  deleteUserMsg,
  clearUserMsg,
  initUserMsg,
  addUserMsg,
  setUserMsgRead,
  removeMsg,
} = userMsgSlice.actions;
export default userMsgSlice.reducer;
