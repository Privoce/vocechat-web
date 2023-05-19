import { ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { LoginConfig } from "@/types/server";
import SaveTip from "@/components/SaveTip";
import Input from "@/components/styled/Input";
import Label from "@/components/styled/Label";
import Toggle from "@/components/styled/Toggle";
import useConfig from "@/hooks/useConfig";
import useGithubAuthConfig from "@/hooks/useGithubAuthConfig";
import useGoogleAuthConfig from "@/hooks/useGoogleAuthConfig";
import IssuerList from "./IssuerList";
import Tooltip from "./Tooltip";

export default function Logins() {
  const { t } = useTranslation("setting", { keyPrefix: "login" });
  const { t: ct } = useTranslation();
  const {
    changed: clientIdChanged,
    clientId,
    updateClientId,
    updateClientIdToServer
  } = useGoogleAuthConfig();
  const {
    config: githubAuthConfig,
    changed: githubChanged,
    updateGithubAuthConfigToServer,
    updateGithubAuthConfig
  } = useGithubAuthConfig();
  const { values, updateConfig, setValues, reset, changed } = useConfig("login");
  const handleUpdate = async () => {
    const { google } = values as LoginConfig;
    if (changed) {
      updateConfig(values);
    }
    if (google && clientIdChanged) {
      // 更新google client id
      await updateClientIdToServer();
      if (!changed) {
        toast.success(ct("tip.update"));
      }
    }
    if (github && githubChanged) {
      // github config
      await updateGithubAuthConfigToServer();
      if (!changed) {
        toast.success(ct("tip.update"));
      }
    }
  };
  const handleGoogleClientIdChange = (evt: ChangeEvent<HTMLInputElement>) => {
    updateClientId(evt.target.value);
  };
  const handleGithubAuthChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { key } = evt.target.dataset;
    if (key) {
      updateGithubAuthConfig({ [key]: evt.target.value });
    }
  };
  const handleToggle = (
    val: Partial<Pick<LoginConfig, "github" | "google" | "password" | "magic_link" | "metamask">>
  ) => {
    setValues((prev) => {
      if (!prev) return prev;
      return { ...prev, ...val };
    });
  };
  if (!values) return null;
  const { google, magic_link, github, metamask, password, oidc = [] } = values as LoginConfig;
  const valuesChanged = clientIdChanged || changed || githubChanged;

  return (
    <div className="setting-container max-md:w-full max-md:h-auto">
      <div className="inputs">
        <div className="input">
          <div className="row">
            <div className="title">
              <div className="txt">
                <Label>{t("password")}</Label>
              </div>
              <span className="desc dark:!text-gray-400">{t("password_desc")}</span>
            </div>
            <Toggle
              onClick={handleToggle.bind(null, { password: !password })}
              checked={password}
            ></Toggle>
          </div>
        </div>
        <div className="input">
          <div className="row">
            <div className="title">
              <div className="txt">
                <Label>{t("magic_link")}</Label>
              </div>
              <span className="desc dark:!text-gray-400">{t("magic_link_desc")}</span>
            </div>
            <Toggle
              onClick={handleToggle.bind(null, { magic_link: !magic_link })}
              checked={magic_link}
            ></Toggle>
          </div>
        </div>
        <div className="input">
          <div className="row">
            <div className="title">
              <div className="txt">
                <Label>{t("google")}</Label>
                <Tooltip link="https://doc.voce.chat/setting/third_login/login-google" />
              </div>
              <span className="desc dark:!text-gray-400">{t("google_desc")}</span>
            </div>
            <Toggle
              onClick={handleToggle.bind(null, { google: !google })}
              checked={google}
            ></Toggle>
          </div>
          <div className="row">
            <Input
              disabled={!google}
              onChange={handleGoogleClientIdChange}
              placeholder="Client ID"
              value={clientId}
            />
          </div>
        </div>
        <div className="input">
          <div className="row">
            <div className="title">
              <div className="txt">
                <Label>{t("github")}</Label>
                <Tooltip link="https://doc.voce.chat/setting/third_login/login-github" />
              </div>
              <span className="desc dark:!text-gray-400">{t("github_desc")}</span>
            </div>
            <Toggle
              onClick={handleToggle.bind(null, { github: !github })}
              checked={github}
            ></Toggle>
          </div>
          <div className="row inputs">
            <Input
              disabled={!github}
              data-key={"client_id"}
              onChange={handleGithubAuthChange}
              placeholder="GitHub Client ID"
              value={githubAuthConfig?.client_id}
            />
            <Input
              disabled={!github}
              data-key={"client_secret"}
              onChange={handleGithubAuthChange}
              placeholder="GitHub Client Secret"
              value={githubAuthConfig?.client_secret}
            />
          </div>
        </div>
        <div className="input">
          <div className="row">
            <div className="title">
              <div className="txt">
                <Label>{t("metamask")}</Label>
                <Tooltip link="https://doc.voce.chat/setting/third_login/login-metamask" />
              </div>
              <span className="desc dark:!text-gray-400">{t("metamask_desc")}</span>
            </div>
            <Toggle
              onClick={handleToggle.bind(null, { metamask: !metamask })}
              checked={metamask}
            ></Toggle>
          </div>
        </div>
        <div className="input">
          <div className="row">
            <div className="title">
              <div className="txt">
                <Label>{t("oidc")}</Label>
                <Tooltip link="https://doc.voce.chat/setting/third_login/login-webid" />
              </div>
              <span className="desc dark:!text-gray-400">{t("oidc_desc")}</span>
            </div>
          </div>
          <div className="row">
            <IssuerList
              issuers={oidc}
              onChange={(newOidc) => {
                setValues((prev) => {
                  if (!prev) return prev;
                  return { ...prev, oidc: newOidc };
                });
              }}
            />
          </div>
        </div>
      </div>
      {valuesChanged && <SaveTip saveHandler={handleUpdate} resetHandler={reset} />}
    </div>
  );
}
