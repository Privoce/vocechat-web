import { ChangeEvent } from "react";
import StyledContainer from "./StyledContainer";
import Input from "../../../common/component/styled/Input";
import Textarea from "../../../common/component/styled/Textarea";
import Label from "../../../common/component/styled/Label";
import SaveTip from "../../../common/component/SaveTip";
import useConfig from "../../../common/hook/useConfig";
import StyledRadio from "../../../common/component/styled/Radio";

import { FirebaseConfig } from "../../../types/server";
import { useTranslation } from "react-i18next";

interface IOptions {
  disable: string,
  official: string,
  custom: string
}
const Options: IOptions = {
  disable: "Disable",
  official: "Use Official Configuration",
  custom: "Custom"
};
export default function ConfigFirebase() {
  const { values, setValues, updateConfig, changed, reset } = useConfig("firebase");
  const { t } = useTranslation("setting");
  let select: keyof IOptions | "" = "";
  if (values) {
    const {
      use_official,
      enabled = false
    } = values as FirebaseConfig;
    select = enabled ? (use_official ? "official" : "custom") : "disable";

  }
  const handleUpdate = () => {
    // const { token_url, description } = values;
    updateConfig(values);
  };
  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = evt.target.value;
    const { type = "" } = evt.target.dataset;
    setValues((prev) => {
      if (!prev) return prev;
      return { ...prev, [type]: newValue };
    });
  };
  const handleChangeSelect = (v: keyof IOptions) => {
    let tmp = null;
    switch (v) {
      case "custom": {
        tmp = { ...values, enabled: true, use_official: false, };
      }
        break;
      case "official": {
        tmp = { ...values, enabled: true, use_official: true };
      }
        break;
      case "disable": {
        tmp = { ...values, enabled: false };
      }
        break;
      default:
        break;
    }
    if (tmp) {
      setValues(tmp);
    }
  };
  const handleReset = () => {
    reset();
  };

  if (!values) return null;
  const {
    token_url,
    project_id,
    private_key,
    client_email,
  } = values as FirebaseConfig;
  return (
    <StyledContainer>
      <StyledRadio
        options={Object.values(Options)}
        values={Object.keys(Options)}
        value={select}
        onChange={handleChangeSelect}
      />
      {<fieldset className="inputs" disabled={select !== "custom"}>
        <div className="input">
          <Label htmlFor="name">{t("firebase.token_url")}</Label>
          <Input
            data-type="token_url"
            onChange={handleChange}
            value={token_url}
            name="token_url"
            placeholder={t("firebase.token_url")}
          />
        </div>
        <div className="input">
          <Label htmlFor="desc">{t("firebase.project_id")}</Label>
          <Input
            data-type="project_id"
            onChange={handleChange}
            value={project_id}
            name="project_id"
            placeholder={t("firebase.project_id")}
          />
        </div>
        <div className="input">
          <Label htmlFor="desc">{t("firebase.private_key")}</Label>
          <Textarea
            rows={10}
            spellCheck={false}
            data-type="private_key"
            onChange={handleChange}
            value={private_key}
            name="private_key"
            placeholder={t("firebase.private_key")}
          />
        </div>
        <div className="input">
          <Label htmlFor="desc">{t("firebase.client_email")}</Label>
          <Input
            data-type="client_email"
            onChange={handleChange}
            value={client_email}
            name="client_email"
            placeholder={t("firebase.client_email")}
          />
        </div>
      </fieldset>
      }
      {changed && <SaveTip saveHandler={handleUpdate} resetHandler={handleReset} />}
    </StyledContainer>
  );
}
