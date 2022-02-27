// import React from 'react';
import styled from "styled-components";
// import { HiChevronDoubleLeft } from "react-icons/hi";

const StyledWrapper = styled.div`
  min-height: 56px;
  padding: 0 20px;
  padding-right: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
  &.expand {
    padding-right: 16px;
  }
  .server {
    display: flex;
    align-items: center;
    gap: 8px;
    .logo {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
    .title {
      white-space: nowrap;
      font-weight: normal;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 18px;
      color: #1c1c1e;
    }
  }
`;
export default function ServerDropList({ data, expand = true }) {
  if (!data) return null;
  return (
    <StyledWrapper className={expand ? "expand" : ""}>
      <div className="server">
        <img className="logo" src={data.logo} alt="logo" />
        {expand && (
          <h2 className="title animate__animated animate__fadeIn">
            {data.name}
          </h2>
        )}
      </div>
    </StyledWrapper>
  );
}
