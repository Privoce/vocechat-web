// import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import IconOwner from "../../assets/icons/owner.svg";
import Avatar from "./Avatar";
import Profile from "./Profile";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  user-select: none;
  &.compact {
    padding: 0;
  }
  &.interactive {
    &:hover,
    &.active {
      background: rgba(116, 127, 141, 0.1);
    }
  }
  .avatar {
    cursor: pointer;
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};
    position: relative;
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
    .status {
      position: absolute;
      bottom: -2px;
      right: -4px;
      width: 10px;
      height: 10px;
      box-sizing: content-box;
      border-radius: 50%;
      border: 2px solid #fff;
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
    /* user-select: text; */
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #52525b;
  }
`;
export default function Contact({
  cid = null,
  owner = false,
  dm = false,
  interactive = true,
  uid = "",
  popover = false,
  compact = false,
  avatarSize = 32,
}) {
  const navigate = useNavigate();
  const curr = useSelector((store) => store.contacts.byId[uid]);
  const handleDoubleClick = () => {
    navigate(`/chat/dm/${uid}`);
  };
  if (!curr) return null;
  return (
    <Tippy
      inertia={true}
      interactive
      disabled={!popover}
      placement="left"
      trigger="click"
      content={<Profile uid={uid} type="card" cid={cid} />}
    >
      <StyledWrapper
        size={avatarSize}
        onDoubleClick={dm ? handleDoubleClick : null}
        className={`${interactive ? "interactive" : ""} ${
          compact ? "compact" : ""
        }`}
      >
        <div className="avatar">
          <Avatar url={curr.avatar} name={curr.name} alt="avatar" />
          <div className={`status ${curr.online ? "online" : "offline"}`}></div>
        </div>
        {!compact && <span className="name">{curr?.name}</span>}
        {owner && <IconOwner />}
      </StyledWrapper>
    </Tippy>
  );
}
