import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  usersVersion: 0,
  afterMid: 0,
  readUsers: {},
  readChannels: {},
  muteUsers: {},
  muteChannels: {}
};
const footprintSlice = createSlice({
  name: "footprint",
  initialState,
  reducers: {
    resetFootprint() {
      return initialState;
    },
    fullfillFootprint(state, action) {
      const {
        usersVersion = 0,
        afterMid = 0,
        readUsers = {},
        readChannels = {},
        muteUsers = {},
        muteChannels = {}
      } = action.payload;
      return {
        usersVersion,
        afterMid,
        readUsers,
        readChannels,
        muteUsers,
        muteChannels
      };
    },
    updateUsersVersion(state, action) {
      const usersVersion = action.payload;
      state.usersVersion = usersVersion;
    },
    updateAfterMid(state, action) {
      const afterMid = action.payload;
      state.afterMid = afterMid;
    },
    updateMute(state, action) {
      const payload = action.payload || {};
      Object.keys(payload).forEach((key) => {
        switch (key) {
          case "remove_users":
            {
              const uids = payload.remove_users;
              uids.forEach((id) => {
                delete state.muteUsers[id];
              });
            }
            break;
          case "remove_groups":
            {
              const gids = payload.remove_groups;
              gids.forEach((id) => {
                delete state.muteChannels[id];
              });
            }
            break;
          case "add_users":
            {
              const mutes = payload.add_users;
              mutes.forEach(({ uid, expired_in = null }) => {
                state.muteUsers[uid] = { expired_in };
              });
            }
            break;
          case "add_groups":
            {
              const mutes = payload.add_groups;
              mutes.forEach(({ gid, expired_in = null }) => {
                state.muteChannels[gid] = { expired_in };
              });
            }
            break;
          default:
            break;
        }
      });
    },
    updateReadUsers(state, action) {
      const reads = action.payload || [];
      if (reads.length == 0) return;
      reads.forEach(({ uid, mid }) => {
        state.readUsers[uid] = mid;
      });
    },
    updateReadChannels(state, action) {
      const reads = action.payload || [];
      if (reads.length == 0) return;
      reads.forEach(({ gid, mid }) => {
        state.readChannels[gid] = mid;
      });
    }
  }
});
export const {
  resetFootprint,
  fullfillFootprint,
  updateAfterMid,
  updateUsersVersion,
  updateReadChannels,
  updateReadUsers,
  updateMute
} = footprintSlice.actions;
export default footprintSlice.reducer;
