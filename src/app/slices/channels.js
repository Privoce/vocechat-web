import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  ids: [],
  byId: {},
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
      state.ids = chs.map(({ gid }) => gid);
      state.byId = Object.fromEntries(
        chs.map((c) => {
          const { gid } = c;
          return [gid, c];
        })
      );
    },
    addChannel(state, action) {
      // console.log("set channels store", action);
      const ch = action.payload;
      const { gid, ...rest } = ch;
      state.ids.push(gid);
      state.byId[gid] = rest;
    },
    updateChannel(state, action) {
      // console.log("set channels store", action);
      const { id, operation, members, ...rest } = action.payload;
      switch (operation) {
        case "remove_member":
          {
            const filtered = state.byId[id].members.filter(
              (id) => members.findIndex((uid) => uid == id) == -1
            );
            console.log(
              "remove member from channel",
              filtered,
              members,
              state.byId[id].members
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
          state.byId[id] = { ...state.byId[id], members, ...rest };
          break;
      }
    },
    removeChannel(state, action) {
      const gid = action.payload;
      const idx = state.ids.findIndex((i) => i == gid);
      if (idx > -1) {
        state.ids.splice(idx, 1);
        delete state.byId[gid];
      }
    },
  },
});
export const {
  resetChannels,
  fullfillChannels,
  addChannel,
  updateChannel,
  removeChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
