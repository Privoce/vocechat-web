// import React from 'react';
import { useState } from "react";
import StyledWrapper from "./styled";
import { Outlet, NavLink } from "react-router-dom";
import ServerDropList from "./ServerDropList";
import Tools from "./Tools";
import usePreload from "./usePreload";

import CurrentUser from "./CurrentUser";

import ChatIcon from "../../assets/icons/chat.svg";
import ContactIcon from "../../assets/icons/contact.svg";
import NotificationHub from "../../common/component/NotificationHub";

export default function HomePage() {
  const { data, error, success } = usePreload();
  const [collaspe, setCollaspe] = useState(false);
  const toggleCollaspe = () => {
    setCollaspe((prev) => !prev);
  };
  console.log({ data, error, success });
  return (
    <>
      <NotificationHub />
      <StyledWrapper>
        <div className={`col left ${collaspe ? "collaspe" : ""}`}>
          <ServerDropList
            data={data?.server}
            collaspe={collaspe}
            toggle={toggleCollaspe}
          />
          <nav className="nav">
            <NavLink className="link" to={"/chat"}>
              <img src={ChatIcon} alt="chat icon" /> {!collaspe && `Chat`}
            </NavLink>
            <NavLink className="link" to={"/contacts"}>
              <img src={ContactIcon} alt="contact icon" />{" "}
              {!collaspe && `Contacts`}
            </NavLink>
          </nav>
          <Tools collaspe={collaspe} />
          <CurrentUser collaspe={collaspe} />
        </div>
        <div className="col right">
          <Outlet />
        </div>
      </StyledWrapper>
    </>
  );
}
