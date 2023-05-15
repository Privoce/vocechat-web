import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KEY_UID } from "../config";
import { ConnectionState } from "agora-rtc-sdk-ng";
import { resetAuthData } from "./auth.data";
import { ChatContext } from "../../types/common";

export type VoiceBasicInfo = {
  context: ChatContext,
  from?: number,
  id: number,// means to in dm context
}

export type VoicingInfo = {
  downlinkNetworkQuality?: number,
  joining?: boolean,
  connectionState?: ConnectionState
} & VoiceBasicInfo & VoicingMemberInfo

export type VoicingMemberInfo = {
  speakingVolume?: number,
  muted?: boolean,
  deafen?: boolean,
  video?: boolean,
  shareScreen?: boolean
}

export type VoicingMembers = {
  ids: number[],
  byId: {
    [key: number]: VoicingMemberInfo
  },
  pin?: number
}
export type VoiceInfo = {
  channelName: string,
  memberCount: number
} & VoiceBasicInfo
interface State {
  callingFrom: number,
  callingTo: number,
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
  callingFrom: 0,
  callingTo: 0,
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
    updateCalling(state, { payload }: PayloadAction<{ from: number, to?: number }>) {
      const { from, to = 0 } = payload;
      state.callingFrom = from;
      state.callingTo = to;
    },
    updateVoicingInfo(state, { payload }: PayloadAction<VoicingInfo | null>) {
      if (payload) {
        state.voicing = { ...(state.voicing ?? {}), ...payload };
        // 更新登录用户在member list的状态
        const loginUid = localStorage.getItem(KEY_UID) ?? 0;
        const idx = state.voicingMembers.ids.findIndex((uid) => uid == loginUid);
        if (idx > -1) {
          state.voicingMembers.byId[+loginUid] = payload;
          Object.keys(payload).forEach((key) => {
            switch (key) {
              case "video":
                state.voicingMembers.byId[+loginUid].video = payload.video;
                break;
              case "muted":
                state.voicingMembers.byId[+loginUid].muted = payload.muted;
                break;
              case "deafen":
                state.voicingMembers.byId[+loginUid].deafen = payload.deafen;
                state.voicingMembers.byId[+loginUid].muted = payload.deafen;
                break;
              case "shareScreen":
                state.voicingMembers.byId[+loginUid].shareScreen = payload.shareScreen;
                break;

              default:
                break;
            }
          });
        }

      } else {
        // reset
        state.voicing = payload;
        state.voicingMembers = {
          ids: [],
          byId: {}
        };
      }
    },
    updateConnectionState(state, { payload }: PayloadAction<ConnectionState>) {
      if (state.voicing) {
        state.voicing.connectionState = payload;
      }
    },
    updateVoicingNetworkQuality(state, { payload }: PayloadAction<number>) {
      if (state.voicing) {
        state.voicing.downlinkNetworkQuality = payload;
      }
    },
    upsertVoiceList(state, { payload }: PayloadAction<VoiceInfo[] | VoiceInfo>) {
      if (Array.isArray(payload)) {
        state.list = payload;
      } else {
        const { id, context } = payload;
        const idx = state.list.findIndex(v => v.id == id && v.context == context);
        if (idx > -1) {
          state.list.splice(idx, 1, payload);
        } else {
          state.list.push(payload);
        }
      }
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
    },
    updatePin(state, { payload }: PayloadAction<{ uid: number, action: "pin" | "unpin" }>) {
      const idx = state.voicingMembers.ids.findIndex((uid) => uid == payload.uid);
      if (idx > -1) {
        state.voicingMembers.pin = payload.action == "pin" ? payload.uid : undefined;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(resetAuthData, (state) => {
      //  reset voicing info
      if (window.VOICE_CLIENT) {
        window.VOICE_CLIENT.leave();
        Object.entries(window.VOICE_TRACK_MAP).forEach(([uid, track]) => {
          if (track && 'close' in track) {
            track.close();
          }
          delete window.VOICE_TRACK_MAP[+uid];
        });
        Object.entries(window.VIDEO_TRACK_MAP).forEach(([uid, track]) => {
          if (track && 'close' in track) {
            track?.close();
          }
          delete window.VOICE_TRACK_MAP[+uid];
        });
      }
      state.voicing = null;
      state.voicingMembers = {
        ids: [],
        byId: {}
      };
    });
  }
});

export const { updateCalling, updatePin, updateConnectionState, addVoiceMember, removeVoiceMember, upsertVoiceList, updateVoicingInfo, updateVoicingNetworkQuality, updateVoicingMember } = voiceSlice.actions;
export default voiceSlice.reducer;
