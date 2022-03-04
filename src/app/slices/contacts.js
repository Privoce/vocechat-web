import { createSlice } from "@reduxjs/toolkit";
import { getNonNullValues } from "../../common/utils";
const initialState = [];
const contactsSlice = createSlice({
  name: `contacts`,
  initialState,
  reducers: {
    clearContacts() {
      return initialState;
    },
    setContacts(state, action) {
      console.log("set Contacts store", state);
      const contacts = action.payload || [];
      return contacts;
    },
    removeContact(state, action) {
      const uid = action.payload;
      return state.filter((c) => c.uid != uid);
    },
    updateUsersByLogs(state, action) {
      const changeLogs = action.payload;
      changeLogs.forEach(({ action, uid, ...rest }) => {
        switch (action) {
          case "update":
            {
              const vals = getNonNullValues(rest);
              const curr = state.find(({ uid: id }) => id == uid);
              console.log("update vals", vals, curr);
              if (curr) {
                Object.keys(vals).forEach((k) => {
                  curr[k] = vals[k];
                });
              }
            }
            break;
          case "create":
            {
              const idx = state.findIndex((o) => {
                return o.uid == uid;
              });
              if (idx > -1) {
                state.splice(idx, 1, { uid, ...rest });
              } else {
                state.push({ uid, ...rest });
              }
            }
            break;
          case "delete":
            {
              const idx = state.findIndex((o) => {
                return o.uid == uid;
              });
              if (idx > -1) {
                state.splice(idx, 1);
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
      onlines.forEach((item) => {
        const { uid, online = false } = item;
        const curr = state.find(({ uid: id }) => id == uid);
        // console.log("update user status", curr, online);
        if (curr) {
          curr.online = online;
        }
      });
    },
  },
});
export const {
  clearContacts,
  setContacts,
  removeContact,
  updateUsersByLogs,
  updateUsersStatus,
} = contactsSlice.actions;
export default contactsSlice.reducer;
