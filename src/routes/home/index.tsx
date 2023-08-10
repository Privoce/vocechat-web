import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useLocation, useMatch } from "react-router-dom";

import { updateRememberedNavs } from "@/app/slices/ui";
import { useAppSelector } from "@/app/store";
import Loading from "@/components/Loading";
import Manifest from "@/components/Manifest";
import Notification from "@/components/Notification";
import ReLoginModal from "@/components/ReLoginModal";
import Tooltip from "@/components/Tooltip";
import UnreadTabTip from "@/components/UnreadTabTip";
import Voice from "@/components/Voice";
import usePreload from "@/hooks/usePreload";
import FavIcon from "@/assets/icons/bookmark.svg";
import ChatIcon from "@/assets/icons/chat.svg";
import FolderIcon from "@/assets/icons/folder.svg";
import UserIcon from "@/assets/icons/user.svg";
import Menu from "./Menu";
import MobileNavs from "./MobileNavs";
import User from "./User";

function HomePage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isHomePath = useMatch(`/`);
  const isChatHomePath = useMatch(`/chat`);
  const { pathname } = useLocation();
  const {
    roleChanged,
    loginUser: { uid: loginUid },
    guest,
    ui: {
      rememberedNavs: { chat: chatPath, user: userPath }
    }
  } = useAppSelector((store) => {
    return {
      ui: store.ui,
      loginUser: store.authData.user ?? { uid: 0, is_admin: false },
      guest: store.authData.guest,
      roleChanged: store.authData.roleChanged
    };
  });
  // preload basic data
  const { success } = usePreload();
  useEffect(() => {
    if (isChatHomePath) {
      dispatch(updateRememberedNavs({ key: "chat", path: "/chat" }));
    }
  }, [isChatHomePath]);

  console.info("preload success", success);
  if (!success) {
    return <Loading reload={true} fullscreen={true} context="home-route" />;
  }
  const isSettingPage = pathname.startsWith("/setting");
  const isChattingPage = isHomePath || pathname.startsWith("/chat");
  if (isSettingPage) {
    return <Outlet />;
  }
  // 有点绕
  const chatNav = isChatHomePath ? "/chat" : chatPath || "/chat";
  const userNav = userPath || "/users";
  const linkClass = `flex items-center gap-2.5 px-3 py-2 font-semibold text-sm text-gray-600 rounded-lg md:hover:bg-gray-800/10`;
  return (
    <>
      {roleChanged && <ReLoginModal />}
      {!guest && <UnreadTabTip />}
      {!guest && <Voice />}
      <Manifest />
      {!guest && <Notification />}
      <div
        className={`vocechat-container flex w-screen h-screen bg-neutral-100 dark:bg-neutral-900`}
      >
        {!guest && (
          <div
            className={`hidden md:flex h-full flex-col items-center relative w-16 transition-all`}
          >
            {loginUid && <User uid={loginUid} />}
            <nav className="flex flex-col gap-1 px-3 py-6">
              <NavLink
                className={({ isActive }) =>
                  `${linkClass} ${
                    isActive || isChattingPage ? "bg-primary-400 md:hover:bg-primary-400" : ""
                  }`
                }
                to={chatNav}
              >
                {({ isActive }) => {
                  return (
                    <Tooltip tip={t("chat")}>
                      <ChatIcon className={isActive || isChattingPage ? "fill-white" : ""} />
                    </Tooltip>
                  );
                }}
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? "bg-primary-400 md:hover:bg-primary-400" : ""}`
                }
                to={userNav}
              >
                {({ isActive }) => {
                  return (
                    <Tooltip tip={t("members")}>
                      <UserIcon className={isActive ? "fill-white" : ""} />
                    </Tooltip>
                  );
                }}
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? "bg-primary-400 md:hover:bg-primary-400" : ""}`
                }
                to={"/favs"}
              >
                {({ isActive }) => {
                  return (
                    <Tooltip tip={t("favs")}>
                      <FavIcon className={isActive ? "fill-white" : ""} />
                    </Tooltip>
                  );
                }}
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? "bg-primary-400 md:hover:bg-primary-400" : ""}`
                }
                to={"/files"}
              >
                {({ isActive }) => {
                  return (
                    <Tooltip tip={t("files")}>
                      <FolderIcon className={isActive ? "fill-white" : ""} />
                    </Tooltip>
                  );
                }}
              </NavLink>
            </nav>
            <Menu />
          </div>
        )}
        <div className="h-full flex flex-col w-full">
          <Outlet />
        </div>
      </div>
      {!guest && <MobileNavs />}
    </>
  );
}
export default memo(HomePage);
