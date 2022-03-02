import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleSetting } from "../../../app/slices/ui";
import StyledSettingContainer from "../StyledSettingContainer";
import useNavs from "./navs";
import LogoutConfirmModal from "./LogoutConfirmModal";

export default function Setting() {
  const navs = useNavs();
  const flatenNavs = navs
    .map(({ items }) => {
      return items;
    })
    .flat();
  const [currNav, setCurrNav] = useState(flatenNavs[0]);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const dispatch = useDispatch();
  const close = () => {
    dispatch(toggleSetting());
  };
  const toggleLogoutConfrim = () => {
    setLogoutConfirm((prev) => !prev);
  };
  const updateNav = (name) => {
    const tmp = flatenNavs.find((n) => n.name == name);
    if (tmp) {
      setCurrNav(tmp);
    }
  };
  return (
    <>
      <StyledSettingContainer
        updateNav={updateNav}
        nav={currNav}
        closeModal={close}
        title="Settings"
        navs={navs}
        dangers={[{ title: "Log Out", handler: toggleLogoutConfrim }]}
      >
        {currNav.component}
      </StyledSettingContainer>
      {logoutConfirm && <LogoutConfirmModal closeModal={toggleLogoutConfrim} />}
    </>
  );
}
