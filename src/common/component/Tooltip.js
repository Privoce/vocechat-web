// import React from 'react'
import Tippy from "@tippyjs/react";
import styled from "styled-components";
const StyledTip = styled.div`
  background-color: #000;
  border-radius: 5px;
  padding: 5px;
  font-size: 10px;
  color: #fff;
`;
export default function Tooltip({
  tip = "",
  placement = "right-start",
  children,
}) {
  return (
    <Tippy
      duration={0}
      delay={[0, 0]}
      placement={placement}
      content={<StyledTip>{tip}</StyledTip>}
    >
      {children}
    </Tippy>
  );
}
