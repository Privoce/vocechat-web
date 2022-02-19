// import React from "react";
// import toast from "react-hot-toast";
import { useState, useEffect } from "react";
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
    font-weight: bold;
    font-size: 18px;
    line-height: 100%;
    color: #1c1c1e;
  }
  .email {
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
`;
export default function Profile({ uid = null }) {
  const contacts = useSelector((store) => store.contacts);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    if (contacts && contacts) {
      setProfile(contacts.find((c) => c.uid == uid));
    } else {
      setProfile(null);
    }
  }, [uid, contacts]);
  if (!profile) return null;
  console.log({ profile });
  const { name, email, avatar } = profile;
  return (
    <StyledWrapper>
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
      <hr className="line" />
    </StyledWrapper>
  );
}
