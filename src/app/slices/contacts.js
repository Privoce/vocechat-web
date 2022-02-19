import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const contactsSlice = createSlice({
  name: `contacts`,
  initialState,
  reducers: {
    setContacts(state, action) {
      console.log("set Contacts store", state);
      const contacts = action.payload || [];
      return contacts;
    },
    updateUsersStatus(state, action) {
      const onlines = action.payload;
      onlines.forEach((item) => {
        const { uid, online = false } = item;
        const curr = state.find(({ uid: id }) => id == uid);
        console.log("update user status", curr, online);
        if (curr) {
          curr.online = online;
        }
      });
    },
  },
});
export const { setContacts, updateUsersStatus } = contactsSlice.actions;
export default contactsSlice.reducer;
