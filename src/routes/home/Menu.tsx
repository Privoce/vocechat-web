import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Tooltip from "../../common/component/Tooltip";
import IconSetting from "../../assets/icons/setting.svg";
type Props = {};
const Menu: FC<Props> = () => {
  const { pathname } = useLocation();
  return (
    <ul className="flex flex-col absolute left-0 bottom-0 w-full px-3 py-2">
      <li className="cursor-pointer flex items-center p-2.5 gap-2.5 link_navs">
        <NavLink className="link" to={`/setting/overview?f=${pathname}`}>
          <Tooltip placement="right" tip="Settings">
            <IconSetting className="w-6 h-6 dark:fill-gray-400" />
          </Tooltip>
        </NavLink>
      </li>
    </ul>
  );
};
export default Menu;
