// import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetAuthData } from "../../app/slices/auth.data";
import { useAppSelector } from "../../app/store";
import Button from "../../common/component/styled/Button";
import useLogout from "../../common/hook/useLogout";
// type Props = {};

const GuestBlankPlaceholder = () => {
  const { t } = useTranslation("auth");
  const dispatch = useDispatch();
  const { clearLocalData } = useLogout();
  const navigateTo = useNavigate();
  const serverName = useAppSelector((store) => store.server.name);
  const handleSignIn = () => {
    dispatch(resetAuthData());
    clearLocalData();
    navigateTo("/login");
  };
  return (
    <section className="flex flex-col items-center bg-transparent">
      <h2 className="text-3xl text-gray-600 dark:text-gray-50 font-bold text-center">{t("welcome", { name: serverName })}</h2>
      <div className="flex flex-col">
        <span className="text-gray-400 dark:text-gray-200 my-3 text-sm">{t("guest_login_tip")}</span>
        <Button onClick={handleSignIn} className="small">{t("sign_in")}</Button>
      </div>
    </section>
  );
};

export default GuestBlankPlaceholder;
