import { memo } from "react";
import { Outlet, NavLink, useLocation, useMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";

import User from "./User";
import Loading from "../../common/component/Loading";
import Menu from "./Menu";
import usePreload from "../../common/hook/usePreload";
import Tooltip from "../../common/component/Tooltip";
import Notification from "../../common/component/Notification";
import Manifest from "../../common/component/Manifest";

import ChatIcon from "../../assets/icons/chat.svg";
import UserIcon from "../../assets/icons/user.svg";
import FavIcon from "../../assets/icons/bookmark.svg";
import FolderIcon from "../../assets/icons/folder.svg";
import { useAppSelector } from "../../app/store";
// const routes = ["/setting", "/setting/channel/:cid"];
function HomePage() {
  const { t } = useTranslation();
  const isHomePath = useMatch(`/`);
  const isChatHomePath = useMatch(`/chat`);
  const { pathname } = useLocation();
  const {
    loginUid,
    guest,
    ui: {
      ready,
      rememberedNavs: { chat: chatPath, user: userPath }
    }
  } = useAppSelector((store) => {
    return {
      ui: store.ui,
      loginUid: store.authData.user?.uid,
      guest: store.authData.guest
    };
  });
  const { success } = usePreload();
  if (!success || !ready) {
    return <Loading reload={true} fullscreen={true} />;
  }
  const isSettingPage = pathname.startsWith("/setting");
  const isChattingPage = isHomePath || pathname.startsWith("/chat");
  if (isSettingPage) {
    return (
      <>
        <Outlet />
      </>
    );
  }
  // 有点绕
  const chatNav = isChatHomePath ? "/chat" : chatPath || "/chat";
  const userNav = userPath || "/users";
  const linkClass = `flex items-center gap-2.5 px-3 py-2 font-semibold text-sm text-gray-600 rounded-lg hover:bg-gray-800/10`;
  return (
    <>
      <Manifest />
      {!guest && <Notification />}
      <div className={`vocechat-container flex w-screen h-screen bg-[#e5e7eb] dark:bg-[#121926]`}>
        {!guest && (
          <div className={`h-full flex flex-col items-center relative w-16 bg-transparent transition-all`}>
            {loginUid && <User uid={loginUid} />}
            <nav className="flex flex-col gap-1 px-3 py-6">
              <NavLink
                className={() => {
                  return `${linkClass} ${isChattingPage ? "bg-primary-400 hover:bg-primary-400" : ""}`;
                }}
                to={chatNav}
              >
                {({ isActive }) => {
                  return <Tooltip tip={t("chat")}>
                    <ChatIcon className={(isActive || isChattingPage) ? "fill-white" : ""} />
                  </Tooltip>;
                }}

              </NavLink>
              <NavLink className={({ isActive }) => `${linkClass} ${isActive ? 'bg-primary-400 hover:bg-primary-400' : ""}`} to={userNav}>
                {({ isActive }) => {
                  return <Tooltip tip={t("members")}>
                    <UserIcon className={isActive ? "fill-white" : ""} />
                  </Tooltip>;
                }}

              </NavLink>
              <NavLink className={({ isActive }) => `${linkClass} ${isActive ? 'bg-primary-400 hover:bg-primary-400' : ""}`} to={"/favs"}>
                {({ isActive }) => {
                  return <Tooltip tip={t("favs")}>
                    <FavIcon className={isActive ? "fill-white" : ""} />
                  </Tooltip>;
                }}


              </NavLink>
              <NavLink className={({ isActive }) => `${linkClass} ${isActive ? 'bg-primary-400 hover:bg-primary-400' : ""}`} to={"/files"}>
                {({ isActive }) => {
                  return <Tooltip tip={t("files")}>
                    <FolderIcon className={isActive ? "fill-white" : ""} />
                  </Tooltip>;
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
    </>
  );
}
export default memo(HomePage);
