// import React from 'react';
import styled from "styled-components";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

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
  }
  .name {
    /* user-select: text; */
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #52525b;
  }
`;
export default function Channel({
  interactive = true,
  id = "",
  compact = false,
  avatarSize = 32,
}) {
  const { channel, totalMemberCount } = useSelector((store) => {
    return {
      channel: store.channels.byId[id],
      totalMemberCount: store.contacts.ids.length,
    };
  });
  console.log("channel item", id, channel);
  if (!channel) return null;
  const { name, members = [], is_public, avatar } = channel;
  return (
    <StyledWrapper
      size={avatarSize}
      className={`${interactive ? "interactive" : ""} ${
        compact ? "compact" : ""
      }`}
    >
      <div className="avatar">
        <Avatar type="channel" url={avatar} name={"#"} alt="avatar" />
      </div>
      {!compact && (
        <span className="name">
          {name} ({is_public ? totalMemberCount : members.length})
        </span>
      )}
    </StyledWrapper>
  );
}
