// import React from 'react'
import { NavLink } from "react-router-dom";
import Tooltip from "../../common/component/Tooltip";
import settingIcon from "../../assets/icons/setting.svg?url";
import styled from "styled-components";
const StyledMenus = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 8px 12px;
  .menu {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 10px;
    .icon {
      width: 24px;
      height: 24px;
      transition: all 0.5s ease;
    }
    .txt {
      color: #4b5563;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
    }
  }
`;
export default function Menu() {
  return (
    <StyledMenus>
      <li className="menu">
        <Tooltip placement="right" tip="Settings">
          <NavLink to={"/setting"}>
            <img src={settingIcon} alt="setting icon" className="icon" />
          </NavLink>
        </Tooltip>
        {/* {expand && (
          <span className="txt animate__animated animate__fadeIn">
            Settings
          </span>
        )} */}
      </li>
      {/* <li className="menu" onClick={toggle}>
        <img
          src={expand ? foldIcon : unfoldIcon}
          alt="expand icon"
          className="icon"
        />
        {expand && (
          <span className="txt animate__animated animate__fadeIn">Expand</span>
        )}
      </li> */}
    </StyledMenus>
  );
}
