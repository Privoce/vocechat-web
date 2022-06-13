import { createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../config";
import { getNonNullValues } from "../../common/utils";
const initialState = {
  ids: [],
  byId: {}
};
const channelsSlice = createSlice({
  name: `channels`,
  initialState,
  reducers: {
    resetChannels() {
      return initialState;
    },
    fullfillChannels(state, action) {
      console.log("set channels store", state);
      const chs = action.payload || [];
      state.ids = chs.map(({ gid }) => +gid);
      state.byId = Object.fromEntries(
        chs.map((c) => {
          const { gid, avatar_updated_at } = c;
          c.icon =
            avatar_updated_at == 0
              ? ""
              : `${BASE_URL}/resource/group_avatar?gid=${gid}&t=${avatar_updated_at}`;
          return [gid, c];
        })
      );
    },
    addChannel(state, action) {
      // console.log("set channels store", action);
      const ch = action.payload;
      const { gid, avatar_updated_at } = ch;
      if (!state.ids.includes(+gid)) {
        state.ids.push(+gid);
      }
      state.byId[gid] = {
        ...ch,
        icon:
          avatar_updated_at == 0
            ? ""
            : `${BASE_URL}/resource/group_avatar?gid=${gid}&t=${avatar_updated_at}`
      };
    },
    updateChannel(state, action) {
      const ignoreInPublic = ["add_member", "remove_member"];
      const { id, operation, members = [], ...rest } = action.payload;
      const currChannel = state.byId[id];
      if (!currChannel || (currChannel.is_public && ignoreInPublic.includes(operation))) return;
      switch (operation) {
        case "remove_member":
          {
            const filtered = state.byId[id].members.filter(
              (id) => members.findIndex((uid) => uid == id) == -1
            );
            state.byId[id].members = filtered;
          }
          break;
        case "add_member":
          {
            const currs = state.byId[id].members;
            const _set = new Set([...currs, ...members]);
            console.log("add member to channel", [..._set]);
            state.byId[id].members = [..._set];
          }
          break;
        default:
          state.byId[id] = { ...state.byId[id], ...getNonNullValues(rest) };
          break;
      }
    },
    updatePinMessage(state, action) {
      const { gid, mid, msg } = action.payload;
      let msgs = state.byId[gid]?.pinned_messages;
      if (!msgs) return;
      if (msg) {
        if (!msgs) {
          msgs = [msg];
        } else {
          const idx = msgs.findIndex((msg) => msg.mid == mid);
          if (idx > -1) {
            msgs.splice(idx, 1);
          }
          msgs.push(msg);
        }
      } else {
        // remove
        const idx = msgs.findIndex((msg) => msg.mid == mid);
        if (idx > -1) {
          msgs.splice(idx, 1);
        }
      }
    },
    removeChannel(state, action) {
      const gid = action.payload;
      const idx = state.ids.findIndex((i) => i == gid);
      if (idx > -1) {
        state.ids.splice(idx, 1);
        delete state.byId[gid];
      }
    }
  }
});
export const {
  updatePinMessage,
  resetChannels,
  fullfillChannels,
  addChannel,
  updateChannel,
  removeChannel
} = channelsSlice.actions;
export default channelsSlice.reducer;
