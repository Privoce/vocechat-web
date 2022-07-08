import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
type Props = {};
const Menu: FC<Props> = () => {
  const { pathname } = useLocation();
  return (
    <StyledMenus>
      <li className="menu link_navs">
        <NavLink className="link" to={`/setting?f=${pathname}`}>
          <Tooltip placement="right" tip="Settings">
            <img src={settingIcon} alt="setting icon" className="icon" />
          </Tooltip>
        </NavLink>
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
};
export default Menu;
