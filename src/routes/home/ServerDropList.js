// import React from 'react';
import styled from "styled-components";
// import { HiChevronDoubleLeft } from "react-icons/hi";

const StyledWrapper = styled.div`
  min-height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* &.expand {
    padding-right: 16px;
  } */
  .server {
    display: flex;
    align-items: center;
    gap: 10px;
    .logo {
      width: 28px;
      height: 28px;
      border-radius: 50%;
    }
    .info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      white-space: nowrap;
      .title {
        font-weight: bold;
        font-size: 14px;
        line-height: 100%;
        color: #374151;
        text-transform: capitalize;
      }
      .count {
        font-weight: normal;
        font-size: 12px;
        line-height: 100%;
        color: #78787c;
      }
    }
  }
`;
export default function ServerDropList({ data, memberCount, expand = true }) {
  if (!data) return null;
  return (
    <StyledWrapper className={expand ? "expand" : ""}>
      <div className="server">
        <img className="logo" src={data.logo} alt="logo" />
        {expand && (
          <div className="info">
            <h2 className="title animate__animated animate__fadeIn">
              {data.name}
            </h2>
            <span className="count">{memberCount} members</span>
          </div>
        )}
      </div>
    </StyledWrapper>
  );
}
