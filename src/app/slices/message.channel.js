import { createSlice } from "@reduxjs/toolkit";
import { isObjectEqual } from "../../common/utils";

const initialState = {
  // accessLogs: {},
  pendingMsgs: [],
};
const channelMsgSlice = createSlice({
  name: "channelMessage",
  initialState,
  reducers: {
    addChannelMsg(state, action) {
      const {
        id,
        content,
        created_at,
        mid,
        from_uid,
        unread = true,
      } = action.payload;
      const newMsg = { content, created_at, from_uid, unread };
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
    setChannelMsgRead(state, action) {
      const { id, mid } = action.payload;
      console.log("set unread", id, mid);
      state[id][mid].unread = false;
    },
    clearChannelMsgUnread(state, action) {
      const gid = action.payload;
      console.log("set channel all unread", gid);
      Object.entries(state[gid]).forEach(([key, obj]) => {
        obj.unread = false;
      });
    },
    setLastAccessTime(state, action) {
      // let gid = action.payload;
      // delete state[gid].lastAccess;
      // const gid = action.payload;
      // state.accessLogs[gid] = new Date().getTime();
    },
    addPendingMsg(state, action) {
      state.pendingMsgs.push(action.payload);
    },
    removePendingMsg(state, action) {
      const timestamp = action.payload;
      state.pendingMsgs = state.pendingMsgs.filter(
        (m) => m.timestamp != timestamp
      );
    },
  },
});
export const {
  setLastAccessTime,
  clearChannelMsgUnread,
  setChannelMsgRead,
  addChannelMsg,
  addPendingMsg,
  removePendingMsg,
} = channelMsgSlice.actions;
export default channelMsgSlice.reducer;
