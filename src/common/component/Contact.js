// import React from 'react';
import styled from "styled-components";
import Avatar from "./Avatar";
import { useGetContactsQuery } from "../../app/services/contact";

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
      background-color: #22c55e;
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
export default function Contact({ interactive = true, status = "", uid = "" }) {
  const { data: contacts } = useGetContactsQuery();
  if (!contacts) return null;
  const currUser = contacts.find((c) => c.uid == uid);
  return (
    <StyledWrapper
      className={`${interactive ? "interactive" : ""}`}
      title={currUser?.email}
    >
      <div className="avatar">
        <Avatar url={currUser?.avatar} id={uid} alt="avatar" />
        <div className={`status ${status}`}></div>
      </div>
      <span className="name">{currUser?.name}</span>
    </StyledWrapper>
  );
}
