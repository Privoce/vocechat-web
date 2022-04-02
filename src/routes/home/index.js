// import React from 'react';
// import { useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenuExpand } from "../../app/slices/ui";
import StyledWrapper from "./styled";
import ServerDropList from "./ServerDropList";
// import Tools from "./Tools";
import Loading from "./Loading";
import Menu from "./Menu";
import usePreload from "./usePreload";
import Notification from "../../common/component/Notification";
import SettingModal from "../../common/component/Setting";
import ChannelSettingModal from "../../common/component/ChannelSetting";

import ChatIcon from "../../assets/icons/chat.svg?url";
import ContactIcon from "../../assets/icons/contact.svg?url";
import FolderIcon from "../../assets/icons/folder.svg?url";

export default function HomePage() {
  const dispatch = useDispatch();
  const {
    ui: { ready, menuExpand, setting, channelSetting },
  } = useSelector((store) => {
    return {
      ui: store.ui,
    };
  });
  const { data, loading } = usePreload();
  const toggleExpand = () => {
    dispatch(toggleMenuExpand());
  };
  // console.log("index loading", loading, ready);
  if (loading || !ready) {
    return <Loading />;
  }
  return (
    <>
      <Notification />
      <StyledWrapper>
        <div className={`col left ${menuExpand ? "expand" : ""}`}>
          <ServerDropList
            data={data?.server}
            memberCount={data.contacts?.length}
            expand={menuExpand}
          />
          <nav className="nav">
            <NavLink className="link" to={"/chat"}>
              <img src={ChatIcon} alt="chat icon" />{" "}
              {menuExpand && (
                <span className="animate__animated animate__fadeIn">Chat</span>
              )}
            </NavLink>
            <NavLink className="link" to={"/contacts"}>
              <img src={ContactIcon} alt="contact icon" />{" "}
              {menuExpand && (
                <span className="animate__animated animate__fadeIn">
                  Contacts
                </span>
              )}
            </NavLink>
            <NavLink className="link" to={"/files"}>
              <img src={FolderIcon} alt="folder icon" />{" "}
              {menuExpand && (
                <span className="animate__animated animate__fadeIn">Files</span>
              )}
            </NavLink>
          </nav>
          <div className="divider"></div>
          {/* <Tools expand={menuExpand} /> */}
          <Menu toggle={toggleExpand} expand={menuExpand} />
        </div>
        <div className="col right">
          <Outlet />
        </div>
      </StyledWrapper>
      {setting && <SettingModal />}
      {channelSetting && <ChannelSettingModal id={channelSetting} />}
    </>
  );
}
