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
import Tooltip from "../../common/component/Tooltip";
import Notification from "../../common/component/Notification";
import SettingModal from "../../common/component/Setting";
import ChannelSettingModal from "../../common/component/ChannelSetting";

import ChatIcon from "../../assets/icons/chat.svg?url";
import ContactIcon from "../../assets/icons/contact.svg?url";
import FolderIcon from "../../assets/icons/folder.svg?url";

export default function HomePage() {
  const dispatch = useDispatch();
  const {
    ui: { ready, setting, channelSetting },
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
        <div className={`col left`}>
          <ServerDropList
            data={data?.server}
            memberCount={data.contacts?.length}
            expand={false}
          />
          <nav className="nav">
            <NavLink className="link" to={"/chat"}>
              <Tooltip tip="Chat">
                <img src={ChatIcon} alt="chat icon" />
              </Tooltip>
              {/* {menuExpand && (
                <span className="animate__animated animate__fadeIn">Chat</span>
              )} */}
            </NavLink>
            <NavLink className="link" to={"/contacts"}>
              <Tooltip tip="Channel">
                <img src={ContactIcon} alt="contact icon" />
              </Tooltip>
              {/* {menuExpand && (
                <span className="animate__animated animate__fadeIn">
                  Contacts
                </span>
              )} */}
            </NavLink>
            <NavLink className="link" to={"/files"}>
              <Tooltip tip="Files">
                <img src={FolderIcon} alt="folder icon" />
              </Tooltip>
              {/* {menuExpand && (
                <span className="animate__animated animate__fadeIn">Files</span>
              )} */}
            </NavLink>
          </nav>
          <div className="divider"></div>
          {/* <Tools expand={menuExpand} /> */}
          <Menu toggle={toggleExpand} />
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
