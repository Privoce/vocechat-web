// import React from "react";
import { useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import Profile from "../Profile";
import styled from "styled-components";
const Styled = styled.span`
  padding: 0 2px;
  color: #1fe1f9;
  &.clickable {
    cursor: pointer;
  }
`;
export default function Mention({ uid, popover = true }) {
  const contactsData = useSelector((store) => store.contacts.byId);
  const user = contactsData[uid];
  if (!user) return null;
  return (
    <Tippy
      disabled={!popover}
      duration={0}
      interactive
      placement="top"
      trigger="click"
      content={<Profile uid={uid} type="card" />}
    >
      <Styled className={popover ? "clickable" : ""}>{`@${user.name}`}</Styled>
    </Tippy>
  );
}
