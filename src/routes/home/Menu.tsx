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
            <img src={settingIcon} alt="setting icon" className="w-6 h-6 max-w-[unset]" />
          </Tooltip>
        </NavLink>
      </li>
    </StyledMenus>
  );
};
export default Menu;
