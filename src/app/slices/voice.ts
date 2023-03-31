import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KEY_UID } from "../config";

export type VoiceBasicInfo = {
  context: "channel" | "dm"
  id: number,
}

export type VoicingInfo = {
  downlinkNetworkQuality?: number,
  muted?: boolean,
  deafen?: boolean,
  joining?: boolean
} & VoiceBasicInfo

export type VoicingMemberInfo = {
  speakingVolume?: number,
  muted?: boolean,
  deafen?: boolean
}

export type VoicingMembers = {
  ids: number[],
  byId: {
    [key: number]: VoicingMemberInfo
  }
}
export type VoiceInfo = {
  memberCount: number
} & VoiceBasicInfo
interface State {
  voicing: VoicingInfo | null,
  voicingMembers: VoicingMembers,
  list: VoiceInfo[]
}
// const initialInfo = {
//   context: "channel" as const,
//   id: 0,
//   members: []
// };
const initialState: State = {
  voicing: null,
  voicingMembers: {
    ids: [],
    byId: {}
  },
  list: []
};



const voiceSlice = createSlice({
  name: "voice",
  initialState,
  reducers: {
    updateVoicingInfo(state, { payload }: PayloadAction<VoicingInfo | null>) {
      if (payload) {
        state.voicing = { ...(state.voicing ?? {}), ...payload };
      } else {
        // reset
        state.voicing = payload;
        state.voicingMembers = {
          ids: [],
          byId: {}
        };
      }
    },
    updateMuteStatus(state, { payload }: PayloadAction<boolean>) {
      if (state.voicing) {
        state.voicing.muted = payload;
        // 更新登录用户在member list的状态
        const loginUid = localStorage.getItem(KEY_UID) ?? 0;
        const idx = state.voicingMembers.ids.findIndex((uid) => uid == loginUid);
        if (idx > -1) {
          state.voicingMembers.byId[+loginUid].muted = payload;
        }
      }
    },
    updateDeafenStatus(state, { payload }: PayloadAction<boolean>) {
      if (state.voicing) {
        state.voicing.deafen = payload;
        state.voicing.muted = payload;
        // 更新登录用户在member list的状态
        const loginUid = localStorage.getItem(KEY_UID) ?? 0;
        const idx = state.voicingMembers.ids.findIndex((uid) => uid == loginUid);
        if (idx > -1) {
          state.voicingMembers.byId[+loginUid].muted = payload;
        }
      }
    },
    updateVoicingNetworkQuality(state, { payload }: PayloadAction<number>) {
      if (state.voicing) {
        state.voicing.downlinkNetworkQuality = payload;
      }
    },
    updateVoiceList(state, { payload }: PayloadAction<VoiceInfo[]>) {
      state.list = payload;
    },
    addVoiceMember(state, { payload }: PayloadAction<number>) {
      const notExisted = !state.voicingMembers.ids.includes(payload);
      console.log("add voice member", payload, notExisted, state.voicingMembers.ids);
      if (notExisted) {
        state.voicingMembers.ids = [...state.voicingMembers.ids, payload];
        state.voicingMembers.byId[payload] = {
          speakingVolume: 0,
          muted: false
        };
      }
    },
    removeVoiceMember(state, { payload }: PayloadAction<number>) {
      const idx = state.voicingMembers.ids.findIndex((uid) => uid == payload);
      if (idx > -1) {
        state.voicingMembers.ids.splice(idx, 1);
        delete state.voicingMembers.byId[payload];
      }
    },
    updateVoicingMember(state, { payload }: PayloadAction<{ uid: number, info: VoicingMemberInfo }>) {
      const idx = state.voicingMembers.ids.findIndex((uid) => uid == payload.uid);
      if (idx > -1) {
        const { uid, info } = payload;
        state.voicingMembers.byId[uid] = { ...state.voicingMembers.byId[uid], ...info };
      }
    }
  },
});

export const { addVoiceMember, removeVoiceMember, updateVoiceList, updateVoicingInfo, updateVoicingNetworkQuality, updateMuteStatus, updateVoicingMember, updateDeafenStatus } = voiceSlice.actions;
export default voiceSlice.reducer;
