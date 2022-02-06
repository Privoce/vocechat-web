// import React from 'react';
// import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenuExpand } from "../../app/slices/ui";
import StyledWrapper from "./styled";
import ServerDropList from "./ServerDropList";
import Tools from "./Tools";
import usePreload from "./usePreload";

import CurrentUser from "./CurrentUser";

import ChatIcon from "../../assets/icons/chat.svg";
import ContactIcon from "../../assets/icons/contact.svg";
import NotificationHub from "../../common/component/NotificationHub";

export default function HomePage() {
  const dispatch = useDispatch();
  const { menuExpand, token, usersVersion } = useSelector((store) => {
    return {
      token: store.authData.token,
      usersVersion: store.authData.usersVersion,
      menuExpand: store.ui.menuExpand,
    };
  });
  const { data, error, success } = usePreload();
  const toggleExpand = () => {
    dispatch(toggleMenuExpand());
  };
  console.log({ data, error, success });
  return (
    <>
      <NotificationHub token={token} usersVersion={usersVersion} />
      <StyledWrapper>
        <div className={`col left ${menuExpand ? "expand" : ""}`}>
          <ServerDropList
            data={data?.server}
            expand={menuExpand}
            toggle={toggleExpand}
          />
          <nav className="nav">
            <NavLink className="link" to={"/chat"}>
              <img src={ChatIcon} alt="chat icon" /> {menuExpand && `Chat`}
            </NavLink>
            <NavLink className="link" to={"/contacts"}>
              <img src={ContactIcon} alt="contact icon" />{" "}
              {menuExpand && `Contacts`}
            </NavLink>
          </nav>
          <Tools expand={menuExpand} />
          <CurrentUser expand={menuExpand} />
        </div>
        <div className="col right">
          <Outlet />
        </div>
      </StyledWrapper>
    </>
  );
}
