import { createSlice } from "@reduxjs/toolkit";
import { getNonNullValues } from "../../common/utils";
const initialState = {
  ids: [],
  byId: {},
};
const contactsSlice = createSlice({
  name: `contacts`,
  initialState,
  reducers: {
    resetContacts() {
      return initialState;
    },
    fullfillContacts(state, action) {
      console.log("set Contacts store", action);
      const contacts = action.payload || [];
      state.ids = contacts.map(({ uid }) => uid);
      state.byId = Object.fromEntries(
        contacts.map((c) => {
          const { uid } = c;
          return [uid, c];
        })
      );
    },
    removeContact(state, action) {
      const uid = action.payload;
      state.ids = state.ids.filter((i) => i != uid);
      delete state.byId[uid];
    },
    updateUsersByLogs(state, action) {
      const changeLogs = action.payload;
      changeLogs.forEach(({ action, uid, ...rest }) => {
        switch (action) {
          case "update":
            {
              const vals = getNonNullValues(rest);
              if (state.byId[uid]) {
                Object.keys(vals).forEach((k) => {
                  state.byId[uid][k] = vals[k];
                });
              }
            }
            break;
          case "create":
            {
              state.byId[uid] = { uid, ...rest };
              state.ids.push(uid);
            }
            break;
          case "delete":
            {
              const idx = state.ids.findIndex((i) => i == uid);
              if (idx > -1) {
                state.ids.splice(idx, 1);
                delete state.byId[uid];
              }
            }
            break;

          default:
            break;
        }
      });
    },
    updateUsersStatus(state, action) {
      const onlines = action.payload;
      onlines.forEach((data) => {
        const { uid, online = false } = data;
        // console.log("update user status", curr, online);
        if (state.byId[uid]) {
          state.byId[uid].online = online;
        }
      });
    },
  },
});
export const {
  resetContacts,
  fullfillContacts,
  updateUsersByLogs,
  updateUsersStatus,
} = contactsSlice.actions;
export default contactsSlice.reducer;
