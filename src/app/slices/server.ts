import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginConfig, Server } from "@/types/server";

export interface StoredServer extends Server {
  version: string;
  upgraded: boolean;
  logo: string;
  inviteLink?: {
    link: string;
    expire: number;
  };
  loginConfig: LoginConfig | null;
}
const initialState: StoredServer = {
  version: "",
  upgraded: false,
  name: "",
  description: "",
  logo: "",
  inviteLink: {
    link: "",
    expire: 0
  },
  show_user_online_status: false,
  webclient_auto_update: true,
  contact_verification_enable: false,
  only_admin_can_create_group: false,
  chat_layout_mode: "Left",
  loginConfig: null,
  ext_setting: null,
  msg_smtp_notify_delay_seconds: 0,
  msg_smtp_notify_enable: false
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
        version,
        upgraded,
        inviteLink = {
          link: "",
          expire: 0
        },
        logo, // todo: check missed logo property
        name,
        description,
        show_user_online_status = true,
        webclient_auto_update = true,
        contact_verification_enable = false,
        chat_layout_mode = "Left",
        only_admin_can_create_group = false,
        loginConfig = state.loginConfig || null,
        ext_setting = null,
        ...rest
      } = action.payload || {};
      return {
        version: state.version || version,
        upgraded: state.upgraded || upgraded,
        name: state.name || name,
        logo: state.logo || logo,
        description: state.description || description,
        inviteLink,
        show_user_online_status,
        webclient_auto_update,
        contact_verification_enable,
        only_admin_can_create_group,
        chat_layout_mode,
        loginConfig,
        ext_setting,
        ...rest
      };
    },
    updateInfo(state, action: PayloadAction<Partial<StoredServer>>) {
      const values = action.payload || {};
      return { ...state, ...values };
    }
  }
});

export const { updateInfo, resetServer, fillServer } = serverSlice.actions;
export default serverSlice.reducer;
