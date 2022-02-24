// import React from 'react'
import { useDispatch } from "react-redux";
import { toggleSetting } from "../../app/slices/ui";
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
export default function Menu({ toggle, expand = true }) {
  const dispatch = useDispatch();
  const handleSetting = () => {
    dispatch(toggleSetting());
  };
  return (
    <StyledMenus>
      <li className="menu" onClick={handleSetting}>
        <img
          src="https://static.nicegoodthings.com/project/rustchat/menu.setting.png"
          alt="setting icon"
          className="icon"
        />
        {expand && (
          <span className="txt animate__animated animate__fadeIn">
            Settings
          </span>
        )}
      </li>
      <li className="menu" onClick={toggle}>
        <img
          src={
            expand
              ? "https://static.nicegoodthings.com/project/rustchat/menu.toggle.collapse.png"
              : "https://static.nicegoodthings.com/project/rustchat/menu.toggle.expand.png"
          }
          alt="expand icon"
          className="icon"
        />
        {expand && (
          <span className="txt animate__animated animate__fadeIn">Expand</span>
        )}
      </li>
    </StyledMenus>
  );
}
