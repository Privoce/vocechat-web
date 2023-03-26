import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type VoiceBasicInfo = {
  context: "channel" | "dm"
  id: number,
}
export type VoicingInfo = {
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
      state.voicing = payload;
    },
    updateVoiceList(state, { payload }: PayloadAction<VoiceInfo[]>) {
      state.list = payload;
    },
    addVoiceMember(state, { payload }: PayloadAction<number>) {
      if (state.voicing) {
        if (!state.voicing.members.includes(payload)) {
          state.voicing.members.push(payload);
        }
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

export const { addVoiceMember, removeVoiceMember, updateVoiceList, updateVoicingInfo } = voiceSlice.actions;
export default voiceSlice.reducer;
