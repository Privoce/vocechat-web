// import { useState, useEffect, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "@/app/store";
import { LoginConfig, WhoCanSignUp } from "@/types/server";
import SettingBlock from "@/components/SettingBlock";
import StyledRadio from "@/components/styled/Radio";
import useConfig from "@/hooks/useConfig";
import ChatLayout from "./ChatLayout";
import ContactVerification from "./ContactVerification";
import DarkMode from "./DarkMode";
import FrontendURL from "./FrontendURL";
import Language from "./Language";
import OnlineStatus from "./OnlineStatus";
import MessageSound from "./MessageSound";
import Server from "./Server";
import { shallowEqual } from "react-redux";
import OnlyAdminCreateGroup from "./OnlyAdminCreateGroup";
import OnlyAdminCanSeeChannelMembers from "./OnlyAdminSeeChannelMembers";

export default function Overview() {
  const { t } = useTranslation("setting");
  const isAdmin = useAppSelector((store) => store.authData.user?.is_admin, shallowEqual);
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

  return (
    <div className="relative w-full md:w-[512px] flex flex-col gap-6">
      <Server />
      {isAdmin && (
        <>
          {/* 设置前端 url */}
          <FrontendURL />
          <div className="flex flex-col">
            <h4 className="font-bold text-gray-700 dark:text-white">{t("overview.title_feat")}</h4>
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
          {/* 只有 admin 能创建群组 */}

          <OnlyAdminCreateGroup />
          <OnlyAdminCanSeeChannelMembers />
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
          <OnlineStatus />
          {/* 会话布局 */}
          <ChatLayout />
          {/* 联系人验证模式 */}
          <ContactVerification />
        </>
      )}

      <Language />
      <DarkMode />
      {/* 新消息声音 */}
      <MessageSound />
    </div>
  );
}
