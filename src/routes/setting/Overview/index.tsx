// import { useState, useEffect, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "@/app/store";
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
import EnableURLPreviewInMsg from "./URLPreview";
import ServerMsgNotify from "./ServerMsgEmailNotify";
import GuestMode from "./GuestMode";
import WhoCanSignUpSetting from "./WhoCanSignUpSetting";
import UserMsgEmailNotify from "./UserMsgEmailNotify";
import WhoCanInviteUsers from "./WhoCanInviteUsers";
import WebClientAutoUpdate from "./WebClientAutoUpdate";

export default function Overview() {
  const { t } = useTranslation("setting");
  const isAdmin = useAppSelector((store) => store.authData.user?.is_admin, shallowEqual);

  return (
    <div className="relative w-full md:w-[512px] flex flex-col gap-6">
      <Server />
      {/* 全局性的邮件消息通知 */}
      {isAdmin && <ServerMsgNotify />}
      <UserMsgEmailNotify />
      {isAdmin && (
        <>
          {/* 设置前端 url */}
          <FrontendURL />
          <div className="flex flex-col">
            <h4 className="font-bold text-gray-700 dark:text-white">{t("overview.title_feat")}</h4>
          </div>

          {/* 注册开放与否 */}
          <WhoCanSignUpSetting />
          {/* 只有 admin 能创建群组 */}

          <EnableURLPreviewInMsg />
          <WhoCanInviteUsers />
          <OnlyAdminCanSeeChannelMembers />
          {/* 访客模式 */}
          <GuestMode />

          {/* 是否显示在线提示 */}
          <OnlineStatus />
          {/* 会话布局 */}
          <ChatLayout />
          {/* 联系人验证模式 */}
          <ContactVerification />
          {/* 前端自动更新 */}
          <WebClientAutoUpdate />
        </>
      )}

      <Language />
      <DarkMode />
      {/* 新消息声音 */}
      <MessageSound />
      {isAdmin && <OnlyAdminCreateGroup />}
    </div>
  );
}
