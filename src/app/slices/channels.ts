import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isNull, omitBy } from "lodash";
import BASE_URL from "../config";
import { Channel, UpdateChannelDTO, UpdatePinnedMessageDTO } from "../../types/channel";
import { resetAuthData } from "./auth.data";
// import { updateVoicingInfo } from "./voice";

type ChannelAside = "members" | "voice" | null;
interface StoredChannel extends Channel {
  icon?: string;
  visibleAside: ChannelAside
}

interface State {
  ids: number[];
  byId: { [id: number]: StoredChannel };
}

const initialState: State = {
  ids: [],
  byId: {}
};

const channelsSlice = createSlice({
  name: `channels`,
  initialState,
  reducers: {
    resetChannels() {
      return initialState;
    },
    fillChannels(state, action: PayloadAction<Channel[]>) {
      const channels = action.payload || [];
      state.ids = channels.map(({ gid }) => gid);
      channels.forEach((c) => {
        state.byId[c.gid] = {
          ...c,
          icon:
            c.avatar_updated_at == 0
              ? ""
              : `${BASE_URL}/resource/group_avatar?gid=${c.gid}&t=${c.avatar_updated_at}`,
          visibleAside: state.byId[c.gid]?.visibleAside ?? null
        };
      });
    },
    addChannel(state, action: PayloadAction<Channel>) {
      const ch = action.payload;
      const { gid, avatar_updated_at } = ch;
      if (!state.ids.includes(+gid)) {
        state.ids.push(+gid);
      }
      state.byId[gid] = {
        ...ch,
        icon:
          avatar_updated_at == 0
            ? ""
            : `${BASE_URL}/resource/group_avatar?gid=${gid}&t=${avatar_updated_at}`,
        visibleAside: "members"
      };
    },
    updateChannel(state, action: PayloadAction<UpdateChannelDTO>) {
      const ignoreInPublic = ["add_member", "remove_member"];
      const { gid, operation = "", members = [], ...rest } = action.payload;
      const currChannel = state.byId[gid];
      if (!currChannel || (currChannel.is_public && ignoreInPublic.includes(operation))) return;
      switch (operation) {
        case "remove_member": {
          state.byId[gid]!.members = state.byId[gid]!.members.filter(
            (id) => members.findIndex((uid) => uid == id) == -1
          );
          break;
        }
        case "add_member": {
          const currs = state.byId[gid]!.members;
          const _set = new Set([...currs, ...members]);
          state.byId[gid]!.members = Array.from(_set);
          break;
        }
        default:
          // old code: state.byId[gid] = { ...state.byId[gid]!, ...getNonNullValues(rest) };
          state.byId[gid] = { ...state.byId[gid]!, ...omitBy(rest, isNull) };
          break;
      }
    },
    updatePinMessage(state, action: PayloadAction<UpdatePinnedMessageDTO>) {
      const { gid, mid, msg } = action.payload;
      let pinnedMessages = state.byId[gid]?.pinned_messages;
      // add
      if (msg) {
        if (!pinnedMessages) {
          pinnedMessages = [msg];
        } else {
          const idx = pinnedMessages.findIndex((msg) => msg.mid == mid);
          if (idx > -1) {
            pinnedMessages.splice(idx, 1);
          }
          pinnedMessages.push(msg);
        }
      } else {
        // remove
        if (pinnedMessages) {
          const idx = pinnedMessages.findIndex((m) => m.mid == mid);
          if (idx > -1) {
            pinnedMessages.splice(idx, 1);
          }
        }
      }
    },
    updateChannelVisibleAside(state, action: PayloadAction<{ id: number, aside: ChannelAside }>) {
      const { id, aside } = action.payload;
      if (state.byId[id]) {
        state.byId[id].visibleAside = aside;
      }
    },
    removeChannel(state, action: PayloadAction<number>) {
      const gid = action.payload;
      const idx = state.ids.findIndex((i) => i == gid);
      if (idx > -1) {
        state.ids.splice(idx, 1);
        delete state.byId[gid];
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(resetAuthData, (state) => {
      // 如果有aside是voice的，就把它关掉
      Object.values(state.byId).forEach((ch) => {
        if (ch.visibleAside === "voice") {
          ch.visibleAside = null;
        }
      });
    });
  }
});

export const {
  updatePinMessage,
  resetChannels,
  fillChannels,
  addChannel,
  updateChannel,
  removeChannel,
  updateChannelVisibleAside
} = channelsSlice.actions;

export default channelsSlice.reducer;
