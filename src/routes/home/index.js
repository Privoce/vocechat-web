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

import ChatIcon from "../../assets/icons/chat.svg?url";
import ContactIcon from "../../assets/icons/contact.svg?url";
import FolderIcon from "../../assets/icons/folder.svg?url";
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
          <nav className="nav">
            <NavLink className="link" to={"/chat"}>
              <Tooltip tip="Chat">
                <img src={ChatIcon} alt="chat icon" />
              </Tooltip>
            </NavLink>
            <NavLink className="link" to={"/contacts"}>
              <Tooltip tip="Members">
                <img src={ContactIcon} alt="contact icon" />
              </Tooltip>
            </NavLink>
            <NavLink className="link" to={"/files"}>
              <Tooltip tip="Files">
                <img src={FolderIcon} alt="folder icon" />
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
