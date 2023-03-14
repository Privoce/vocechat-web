// import { useState, useEffect, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import StyledRadio from "../../../common/component/styled/Radio";
import { useAppSelector } from "../../../app/store";
import { LoginConfig, WhoCanSignUp } from "../../../types/server";
import useConfig from "../../../common/hook/useConfig";
import Server from './server';
import Language from './Language';
import FrontendURL from "./FrontendURL";
import DarkMode from "./DarkMode";
import ServerVersionChecker from "../../../common/component/ServerVersionChecker";

export default function Overview() {
  const { t } = useTranslation("setting");
  const { loginUser } = useAppSelector((store) => {
    return { loginUser: store.authData.user };
  });
  const { values: loginConfig, updateConfig: updateLoginConfig } = useConfig("login");
  const handleUpdateWhoCanSignUp = (value: WhoCanSignUp) => {
    updateLoginConfig({ ...loginConfig, who_can_sign_up: value });
  };

  const handleGuestToggle = (v: "true" | "false") => {
    const guest = v === "true";
    updateLoginConfig({ ...loginConfig, guest });
  };
  if (!loginConfig) return null;
  const { who_can_sign_up: whoCanSignUp, guest = false } = loginConfig as LoginConfig;
  const isAdmin = loginUser?.is_admin;

  return (
    <div className="relative w-full md:w-[512px] flex flex-col gap-6">
      <Server />
      {isAdmin && (
        <>
          <div className="text-sm">
            <p className="dark:text-gray-100 font-semibold">{t("overview.sign_up.title")}</p>
            <p className="flex justify-between w-full text-gray-400 mb-2">{t("overview.sign_up.desc")}</p>
            <StyledRadio
              options={[t("overview.sign_up.everyone"), t("overview.sign_up.invite")]}
              values={["EveryOne", "InvitationOnly"]}
              value={whoCanSignUp}
              onChange={(v: WhoCanSignUp) => {
                handleUpdateWhoCanSignUp(v);
              }}
            />
          </div>
          <div className="text-sm">
            <p className="dark:text-gray-100 font-semibold">{t("overview.guest_mode.title")}</p>
            <p className="flex justify-between w-full text-gray-400 mb-2">
              <span className="txt">
                {t("overview.guest_mode.desc")}
              </span>
            </p>
            <StyledRadio
              options={[t("overview.guest_mode.enable"), t("overview.guest_mode.disable")]}
              values={["true", "false"]}
              value={`${guest}`}
              onChange={(v) => {
                handleGuestToggle(v);
              }}
            />
          </div>
          <ServerVersionChecker version="0.3.3" empty={true}>
            <FrontendURL />
          </ServerVersionChecker>
        </>
      )}
      <Language />
      <DarkMode />
    </div>
  );
}
