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
export default function Mention({ uid, popover = true, cid, textOnly = false }) {
  const contactsData = useSelector((store) => store.contacts.byId);
  const user = contactsData[uid];
  if (!user) return null;
  if (textOnly) return `@${user.name}`;
  return (
    <Tippy
      disabled={!popover}
      interactive
      placement="top"
      trigger="click"
      content={<Profile uid={uid} type="card" cid={cid} />}
    >
      <Styled className={popover ? "clickable" : ""}>{`@${user.name}`}</Styled>
    </Tippy>
  );
}
