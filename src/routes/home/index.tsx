// import React from 'react';
import { Outlet, NavLink, useLocation, useMatch } from "react-router-dom";
import StyledWrapper from "./styled";
import User from "./User";
// import Tools from "./Tools";
import Loading from "../../common/component/Loading";
import Menu from "./Menu";
import usePreload from "./usePreload";
import Tooltip from "../../common/component/Tooltip";
import Notification from "../../common/component/Notification";
import Manifest from "../../common/component/Manifest";

import ChatIcon from "../../assets/icons/chat.svg";
import UserIcon from "../../assets/icons/user.svg";
import FavIcon from "../../assets/icons/bookmark.svg";
import FolderIcon from "../../assets/icons/folder.svg";
import { useAppSelector } from "../../app/store";
// const routes = ["/setting", "/setting/channel/:cid"];
export default function HomePage() {
  const isHomePath = useMatch(`/`);
  const isChatHomePath = useMatch(`/chat`);
  const { pathname } = useLocation();
  const {
    loginUid,
    ui: {
      ready,
      rememberedNavs: { chat: chatPath, user: userPath }
    }
  } = useAppSelector((store) => {
    return {
      ui: store.ui,
      loginUid: store.authData.user?.uid
    };
  });
  const { loading } = usePreload();
  if (loading || !ready) {
    return <Loading reload={true} fullscreen={true} />;
  }
  const isSettingPage = pathname.startsWith("/setting");
  const isChattingPage = isHomePath || pathname.startsWith("/chat");
  if (isSettingPage) {
    return (
      <>
        <Notification />
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
      <Notification />
      <StyledWrapper>
        <div className={`col left`}>
          {loginUid && <User uid={loginUid} />}
          <nav className="link_navs">
            <NavLink
              className={() => {
                return `link ${isChattingPage ? "active" : ""}`;
              }}
              to={chatNav}
            >
              <Tooltip tip="Chat">
                <ChatIcon />
              </Tooltip>
            </NavLink>
            <NavLink className="link" to={userNav}>
              <Tooltip tip="Members">
                <UserIcon />
              </Tooltip>
            </NavLink>
            <NavLink className="link" to={"/favs"}>
              <Tooltip tip="Saved Items">
                <FavIcon />
              </Tooltip>
            </NavLink>
            <NavLink className="link" to={"/files"}>
              <Tooltip tip="Files">
                <FolderIcon />
              </Tooltip>
            </NavLink>
          </nav>
          {/* <div className="divider"></div> */}
          <Menu />
        </div>
        <div className="col right">
          <Outlet />
        </div>
      </StyledWrapper>
    </>
  );
}
