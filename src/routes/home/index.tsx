import { memo } from "react";
import { Outlet, NavLink, useLocation, useMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";

import StyledWrapper from "./styled";
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

  return (
    <>
      <Manifest />
      {!guest && <Notification />}
      <StyledWrapper className={guest ? "guest" : ""}>
        {!guest && (
          <div className={`col left`}>
            {loginUid && <User uid={loginUid} />}
            <nav className="link_navs">
              <NavLink
                className={() => {
                  return `link ${isChattingPage ? "active" : ""}`;
                }}
                to={chatNav}
              >
                <Tooltip tip={t("chat")}>
                  <ChatIcon />
                </Tooltip>
              </NavLink>
              <NavLink className="link" to={userNav}>
                <Tooltip tip={t("members")}>
                  <UserIcon />
                </Tooltip>
              </NavLink>
              <NavLink className="link" to={"/favs"}>
                <Tooltip tip={t("favs")}>
                  <FavIcon />
                </Tooltip>
              </NavLink>
              <NavLink className="link" to={"/files"}>
                <Tooltip tip={t("files")}>
                  <FolderIcon />
                </Tooltip>
              </NavLink>
            </nav>
            <Menu />
          </div>
        )}
        <div className="col right">
          <Outlet />
        </div>
      </StyledWrapper>
    </>
  );
}
export default memo(HomePage);
