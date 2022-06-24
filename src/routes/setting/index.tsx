import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StyledSettingContainer from "../../common/component/StyledSettingContainer";
import useNavs from "./navs";
import LogoutConfirmModal from "./LogoutConfirmModal";

let from: string | null = null;

export default function Setting() {
  const [searchParams] = useSearchParams();
  const navs = useNavs();
  const flatenNavs = navs
    .map(({ items }) => {
      return items;
    })
    .flat();
  const navKey = searchParams.get("nav");
  from = from ?? (searchParams.get("f") || "/");
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const navgateTo = useNavigate();
  const close = () => {
    // dispatch(toggleSetting());
    navgateTo(from);
    from = null;
  };
  const toggleLogoutConfrim = () => {
    setLogoutConfirm((prev) => !prev);
  };
  const currNav = flatenNavs.find((n) => n.name == navKey) || flatenNavs[0];

  return (
    <>
      <StyledSettingContainer
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
