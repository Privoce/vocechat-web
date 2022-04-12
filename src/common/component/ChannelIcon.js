// import React from 'react';
import HashIcon from "../../assets/icons/channel.svg";
import LockHashIcon from "../../assets/icons/channel.private.svg";
import styled from "styled-components";
const Styled = styled.div`
  display: flex;
  &.muted path {
    fill: #d0d5dd;
  }
`;
export default function ChannelIcon({
  personal = false,
  muted = false,
  className,
}) {
  return (
    <Styled className={`${muted ? "muted" : ""} ${className}`}>
      {personal ? <LockHashIcon /> : <HashIcon />}
    </Styled>
  );
}
