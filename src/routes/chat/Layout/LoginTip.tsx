// import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetAuthData } from "../../../app/slices/auth.data";
import Button from "../../../common/component/styled/Button";
import useLogout from "../../../common/hook/useLogout";
// type Props = {};

const LoginTip = () => {
  const { t } = useTranslation("welcome");
  const { t: ct } = useTranslation();
  const dispatch = useDispatch();
  const { clearLocalData } = useLogout();
  const navigateTo = useNavigate();
  const handleSignIn = () => {
    dispatch(resetAuthData());
    clearLocalData();
    navigateTo("/login");
  };

  return (
    <div className="flex items-center justify-between bg-slate-200/80 dark:bg-gray-800 rounded-lg w-full p-4">
      <span className="text-base text-[#98a2b3] dark:text-gray-100">
        <i className="mr-2 text-lg">👋</i>
        {t("sign_in_tip")}
      </span>
      <Button onClick={handleSignIn} className="small">{ct("action.login")}</Button>
    </div>
  );
};

export default LoginTip;
