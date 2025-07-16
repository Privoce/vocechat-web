import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ChatContext } from "@/types/common";
import { MuteDTO } from "@/types/message";
import { OG } from "@/types/resource";
import {
  AutoDeleteMessageSettingDTO,
  AutoDeleteMsgForGroup,
  AutoDeleteMsgForUser,
  AutoDeleteSettingForChannels,
  AutoDeleteSettingForUsers,
  PinChat,
  PinChatTarget,
} from "@/types/sse";
import { resetAuthData } from "./auth.data";

type ChannelAside = "members" | "voice" | "voice_fullscreen" | null;
type DMAside = "voice" | "voice_fullscreen" | null;
export interface State {
  og: { [url: string]: OG };
  usersVersion: number;
  afterMid: number;
  historyUsers: { [uid: number]: string | "reached" };
  historyChannels: { [cid: number]: string | "reached" };
  readUsers: { [uid: number]: number };
  readChannels: { [cid: number]: number };
  muteUsers: { [uid: number]: { expired_at?: number } | undefined };
  muteChannels: { [cid: number]: { expired_at?: number } | undefined };
  autoDeleteMsgUsers: AutoDeleteMsgForUser[];
  autoDeleteMsgChannels: AutoDeleteMsgForGroup[];
  channelAsides: { [cid: number]: ChannelAside };
  dmAsides: { [uid: number]: DMAside };
  pinChats: PinChat[];
  remarkMap: Record<number, string>;
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
  channelAsides: {},
  dmAsides: {},
  pinChats: [],
  remarkMap: {},
};

const footprintSlice = createSlice({
  name: "footprint",
  initialState,
  reducers: {
    resetFootprint() {
      return initialState;
    },
    fillFootprint(state, action: PayloadAction<State>) {
      const {
        og = {},
        usersVersion = state.usersVersion,
        afterMid = state.afterMid,
        historyUsers = {},
        historyChannels = {},
        readUsers = {},
        readChannels = {},
        muteUsers = {},
        muteChannels = {},
        autoDeleteMsgUsers = [],
        autoDeleteMsgChannels = [],
        channelAsides = {},
        dmAsides = {},
        pinChats = [],
        remarkMap = {},
      } = action.payload;
      // 初始化全局变量
      window.USERS_VERSION = usersVersion;
      window.AFTER_MID = afterMid;
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
        autoDeleteMsgChannels,
        channelAsides,
        dmAsides,
        pinChats,
        remarkMap,
      };
    },
    updateUsersVersion(state, action: PayloadAction<number>) {
      state.usersVersion = action.payload;
      window.USERS_VERSION = action.payload;
    },
    updateAfterMid(state, action: PayloadAction<number>) {
      const newMid = action.payload;
      // 如果新 mid 小于已有的 afterMid，则不必更新
      if (state.afterMid < newMid) {
        state.afterMid = action.payload;
        window.AFTER_MID = action.payload;
      }
    },
    updateAutoDeleteSetting(state, action: PayloadAction<AutoDeleteMessageSettingDTO>) {
      const payload = action.payload;
      Object.keys(payload).forEach((key) => {
        switch (key) {
          case "burn_after_reading_users": {
            const updates = (payload as AutoDeleteSettingForUsers).burn_after_reading_users;
            updates.map((item) => {
              const { uid } = item;
              const idx = state.autoDeleteMsgUsers.findIndex((tmp) => tmp.uid == uid);
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
            updates.map((item) => {
              const { gid } = item;
              const idx = state.autoDeleteMsgChannels.findIndex((tmp) => tmp.gid == gid);
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
            mutes?.forEach(({ uid, expired_at }) => {
              state.muteUsers[uid] = { expired_at };
            });
            break;
          }
          case "add_groups": {
            const mutes = payload.add_groups;
            mutes?.forEach(({ gid, expired_at }) => {
              state.muteChannels[gid] = { expired_at };
            });
            break;
          }
          default:
            break;
        }
      });
    },
    upsertPinChats(state, action: PayloadAction<{ pins: PinChat[]; override?: boolean }>) {
      const { pins, override = false } = action.payload;
      if (override) {
        state.pinChats = pins;
      } else {
        state.pinChats = [...pins, ...state.pinChats];
      }
    },
    removePinChats(state, action: PayloadAction<PinChatTarget[]>) {
      const pins = action.payload;
      state.pinChats = state.pinChats.filter((pin) => {
        const key = "uid" in pin.target ? "uid" : "gid";
        // @ts-ignore
        return !pins.some((p) => p[key] == pin.target[key]);
      });
    },
    upsertOG(state, action: PayloadAction<{ key: string; value: OG }>) {
      const { key, value } = action.payload;
      state.og[key] = value;
    },
    updateHistoryMark(
      state,
      action: PayloadAction<{ type: ChatContext; id: number; mid: string }>
    ) {
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
    updateRemarkByUid(state, action: PayloadAction<{ uid: number; remark: string }>) {
      const { uid, remark } = action.payload;
      state.remarkMap[uid] = remark;
    },
    updateReadChannels(state, action: PayloadAction<{ gid: number; mid: number }[] | undefined>) {
      const reads = action.payload || [];
      if (reads.length == 0) return;
      reads.forEach(({ gid, mid }) => {
        state.readChannels[gid] = mid;
      });
    },
    updateChannelVisibleAside(state, action: PayloadAction<{ id: number; aside: ChannelAside }>) {
      const { id, aside } = action.payload;
      state.channelAsides[id] = aside;
    },
    updateDMVisibleAside(state, action: PayloadAction<{ id: number; aside: DMAside }>) {
      const { id, aside } = action.payload;
      state.dmAsides[id] = aside;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAuthData, (state) => {
      // 如果有 aside 是 voice 的，就把它关掉
      Object.keys(state.channelAsides).forEach((channel_id: string) => {
        if (state.channelAsides[+channel_id] === "voice") {
          state.channelAsides[+channel_id] = null;
        }
      });
      Object.keys(state.dmAsides).forEach((uid: string) => {
        if (state.dmAsides[+uid] === "voice") {
          state.dmAsides[+uid] = null;
        }
      });
    });
  },
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
  upsertOG,
  updateChannelVisibleAside,
  updateDMVisibleAside,
  upsertPinChats,
  removePinChats,
  updateRemarkByUid,
} = footprintSlice.actions;

export default footprintSlice.reducer;
