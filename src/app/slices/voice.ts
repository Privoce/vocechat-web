import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type VoiceInfo = {
  context: "channel" | "dm"
  id: number | null,
  members: number[]
}
interface State {
  joined: boolean,
  voicing: VoiceInfo
}
const initialInfo = {
  context: "channel" as const,
  id: null,
  members: []
};
const initialState: State = {
  joined: false,
  voicing: initialInfo
};



const voiceSlice = createSlice({
  name: "voice",
  initialState,
  reducers: {
    updateJoinStatus(state, { payload }: PayloadAction<boolean>) {
      state.joined = payload;
    },
    updateVoiceInfo(state, { payload }: PayloadAction<VoiceInfo | null>) {
      if (!payload) {
        // reset
        state.voicing = initialInfo;
      } else {
        if (state.voicing) {
          state.voicing = { ...state.voicing, ...payload };
        } else {
          state.voicing = payload;
        }

      }
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

export const { updateJoinStatus, updateVoiceInfo, addVoiceMember, removeVoiceMember } = voiceSlice.actions;
export default voiceSlice.reducer;
