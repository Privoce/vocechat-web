import { createContext, ReactNode, useContext } from "react";

import {
  useGetLoginConfigQuery,
  useGetServerQuery,
  useGetServerVersionQuery
} from "../app/services/server";
import { useAppSelector } from "../app/store";
import { getContrastColor, isInIframe } from "../utils";
import { shallowEqual } from "react-redux";

const query = new URLSearchParams(location.search);
const id = decodeURIComponent(query.get("id") || "");
const welcome = decodeURIComponent(query.get("welcome") || "");
const title = decodeURIComponent(query.get("title") || "");
const logo = decodeURIComponent(query.get("logo") || "");
const autoReg = decodeURIComponent(query.get("autoReg") || "true") == "true";
const token = decodeURIComponent(query.get("token") || "");
const color = decodeURIComponent(query.get("themeColor") || "#1fe1f9");
const from = decodeURIComponent(query.get("from") || "widget.link");
const fgColor = getContrastColor(color);
const embed = isInIframe();
const WidgetContext = createContext({
  id,
  token,
  autoReg,
  color,
  fgColor,
  // 判断是否是 iframe 上下文
  embed,
  from,
  loading: true,
  inviteOnly: false,
  title,
  logo,
  welcome,
  serverVersion: ""
});

function WidgetProvider({ children }: { children: ReactNode }) {
  const { data = "" } = useGetServerVersionQuery();
  const { isLoading: loadingServerData } = useGetServerQuery();
  const { isLoading: loadingConfig, data: loginConfig } = useGetLoginConfigQuery();
  const serverData = useAppSelector((store) => store.server, shallowEqual);

  const loading = loadingConfig || loadingServerData;
  // if(loading) return
  return (
    <WidgetContext.Provider
      value={{
        id,
        token,
        autoReg,
        welcome,
        loading,
        color,
        fgColor,
        embed,
        from,
        inviteOnly: loginConfig?.who_can_sign_up == "InvitationOnly",
        title: title ? title : serverData?.name,
        logo: logo ? logo : serverData.logo,
        serverVersion: data
      }}
    >
      {children}
    </WidgetContext.Provider>
  );
}

function useWidget() {
  const context = useContext(WidgetContext);
  if (context === undefined) {
    throw new Error("useWidget must be used within a WidgetProvider");
  }
  return context;
}

export { WidgetProvider, useWidget };
