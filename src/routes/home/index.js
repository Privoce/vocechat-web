// import React from 'react';
// import { useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import StyledWrapper from "./styled";
import User from "./User";
// import Tools from "./Tools";
import Loading from "./Loading";
import Menu from "./Menu";
import usePreload from "./usePreload";
import Tooltip from "../../common/component/Tooltip";
import Notification from "../../common/component/Notification";

import ChatIcon from "../../assets/icons/chat.svg";
import ContactIcon from "../../assets/icons/contact.svg";
import FavIcon from "../../assets/icons/bookmark.svg";
import FolderIcon from "../../assets/icons/folder.svg";
// const routes = ["/setting", "/setting/channel/:cid"];
export default function HomePage() {
  const { pathname } = useLocation();
  const {
    loginUid,
    ui: { ready },
  } = useSelector((store) => {
    return {
      ui: store.ui,
      loginUid: store.authData.uid,
    };
  });
  const { loading } = usePreload();
  // console.log("index loading", loading, ready);
  if (loading || !ready) {
    return <Loading />;
  }
  const isSettingPage = pathname.startsWith("/setting");
  if (isSettingPage) {
    return (
      <>
        <Notification />
        <Outlet />
      </>
    );
  }
  return (
    <>
      <Notification />
      <StyledWrapper>
        <div className={`col left`}>
          <User uid={loginUid} />
          <nav className="link_navs">
            <NavLink className="link" to={"/chat"}>
              <Tooltip tip="Chat">
                <ChatIcon />
              </Tooltip>
            </NavLink>
            <NavLink className="link" to={"/contacts"}>
              <Tooltip tip="Members">
                <ContactIcon />
              </Tooltip>
            </NavLink>
            <NavLink className="link" to={"/favs"}>
              <Tooltip tip="Favorites">
                <FavIcon className="fav" />
              </Tooltip>
            </NavLink>
            <NavLink className="link" to={"/files"}>
              <Tooltip tip="Files">
                <FolderIcon />
              </Tooltip>
            </NavLink>
          </nav>
          <div className="divider"></div>
          <Menu />
        </div>
        <div className="col right">
          <Outlet />
        </div>
      </StyledWrapper>
    </>
  );
}
