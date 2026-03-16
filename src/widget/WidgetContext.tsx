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
const popupTitle = decodeURIComponent(query.get("popupTitle") || "Need help?");
const popupSubtitle = decodeURIComponent(query.get("popupSubtitle") || "Our staff are always ready to help!");
const popupImage = decodeURIComponent(query.get("popupImage") || "");
const popupClosable = decodeURIComponent(query.get("popupClosable") || "true") == "true";
const showPopup = decodeURIComponent(query.get("showPopup") || "true") == "true";
const fgColor = getContrastColor(color);
// 从 URL 参数读取 embed 状态，如果没有则检测是否在 iframe 中
const embedParam = query.get("embed");
const embed = embedParam === "true" || (embedParam === null && isInIframe());
// 读取尺寸参数
const openWidth = parseInt(query.get("openWidth") || "380");
const openHeight = parseInt(query.get("openHeight") || "680");
const closeWidth = parseInt(query.get("closeWidth") || "48");
const closeHeight = parseInt(query.get("closeHeight") || "48");
const isMobile = query.get("isMobile") === "true";
const WidgetContext = createContext({
  id,
  token,
  autoReg,
  color,
  fgColor,
  // 判断是否是 iframe 或 shadow DOM 上下文
  embed,
  from,
  loading: true,
  inviteOnly: false,
  title,
  logo,
  welcome,
  popupTitle,
  popupSubtitle,
  popupImage,
  popupClosable,
  showPopup,
  serverVersion: "",
  openWidth,
  openHeight,
  closeWidth,
  closeHeight,
  isMobile
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
        popupTitle,
        popupSubtitle,
        popupImage,
        popupClosable,
        showPopup,
        serverVersion: data,
        openWidth,
        openHeight,
        closeWidth,
        closeHeight,
        isMobile
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
