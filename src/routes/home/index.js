// import React from 'react';
// import { useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenuExpand } from "../../app/slices/ui";
import StyledWrapper from "./styled";
import ServerDropList from "./ServerDropList";
import Tools from "./Tools";
import Menu from "./Menu";
import usePreload from "./usePreload";
import SettingModal from "../../common/component/Setting";
import ChannelSettingModal from "../../common/component/ChannelSetting";

import ChatIcon from "../../assets/icons/chat.svg";
import ContactIcon from "../../assets/icons/contact.svg";
import NotificationHub from "../../common/component/NotificationHub";

export default function HomePage() {
  const dispatch = useDispatch();
  const {
    ui: { menuExpand, setting, channelSetting },
    authData: { usersVersion, afterMid },
  } = useSelector((store) => {
    return {
      authData: store.authData,
      ui: store.ui,
      contacts: store.contacts,
    };
  });
  const { data, loading, error, success } = usePreload();

  // useEffect(() => {
  //   if (authData) {
  //     dispatch(setAuthData(data));
  //   }
  // }, [authData]);

  const toggleExpand = () => {
    dispatch(toggleMenuExpand());
  };
  console.log({ data, error, success });
  if (loading) {
    return "loading";
  }
  return (
    <>
      <NotificationHub usersVersion={usersVersion} afterMid={afterMid} />
      <StyledWrapper>
        <div className={`col left ${menuExpand ? "expand" : ""}`}>
          <ServerDropList data={data?.server} expand={menuExpand} />
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
          </nav>
          <div className="divider"></div>
          <Tools expand={menuExpand} />
          <Menu toggle={toggleExpand} expand={menuExpand} />
          {/* <CurrentUser expand={menuExpand} /> */}
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
