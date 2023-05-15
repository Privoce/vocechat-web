import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isNull, omitBy } from "lodash";
import BASE_URL from "../config";
import { Contact, ContactStatus } from "@/types/user";
import { UserLog, UserState } from "@/types/sse";

type DMAside = "voice" | null;
export interface StoredUser extends Contact {
  online?: boolean;
  voice?: boolean;
  avatar?: string;
  visibleAside?: DMAside
}

export interface State {
  ids: number[];
  byId: { [id: number]: StoredUser };
}
const initialState: State = {
  ids: [],
  byId: {}
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUsers() {
      return initialState;
    },
    fillUsers(state, action: PayloadAction<StoredUser[]>) {
      const users = action.payload || [];
      state.ids = users.map(({ uid }) => uid);
      state.byId = Object.fromEntries(
        users.map((c) => {
          const { uid } = c;
          return [uid, c];
        })
      );
    },
    removeUser(state, action: PayloadAction<number>) {
      const uid = action.payload;
      state.ids = state.ids.filter((i) => i != uid);
      delete state.byId[uid];
    },
    updateUsersByLogs(state, action: PayloadAction<UserLog[]>) {
      const changeLogs = action.payload;
      changeLogs.forEach(({ action, uid, ...rest }) => {
        switch (action) {
          case "update": {
            const vals = omitBy(rest, isNull);
            if (state.byId[uid]) {
              Object.keys(vals).forEach((k) => {
                // @ts-ignore
                state.byId[uid]![k] = vals[k];
                if (k == "avatar_updated_at") {
                  state.byId[uid]!.avatar = `${BASE_URL}/resource/avatar?uid=${uid}&t=${vals[k]}`;
                }
              });
            }
            break;
          }
          case "create": {
            state.byId[uid] = {
              uid,
              avatar:
                rest.avatar_updated_at === 0
                  ? ""
                  : `${BASE_URL}/resource/avatar?uid=${uid}&t=${rest.avatar_updated_at}`,
              create_by: "", // todo: missing properties create_by
              status: state.byId[uid]?.status ?? "",
              ...rest
            };
            const idx = state.ids.findIndex((i) => i == uid);
            if (idx == -1) {
              state.ids.push(uid);
            }
            break;
          }
          case "delete": {
            const idx = state.ids.findIndex((i) => i == uid);
            if (idx > -1) {
              state.ids.splice(idx, 1);
              delete state.byId[uid];
            }
            break;
          }
          default:
            break;
        }
      });
    },
    updateUsersStatus(state, action: PayloadAction<UserState[]>) {
      action.payload.forEach((data) => {
        const { uid, online = false } = data;
        // console.log("update user status", curr, online);
        if (state.byId[uid]) {
          state.byId[uid]!.online = online;
        }
      });
    },
    updateContactStatus(state, action: PayloadAction<{ uid: number, status: ContactStatus } | { uid: number, status: ContactStatus }[]>) {
      const arr = Array.isArray(action.payload) ? action.payload : [action.payload];
      arr.forEach((data) => {
        if (state.byId[data.uid]) {
          state.byId[data.uid]!.status = data.status;
        }
      });
    }
  }
});

export const { updateContactStatus, resetUsers, fillUsers, updateUsersByLogs, updateUsersStatus } = usersSlice.actions;
export default usersSlice.reducer;
