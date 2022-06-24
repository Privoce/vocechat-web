import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MuteChannel, MuteUser } from "../../types/sse";

export interface State {
  usersVersion: number;
  afterMid: number;
  readUsers: { [uid: number]: number };
  readChannels: { [gid: number]: number };
  muteUsers: { [uid: number]: { expired_at: number } | undefined };
  muteChannels: { [gid: number]: { expired_at: number } | undefined };
}

const initialState: State = {
  usersVersion: 0,
  afterMid: 0,
  readUsers: {},
  readChannels: {},
  muteUsers: {},
  muteChannels: {}
};

interface UpdateMutePayload {
  remove_users: number[];
  remove_groups: number[];
  add_users: MuteUser[];
  add_groups: MuteChannel[];
}

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
    updateUsersVersion(state, action: PayloadAction<number>) {
      state.usersVersion = action.payload;
    },
    updateAfterMid(state, action: PayloadAction<number>) {
      state.afterMid = action.payload;
    },
    updateMute(state, action: PayloadAction<UpdateMutePayload>) {
      const payload = action.payload || {};
      Object.keys(payload).forEach((key) => {
        switch (key) {
          case "remove_users": {
            const uids = payload.remove_users;
            uids.forEach((id) => {
              delete state.muteUsers[id];
            });
            break;
          }
          case "remove_groups": {
            const gids = payload.remove_groups;
            gids.forEach((id) => {
              delete state.muteChannels[id];
            });
            break;
          }
          case "add_users": {
            const mutes = payload.add_users;
            mutes.forEach(({ uid, expired_at }) => {
              state.muteUsers[uid] = { expired_at };
            });
            break;
          }
          case "add_groups": {
            const mutes = payload.add_groups;
            mutes.forEach(({ gid, expired_at }) => {
              state.muteChannels[gid] = { expired_at };
            });
            break;
          }
          default:
            break;
        }
      });
    },
    updateReadUsers(state, action: PayloadAction<{ uid: number; mid: number }[]>) {
      const reads = action.payload || [];
      if (reads.length == 0) return;
      reads.forEach(({ uid, mid }) => {
        state.readUsers[uid] = mid;
      });
    },
    updateReadChannels(state, action: PayloadAction<{ gid: number; mid: number }[]>) {
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
