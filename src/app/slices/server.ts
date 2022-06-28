import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Server } from "../../types/server";

export interface StoredServer extends Server {
  logo: string;
  inviteLink?: {
    link: string;
    expire: number;
  };
}
const initialState: StoredServer = {
  name: "",
  description: "",
  logo: "",
  inviteLink: {
    link: "",
    expire: 0
  }
};

const serverSlice = createSlice({
  name: "server",
  initialState,
  reducers: {
    resetServer() {
      return initialState;
    },
    fullfillServer(state, action: PayloadAction<StoredServer>) {
      const {
        inviteLink = {
          link: "",
          expire: 0
        },
        logo = "", // todo: check missed logo property
        name = "",
        description = ""
      } = action.payload || {};
      return { name, logo, description, inviteLink };
    },
    updateInfo(state, action: PayloadAction<Partial<StoredServer>>) {
      const values = action.payload || {};
      // todo: check and remove old logic
      // Object.keys(values).forEach((_key) => {
      //   state[_key] = values[_key];
      // });
      state = { ...state, ...values };
    }
  }
});

export const { updateInfo, resetServer, fullfillServer } = serverSlice.actions;
export default serverSlice.reducer;
