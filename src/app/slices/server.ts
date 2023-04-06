import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Server } from "../../types/server";

export interface StoredServer extends Server {
  upgraded: boolean,
  logo: string;
  inviteLink?: {
    link: string;
    expire: number;
  };
  show_user_online_status: boolean,
  webclient_auto_update: boolean
}
const initialState: StoredServer = {
  upgraded: false,
  name: "",
  description: "",
  logo: "",
  inviteLink: {
    link: "",
    expire: 0
  },
  show_user_online_status: false,
  webclient_auto_update: true
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
        description = "",
        show_user_online_status = false,
        language = "en",
        webclient_auto_update = true
      } = action.payload || {};
      return { upgraded, name, logo, description, inviteLink, show_user_online_status, language, webclient_auto_update };
    },
    updateInfo(state, action: PayloadAction<Partial<StoredServer>>) {
      const values = action.payload || {};
      return { ...state, ...values };
    }
  }
});

export const { updateInfo, resetServer, fillServer } = serverSlice.actions;
export default serverSlice.reducer;
