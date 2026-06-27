import React from "react";
import { NavLink, useLocation, useMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import ChatIcon from "@/assets/icons/chat.svg";
import SettingIcon from "@/assets/icons/setting.svg";
import UserIcon from "@/assets/icons/user.svg";
import { useAppSelector } from "../../app/store";
import { shallowEqual } from "react-redux";

const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
    <path d="M10.55 2.533a2.25 2.25 0 0 1 2.9 0l6.75 5.695c.508.428.8 1.057.8 1.72v9.802a1.75 1.75 0 0 1-1.75 1.75h-3.5a1.75 1.75 0 0 1-1.75-1.75v-5a.25.25 0 0 0-.25-.25h-3.5a.25.25 0 0 0-.25.25v5a1.75 1.75 0 0 1-1.75 1.75h-3.5A1.75 1.75 0 0 1 3 19.75V9.948c0-.663.292-1.292.8-1.72l6.75-5.695Z" />
  </svg>
);

const MobileNavs = () => {
  const { t } = useTranslation("common");
  const isHomePath = useMatch(`/`);
  const { pathname } = useLocation();
  const isChatHomePath = useMatch(`/chat`);
  const isDMChat = useMatch(`/chat/dm/:user_id`);
  const isChannelChat = useMatch(`/chat/channel/:channel_id`);
  const { chat: chatPath, user: userPath } = useAppSelector(
    (store) => store.ui.rememberedNavs,
    shallowEqual
  );

  const linkClass = `flex`;
  const isChatPage = pathname.startsWith("/chat");
  const isChattingPage = !!isDMChat || !!isChannelChat;

  const chatNav = isChatHomePath ? "/chat" : chatPath || "/chat";
  const userNav = userPath || "/users";
  return (
    <ul
      className={clsx(
        "flex justify-around py-2 fixed bottom-0 left-0 w-full bg-gray-100 dark:bg-gray-800 md:hidden",
        isChattingPage && "hidden"
      )}
    >
      <li>
        <NavLink className={() => `${linkClass}`} to="/" end>
          {({ isActive }) => {
            const active = isActive || !!isHomePath;
            return (
              <div className="flex flex-col gap-1 items-center">
                <HomeIcon className={!active ? "fill-gray-500 text-gray-500" : "fill-primary-500 text-primary-500"} />
                <span className={clsx("text-xs", !active ? "text-gray-500" : "text-primary-500")}>
                  {t("home")}
                </span>
              </div>
            );
          }}
        </NavLink>
      </li>
      <li>
        <NavLink className={() => `${linkClass}`} to={chatNav}>
          {({ isActive }) => {
            const active = isActive || isChatPage;
            return (
              <div className="flex flex-col gap-1 items-center">
                <ChatIcon className={!active ? "fill-gray-500" : "fill-primary-500"} />
                <span className={clsx("text-xs", !active ? "text-gray-500" : "text-primary-500")}>
                  {t("chat")}
                </span>
              </div>
            );
          }}
        </NavLink>
      </li>
      <li>
        <NavLink className={() => `${linkClass}`} to={userNav}>
          {({ isActive: active }) => {
            return (
              <div className="flex flex-col gap-1 items-center">
                <UserIcon className={!active ? "fill-gray-500" : "fill-primary-500"} />
                <span className={clsx("text-xs", !active ? "text-gray-500" : "text-primary-500")}>
                  {t("members")}
                </span>
              </div>
            );
          }}
        </NavLink>
      </li>
      <li>
        <NavLink className={() => `${linkClass}`} to={"/setting"}>
          {({ isActive: active }) => {
            return (
              <div className="flex flex-col gap-1 items-center">
                <SettingIcon
                  className={clsx("w-6 h-6", !active ? "fill-gray-500" : "fill-primary-500")}
                />
                <span className={clsx("text-xs", !active ? "text-gray-500" : "text-primary-500")}>
                  {t("setting")}
                </span>
              </div>
            );
          }}
        </NavLink>
      </li>
    </ul>
  );
};

export default MobileNavs;
