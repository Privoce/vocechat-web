import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MuteDTO } from "../../types/message";
import { OG } from "../../types/resource";
import { AutoDeleteMessageSettingDTO, AutoDeleteMsgForGroup, AutoDeleteMsgForUser, AutoDeleteSettingForChannels, AutoDeleteSettingForUsers } from "../../types/sse";

export interface State {
  og: { [url: string]: OG }
  usersVersion: number;
  afterMid: number;
  historyUsers: { [uid: number]: string | "reached" };
  historyChannels: { [cid: number]: string | "reached" };
  readUsers: { [uid: number]: number };
  readChannels: { [cid: number]: number };
  muteUsers: { [uid: number]: { expired_in?: number } | undefined };
  muteChannels: { [cid: number]: { expired_in?: number } | undefined };
  autoDeleteMsgUsers: AutoDeleteMsgForUser[];
  autoDeleteMsgChannels: AutoDeleteMsgForGroup[];
}

const initialState: State = {
  og: {},
  usersVersion: 0,
  afterMid: 0,
  historyUsers: {},
  historyChannels: {},
  readUsers: {},
  readChannels: {},
  muteUsers: {},
  muteChannels: {},
  autoDeleteMsgUsers: [],
  autoDeleteMsgChannels: [],
};

const footprintSlice = createSlice({
  name: "footprint",
  initialState,
  reducers: {
    resetFootprint() {
      return initialState;
    },
    fillFootprint(state, action) {
      const {
        og = {},
        usersVersion = 0,
        afterMid = 0,
        historyUsers = {},
        historyChannels = {},
        readUsers = {},
        readChannels = {},
        muteUsers = {},
        muteChannels = {},
        autoDeleteMsgUsers = [],
        autoDeleteMsgChannels = []
      } = action.payload;
      return {
        og,
        usersVersion,
        afterMid,
        historyUsers,
        historyChannels,
        readUsers,
        readChannels,
        muteUsers,
        muteChannels,
        autoDeleteMsgUsers,
        autoDeleteMsgChannels
      };
    },
    updateUsersVersion(state, action: PayloadAction<number>) {
      state.usersVersion = action.payload;
    },
    updateAfterMid(state, action: PayloadAction<number>) {
      const newMid = action.payload;
      // 如果新mid小于已有的afterMid,则不必更新
      if (state.afterMid < newMid) {
        state.afterMid = action.payload;
      }
    },
    updateAutoDeleteSetting(state, action: PayloadAction<AutoDeleteMessageSettingDTO>) {
      const payload = action.payload;
      Object.keys(payload).forEach((key) => {
        switch (key) {
          case "burn_after_reading_users": {
            const updates = (payload as AutoDeleteSettingForUsers).burn_after_reading_users;
            updates.map(item => {
              const { uid } = item;
              const idx = state.autoDeleteMsgUsers.findIndex(tmp => tmp.uid == uid);
              if (idx !== -1) {
                // update
                state.autoDeleteMsgUsers[idx] = item;
              } else {
                // add
                state.autoDeleteMsgUsers.push(item);
              }
            });
            break;
          }
          case "burn_after_reading_groups": {
            const updates = (payload as AutoDeleteSettingForChannels).burn_after_reading_groups;
            updates.map(item => {
              const { gid } = item;
              const idx = state.autoDeleteMsgChannels.findIndex(tmp => tmp.gid == gid);
              if (idx !== -1) {
                // update
                state.autoDeleteMsgChannels[idx] = item;
              } else {
                // add
                state.autoDeleteMsgChannels.push(item);
              }
            });
            break;
          }
          default:
            break;
        }
      });
    },
    updateMute(state, action: PayloadAction<MuteDTO>) {
      const payload = action.payload || {};
      Object.keys(payload).forEach((key) => {
        switch (key) {
          case "remove_users": {
            const uids = payload.remove_users;
            uids?.forEach((id) => {
              delete state.muteUsers[id];
            });
            break;
          }
          case "remove_groups": {
            const gids = payload.remove_groups;
            gids?.forEach((id) => {
              delete state.muteChannels[id];
            });
            break;
          }
          case "add_users": {
            const mutes = payload.add_users;
            mutes?.forEach(({ uid, expired_in }) => {
              state.muteUsers[uid] = { expired_in };
            });
            break;
          }
          case "add_groups": {
            const mutes = payload.add_groups;
            mutes?.forEach(({ gid, expired_in }) => {
              state.muteChannels[gid] = { expired_in };
            });
            break;
          }
          default:
            break;
        }
      });
    },
    upsertOG(state, action: PayloadAction<{ key: string, value: OG }>) {
      const { key, value } = action.payload;
      state.og[key] = value;
    },
    updateHistoryMark(state, action: PayloadAction<{ type: "channel" | "user", id: number, mid: string, }>) {
      const { type, id, mid } = action.payload;
      if (type == "channel") {
        state.historyChannels[id] = mid;
      } else {
        state.historyUsers[id] = mid;
      }
    },
    updateReadUsers(state, action: PayloadAction<{ uid: number; mid: number }[] | undefined>) {
      const reads = action.payload || [];
      if (reads.length == 0) return;
      reads.forEach(({ uid, mid }) => {
        state.readUsers[uid] = mid;
      });
    },
    updateReadChannels(state, action: PayloadAction<{ gid: number; mid: number }[] | undefined>) {
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
  fillFootprint,
  updateAfterMid,
  updateUsersVersion,
  updateReadChannels,
  updateReadUsers,
  updateMute,
  updateAutoDeleteSetting,
  updateHistoryMark,
  upsertOG
} = footprintSlice.actions;

export default footprintSlice.reducer;
