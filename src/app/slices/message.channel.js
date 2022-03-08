import { createSlice } from "@reduxjs/toolkit";
import { isObjectEqual } from "../../common/utils";

const initialState = {};

const channelMsgSlice = createSlice({
  name: "channelMessage",
  initialState,
  reducers: {
    clearChannelMsg() {
      return initialState;
    },
    initChannelMsg(state, action) {
      return action.payload;
    },
    addChannelMsg(state, action) {
      const {
        id,
        content,
        created_at,
        mid,
        from_uid,
        content_type,
        unread = true,
      } = action.payload;
      const newMsg = { content, content_type, created_at, from_uid, unread };
      if (state[id]) {
        let replaceMsg = state[id][mid];
        // 如果存在，并且新消息和缓存消息不一样，则替换掉，并且改为已读（可能有问题）
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
    deleteChannelMsg(state, action) {
      const { id, mid } = action.payload;
      console.log("delete channel message", id, mid, state[id][mid]);
      if (state[id][mid]) {
        // 添加removed标识
        // state[id][mid]["removed"] = true;
        delete state[id][mid];
      }
    },
    updateChannelMsg(state, action) {
      const { id, mid, content, time } = action.payload;
      console.log("update channel message", id, mid);
      if (state[id][mid]) {
        state[id][mid].content = content;
        state[id][mid].edited = time;
      }
    },
    likeChannelMsg(state, action) {
      const { id, from_uid, mid, action: reaction } = action.payload;
      console.log("channel likes: likes", id, mid, from_uid, reaction);
      if (state[id] && state[id][mid]) {
        if (!state[id][mid].likes) {
          console.log("channel likes: initial ");
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
    setChannelMsgRead(state, action) {
      const { id, mid } = action.payload;
      console.log("set unread", id, mid);
      state[id][mid].unread = false;
    },
    clearChannelMsgUnread(state, action) {
      const gid = action.payload;
      console.log("set channel all unread", gid);
      Object.entries(state[gid]).forEach(([, obj]) => {
        obj.unread = false;
      });
    },
  },
});
export const {
  updateChannelMsg,
  deleteChannelMsg,
  likeChannelMsg,
  clearChannelMsg,
  initChannelMsg,
  clearChannelMsgUnread,
  setChannelMsgRead,
  addChannelMsg,
} = channelMsgSlice.actions;
export default channelMsgSlice.reducer;
