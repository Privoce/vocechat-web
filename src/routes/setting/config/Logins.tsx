import { ChangeEvent } from "react";
import toast from "react-hot-toast";
import StyledContainer from "./StyledContainer";
import Toggle from "../../../common/component/styled/Toggle";
import Label from "../../../common/component/styled/Label";
import Input from "../../../common/component/styled/Input";
import SaveTip from "../../../common/component/SaveTip";
import useConfig from "../../../common/hook/useConfig";
import Tooltip from "./Tooltip";
import IssuerList from "./IssuerList";
import useGoogleAuthConfig from "../../../common/hook/useGoogleAuthConfig";
import useGithubAuthConfig from "../../../common/hook/useGithubAuthConfig";
import { LoginConfig } from "../../../types/server";
import { useTranslation } from "react-i18next";

export default function Logins() {
  const { t } = useTranslation("setting", { keyPrefix: "login" });
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
        toast.success("Configuration Updated!");
      }
    }
    if (github && githubChanged) {
      // github config
      await updateGithubAuthConfigToServer();
      if (!changed) {
        toast.success("Configuration Updated!");
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
    <StyledContainer>
      <div className="inputs">
        <div className="input">
          <div className="row">
            <div className="title">
              <div className="txt">
                <Label>{t("password")}</Label>
              </div>
              <span className="desc">{t("password_desc")}</span>
            </div>
            <Toggle
              onClick={handleToggle.bind(null, { password: !password })}
              data-checked={password}
            ></Toggle>
          </div>
        </div>
        <div className="input">
          <div className="row">
            <div className="title">
              <div className="txt">
                <Label>{t("magic_link")}</Label>
              </div>
              <span className="desc">{t("magic_link_desc")}</span>
            </div>
            <Toggle
              onClick={handleToggle.bind(null, { magic_link: !magic_link })}
              data-checked={magic_link}
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
              <span className="desc">{t("google_desc")}</span>
            </div>
            <Toggle
              onClick={handleToggle.bind(null, { google: !google })}
              data-checked={google}
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
              <span className="desc">{t("github_desc")}</span>
            </div>
            <Toggle
              onClick={handleToggle.bind(null, { github: !github })}
              data-checked={github}
            ></Toggle>
          </div>
          <div className="row inputs">
            <Input
              disabled={!github}
              data-key={"client_id"}
              onChange={handleGithubAuthChange}
              placeholder="Github Client ID"
              value={githubAuthConfig?.client_id}
            />
            <Input
              disabled={!github}
              data-key={"client_secret"}
              onChange={handleGithubAuthChange}
              placeholder="Github Client Secret"
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
              <span className="desc">{t("metamask_desc")}</span>
            </div>
            <Toggle
              onClick={handleToggle.bind(null, { metamask: !metamask })}
              data-checked={metamask}
            ></Toggle>
          </div>
        </div>
        <div className="input">
          <div className="row">
            <div className="title">
              <div className="txt">
                <Label htmlFor="desc">{t("oidc")}</Label>
                <Tooltip link="https://doc.voce.chat/setting/third_login/login-webid" />
              </div>
              <span className="desc">{t("oidc_desc")}</span>
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
    </StyledContainer>
  );
}
