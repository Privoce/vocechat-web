// import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BASE_ORIGIN } from "@/app/config";
import { resetAuthData } from "@/app/slices/auth.data";
import { useAppSelector } from "@/app/store";
import QRCode from "@/components/QRCode";
import Button from "@/components/styled/Button";
import useLogout from "@/hooks/useLogout";

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
    <section className="flex flex-col items-center text-center">
      <h2 className="text-3xl text-gray-600 dark:text-gray-50 font-bold">
        {t("welcome", { name: serverName })}
      </h2>
      <div className="flex flex-col gap-2">
        <span className="text-gray-400 dark:text-gray-200 my-3 text-sm">
          {t("guest_login_tip")}
        </span>
        <div className="w-44 h-44 self-center mb-4">
          <QRCode
            level="Q"
            size={1200}
            link={`https://voce.chat/login?s=${encodeURIComponent(BASE_ORIGIN)}`}
          />
        </div>
        <Button onClick={handleSignIn} className="small">
          {t("sign_in")}
        </Button>
      </div>
    </section>
  );
};

export default GuestBlankPlaceholder;
