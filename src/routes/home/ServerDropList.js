// import React from 'react';
import styled from "styled-components";
import { HiChevronDoubleLeft } from "react-icons/hi";

const StyledWrapper = styled.div`
  height: 56px;
  padding: 0 16px;
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
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      img {
        width: 16px;
        height: 16px;
      }
    }
    .title {
      white-space: nowrap;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: #4b5563;
    }
  }
  .arrow {
    cursor: pointer;
    transform-origin: center;
    transition: transform 0.5s ease-in-out;
    display: flex;
    width: 15px;
    height: 15px;
    transform: rotate(180deg);
    .icon {
      width: 100%;
      height: 100%;
    }
    &.expand {
      transform: rotate(0deg);
    }
  }
`;
export default function ServerDropList({ data, toggle, expand = true }) {
  if (!data) return null;
  return (
    <StyledWrapper className={expand ? "expand" : ""}>
      <div className="server">
        <div className="logo">
          <img src={data.logo} alt="logo" />
        </div>
        {expand && <h2 className="title">{data.name}</h2>}
      </div>
      <div onClick={toggle} className={`arrow ${expand ? "expand" : ""}`}>
        <HiChevronDoubleLeft className="icon" color="#BFBFBF" />
      </div>
    </StyledWrapper>
  );
}
