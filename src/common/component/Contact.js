// import React from 'react';
import styled from "styled-components";
import { useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import "tippy.js/animations/scale-subtle.css";
import Avatar from "./Avatar";
import Profile from "./Profile";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  user-select: none;
  &.interactive {
    &:hover,
    &.active {
      background: rgba(116, 127, 141, 0.1);
    }
  }
  .avatar {
    cursor: pointer;
    width: 32px;
    height: 32px;
    position: relative;
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
    .status {
      position: absolute;
      bottom: 0;
      right: -2px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      outline: 2px solid #fff;
      &.online {
        background-color: #22c55e;
      }
      &.offline {
        background-color: #a1a1aa;
      }
      &.alert {
        background-color: #dc2626;
      }
    }
  }
  .name {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #52525b;
  }
`;
export default function Contact({
  interactive = true,
  uid = "",
  popover = false,
}) {
  const contacts = useSelector((store) => store.contacts);
  if (!contacts) return null;
  const currUser = contacts.find((c) => c.uid == uid);
  return (
    <StyledWrapper className={`${interactive ? "interactive" : ""}`}>
      <Tippy
        inertia={true}
        animation="scale"
        interactive
        disabled={!popover}
        placement="left"
        trigger="click"
        content={<Profile data={currUser} type="card" />}
      >
        <div className="avatar">
          <Avatar url={currUser?.avatar} name={currUser?.name} alt="avatar" />
          <div
            className={`status ${currUser?.online ? "online" : "offline"}`}
          ></div>
        </div>
      </Tippy>
      <span className="name">{currUser?.name}</span>
    </StyledWrapper>
  );
}
