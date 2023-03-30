import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type VoiceBasicInfo = {
  context: "channel" | "dm"
  id: number,
}

export type VoicingInfo = {
  downlinkNetworkQuality?: number,
  muted: boolean,
} & VoiceBasicInfo

export type VoicingMemberInfo = {
  speakingVolume?: number,
  muted?: boolean
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
      if (payload && state.voicing) {
        state.voicing = { ...state.voicing, ...payload };
      } else {
        state.voicing = payload;
      }
    },
    updateMuteStatus(state, { payload }: PayloadAction<boolean>) {
      if (state.voicing) {
        state.voicing.muted = payload;
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
      if (!state.voicingMembers.ids.includes(payload)) {
        state.voicingMembers.ids.push(payload);
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

export const { addVoiceMember, removeVoiceMember, updateVoiceList, updateVoicingInfo, updateVoicingNetworkQuality, updateMuteStatus, updateVoicingMember } = voiceSlice.actions;
export default voiceSlice.reducer;
