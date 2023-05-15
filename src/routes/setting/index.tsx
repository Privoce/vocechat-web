import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import StyledSettingContainer from "@/components/StyledSettingContainer";
import useNavs from "./navs";
import LogoutConfirmModal from "./LogoutConfirmModal";

let pageFrom: string = "";

export default function Setting() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navs = useNavs();
  const flattenNaves = navs.map(({ items }) => items).flat();
  const { nav: navKey } = useParams();;
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

  const currNav = flattenNaves.find((n) => n.name == navKey);

  return (
    <>
      <StyledSettingContainer
        nav={currNav}
        closeModal={close}
        title={t("setting")}
        navs={navs}
        dangers={[{ title: t("action.logout"), handler: toggleLogoutConfirm }]}
      >
        {navKey ? currNav?.component : null}
      </StyledSettingContainer>
      {logoutConfirm && <LogoutConfirmModal closeModal={toggleLogoutConfirm} />}
    </>
  );
}
