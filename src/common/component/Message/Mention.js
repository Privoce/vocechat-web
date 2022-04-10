// import React from "react";
import { useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import Profile from "../Profile";
import styled from "styled-components";
const Styled = styled.span`
  cursor: pointer;
  padding: 0 2px;
  color: #1fe1f9;
`;
export default function Mention({ uid }) {
  const contactsData = useSelector((store) => store.contacts.byId);
  const user = contactsData[uid];
  if (!user) return null;
  return (
    <Tippy
      duration={0}
      interactive
      placement="top"
      trigger="click"
      content={<Profile uid={uid} type="card" />}
    >
      <Styled>{`@${user.name}`}</Styled>
    </Tippy>
  );
}
