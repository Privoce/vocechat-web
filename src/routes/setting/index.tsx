import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StyledSettingContainer from "../../common/component/StyledSettingContainer";
import useNavs from "./navs";
import LogoutConfirmModal from "./LogoutConfirmModal";
import { useTranslation } from "react-i18next";

let pageFrom: string = "";

export default function Setting() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navs = useNavs();
  const flattenNaves = navs.map(({ items }) => items).flat();
  const navKey = searchParams.get("nav");
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const navigateTo = useNavigate();
  pageFrom = pageFrom ? pageFrom : searchParams.get("f") || "/";
  const close = () => {
    navigateTo(pageFrom);
    pageFrom = "";
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
        title={t("setting")}
        navs={navs}
        dangers={[{ title: t("action.logout"), handler: toggleLogoutConfirm }]}
      >
        {currNav.component}
      </StyledSettingContainer>
      {logoutConfirm && <LogoutConfirmModal closeModal={toggleLogoutConfirm} />}
    </>
  );
}
