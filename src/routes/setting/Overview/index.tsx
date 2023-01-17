// import { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import StyledRadio from "../../../common/component/styled/Radio";
import { useAppSelector } from "../../../app/store";
import { LoginConfig, WhoCanSignUp } from "../../../types/server";
import useConfig from "../../../common/hook/useConfig";
import Server from './server';
import Language from './Language';
import FrontendURL from "./FrontendURL";
import ServerVersionChecker from "../../../common/component/ServerVersionChecker";

const StyledWrapper = styled.div`
  position: relative;
  width: 512px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  .logo {
    display: flex;
    gap: 16px;
    .preview {
      width: 96px;
      height: 96px;
    }
    .upload {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      .tip {
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        color: #374151;
      }
    }
  }
  .inputs {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    margin-bottom: 64px;
    .input {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }
  > .setting {
    font-size: 14px;
    line-height: 20px;
    > .label {
      font-weight: 500;
    }
    > .tip {
      font-weight: 400;
      color: #667085;
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    > form {
      margin-top: 16px;
      width: 512px;
    }
  }
`;

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
    <StyledWrapper>
      <Server />
      {isAdmin && (
        <>
          <div className="setting">
            <p className="label">{t("overview.sign_up.title")}</p>
            <p className="tip">{t("overview.sign_up.desc")}</p>
            <StyledRadio
              options={[t("overview.sign_up.everyone"), t("overview.sign_up.invite")]}
              values={["EveryOne", "InvitationOnly"]}
              value={whoCanSignUp}
              onChange={(v: WhoCanSignUp) => {
                handleUpdateWhoCanSignUp(v);
              }}
            />
          </div>
          <div className="setting">
            <p className="label">{t("overview.guest_mode.title")}</p>
            <p className="tip">
              <span className="txt">
                {t("overview.guest_mode.desc")}
              </span>
            </p>
            <StyledRadio
              options={[t("overview.guest_mode.enable"), t("overview.guest_mode.disable")]}
              values={["true", "false"]}
              value={String(guest)}
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
    </StyledWrapper>
  );
}
