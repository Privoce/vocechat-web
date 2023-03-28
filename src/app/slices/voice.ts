import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type VoiceBasicInfo = {
  context: "channel" | "dm"
  id: number,
}
export type VoicingInfo = {
  downlinkNetworkQuality?: number,
  muted: boolean,
  members: number[]
} & VoiceBasicInfo
export type VoiceInfo = {
  memberCount: number
} & VoiceBasicInfo
interface State {
  voicing: VoicingInfo | null,
  list: VoiceInfo[]
}
// const initialInfo = {
//   context: "channel" as const,
//   id: 0,
//   members: []
// };
const initialState: State = {
  voicing: null,
  list: []
};



const voiceSlice = createSlice({
  name: "voice",
  initialState,
  reducers: {
    updateVoicingInfo(state, { payload }: PayloadAction<VoicingInfo | null>) {
      if (payload && state.voicing) {
        const { members, ...rest } = payload;
        const tmpArr = [...state.voicing.members, ...members];
        console.log("tmmp arr", tmpArr);

        state.voicing = { ...rest, members: Array.from(new Set(tmpArr)) };
      }
      state.voicing = payload;
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
      if (state.voicing) {
        if (!state.voicing.members.includes(payload)) {
          state.voicing.members.push(payload);
        }
      } else {
        // tricky?
        state.voicing = {
          id: 0,
          context: "channel",
          muted: false,
          members: [payload]
        };
      }
    },
    removeVoiceMember(state, { payload }: PayloadAction<number>) {
      if (state.voicing) {
        const idx = state.voicing.members.findIndex((uid) => uid == payload);
        if (idx > -1) {
          state.voicing.members.splice(idx, 1);
        }
      }
    }
  },
});

export const { addVoiceMember, removeVoiceMember, updateVoiceList, updateVoicingInfo, updateVoicingNetworkQuality, updateMuteStatus } = voiceSlice.actions;
export default voiceSlice.reducer;
