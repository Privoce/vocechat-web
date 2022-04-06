// import React from "react";
// import toast from "react-hot-toast";
// import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { BsChatText } from "react-icons/bs";
import { RiUserAddLine } from "react-icons/ri";
import { IoShareOutline } from "react-icons/io5";
import styled from "styled-components";

import Avatar from "../../common/component/Avatar";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 80px;
  width: 432px;
  gap: 4px;

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .name {
    user-select: text;
    font-weight: bold;
    font-size: 18px;
    line-height: 100%;
    color: #1c1c1e;
  }
  .email {
    user-select: text;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #78787c;
  }
  .icons {
    display: flex;
    align-items: center;
    padding: 26px 0;
    gap: 28px;
    .icon {
    }
  }
  .line {
    width: 100%;
    height: 1px;
    border: none;
    background-color: rgba(0, 0, 0, 0.1);
  }
  &.card {
    padding: 16px;
    width: 332px;
    background: #ffffff;
    box-shadow: 0px 20px 25px 20px rgba(31, 41, 55, 0.1),
      0px 10px 10px rgba(31, 41, 55, 0.04);
    border-radius: 6px;
    .icons {
      padding-bottom: 2px;
    }
  }
`;
export default function Profile({ uid = null, type = "embed" }) {
  const data = useSelector((store) => store.contacts.byId[uid]);
  if (!data) return null;
  // console.log("profile", data);
  const { name, email, avatar } = data;
  return (
    <StyledWrapper className={type}>
      <Avatar className="avatar" url={avatar} name={name} />
      <h2 className="name">{name}</h2>
      <span className="email">{email}</span>
      <ul className="icons">
        <li className="icon chat">
          <NavLink to={`/chat/dm/${uid}`}>
            <BsChatText size={20} color="#616161" />
          </NavLink>
        </li>
        <li className="icon add">
          {/* <NavLink to={`/chat/dm/${uid}`}> */}
          <RiUserAddLine size={20} color="#616161" />
          {/* </NavLink> */}
        </li>
        <li className="icon share">
          {/* <NavLink to={`/chat/dm/${uid}`}> */}
          <IoShareOutline size={20} color="#616161" />
          {/* </NavLink> */}
        </li>
      </ul>
      {type == "embed" && <hr className="line" />}
    </StyledWrapper>
  );
}
