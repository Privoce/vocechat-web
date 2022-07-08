import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StyledSettingContainer from "../../common/component/StyledSettingContainer";
import useNavs from "./navs";
import LogoutConfirmModal from "./LogoutConfirmModal";

let from: string = "";

export default function Setting() {
  const [searchParams] = useSearchParams();
  const navs = useNavs();
  const flattenNaves = navs.map(({ items }) => items).flat();
  const navKey = searchParams.get("nav");
  from = from ?? (searchParams.get("f") || "/");
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const navigateTo = useNavigate();
  const close = () => {
    // todo: check usage
    navigateTo(from!);
    from = "";
  };

  const toggleLogoutConfirm = () => {
    setLogoutConfirm((prev) => !prev);
  };

  const currNav = flattenNaves.find((n) => n.name == navKey) || flattenNaves[0];

  return (
    <>
      <StyledSettingContainer
        nav={currNav}
        closeModal={close}
        title="Settings"
        navs={navs}
        dangers={[{ title: "Log Out", handler: toggleLogoutConfirm }]}
      >
        {currNav.component}
      </StyledSettingContainer>
      {logoutConfirm && <LogoutConfirmModal closeModal={toggleLogoutConfirm} />}
    </>
  );
}
