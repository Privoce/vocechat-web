import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Server } from "../../types/server";

export interface StoredServer extends Server {
  upgraded: boolean,
  logo: string;
  inviteLink?: {
    link: string;
    expire: number;
  };
}
const initialState: StoredServer = {
  upgraded: false,
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
    fillServer(state, action: PayloadAction<StoredServer>) {
      const {
        upgraded = false,
        inviteLink = {
          link: "",
          expire: 0
        },
        logo = "", // todo: check missed logo property
        name = "",
        description = ""
      } = action.payload || {};
      return { upgraded, name, logo, description, inviteLink };
    },
    updateInfo(state, action: PayloadAction<Partial<StoredServer>>) {
      const values = action.payload || {};
      return { ...state, ...values };
    }
  }
});

export const { updateInfo, resetServer, fillServer } = serverSlice.actions;
export default serverSlice.reducer;
