// import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import { resetAuthData } from "@/app/slices/auth.data";
import Button from "@/components/styled/Button";
import useLogout from "@/hooks/useLogout";

type Props = {
  placement?: "session" | "chat";
};

const LoginTip = ({ placement = "chat" }: Props) => {
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
    <div
      className={clsx(
        "flex items-center justify-between bg-slate-200/80 dark:bg-gray-800 rounded-lg p-4 border border-solid border-gray-200 dark:border-gray-500",
        placement == "session"
          ? "!w-[96%] md:hidden fixed bottom-2 left-1/2 -translate-x-1/2"
          : "w-full"
      )}
    >
      <span className="text-xs md:text-base text-gray-400 dark:text-gray-100">
        <i className="mr-2 text-xs md:text-lg ">👋</i>
        {t("sign_in_tip")}
      </span>
      <Button onClick={handleSignIn} className="small">
        {ct("action.login")}
      </Button>
    </div>
  );
};

export default LoginTip;
