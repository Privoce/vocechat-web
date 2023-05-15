// import { useState, useEffect, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import StyledRadio from "@/components/styled/Radio";
import { useAppSelector } from "@/app/store";
import { LoginConfig, WhoCanSignUp } from "@/types/server";
import useConfig from "@/hooks/useConfig";
import Server from './Server';
import Language from './Language';
import FrontendURL from "./FrontendURL";
import DarkMode from "./DarkMode";
import ServerVersionChecker from "@/components/ServerVersionChecker";
import OnlineStatus from "./OnlineStatus";
import ChatLayout from "./ChatLayout";
import SettingBlock from "./SettingBlock";
import ContactVerification from "./ContactVerification";

export default function Overview() {
  const { t } = useTranslation("setting");
  const { loginUser } = useAppSelector((store) => {
    return { loginUser: store.authData.user };
  });
  const { values: loginConfig, updateConfig: updateLoginConfig } = useConfig("login");
  const handleUpdateWhoCanSignUp = (value: WhoCanSignUp) => {
    updateLoginConfig({ ...loginConfig, who_can_sign_up: value });
  };

  const handleGuestToggle = (v: "true" | "false") => {
    const guest = v === "true";
    updateLoginConfig({ ...loginConfig, guest });
  };
  if (!loginConfig) return null;
  const { who_can_sign_up: whoCanSignUp, guest = false } = loginConfig as LoginConfig;
  const isAdmin = loginUser?.is_admin;

  return (
    <div className="relative w-full md:w-[512px] flex flex-col gap-6">
      <Server />
      {isAdmin && (
        <>
          <div className="flex flex-col">
            <h4 className="font-bold text-gray-700 dark:text-white">{t("overview.title_feat")}</h4>
            <p className="text-gray-400 text-xs">{t("overview.title_feat_desc")}</p>
          </div>
          {/* 注册开放与否 */}
          <SettingBlock title={t("overview.sign_up.title")} desc={t("overview.sign_up.desc")}>
            <StyledRadio
              options={[t("overview.sign_up.everyone"), t("overview.sign_up.invite")]}
              values={["EveryOne", "InvitationOnly"]}
              value={whoCanSignUp}
              onChange={(v: WhoCanSignUp) => {
                handleUpdateWhoCanSignUp(v);
              }}
            />
          </SettingBlock>
          {/* 访客模式 */}
          <SettingBlock title={t("overview.guest_mode.title")} desc={t("overview.guest_mode.desc")}>
            <StyledRadio
              options={[t("overview.guest_mode.enable"), t("overview.guest_mode.disable")]}
              values={["true", "false"]}
              value={`${guest}`}
              onChange={(v) => {
                handleGuestToggle(v);
              }}
            />
          </SettingBlock>
          {/* 是否显示在线提示 */}
          <ServerVersionChecker version="0.3.4" empty={true}>
            <OnlineStatus />
          </ServerVersionChecker>
          {/* 会话布局 */}
          <ServerVersionChecker version="0.3.7" empty={true}>
            <ChatLayout />
          </ServerVersionChecker>
          {/* 联系人验证模式 */}
          <ServerVersionChecker version="0.3.7" empty={true}>
            <ContactVerification />
          </ServerVersionChecker>
          {/* 设置前端url */}
          <ServerVersionChecker version="0.3.3" empty={true}>
            <FrontendURL />
          </ServerVersionChecker>

        </>
      )}

      <Language />
      <DarkMode />
    </div>
  );
}
