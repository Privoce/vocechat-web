// import React from "react";
import styled from "styled-components";
const StyledDivider = styled.hr`
  display: block;
  position: relative;
  border: 0;
  border-top: 1px solid #e3e5e8;
  margin: 25px 0;
  &:before {
    background: #fff;
    padding: 2px 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    content: attr(data-content);
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    color: #78787c;
  }
`;
export default function Divider({ content }) {
  if (!content) return null;
  return <StyledDivider data-content={content}></StyledDivider>;
}
