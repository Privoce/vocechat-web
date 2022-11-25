import { ChangeEvent } from "react";
import StyledContainer from "./StyledContainer";
import Input from "../../../common/component/styled/Input";
import Textarea from "../../../common/component/styled/Textarea";
import Toggle from "../../../common/component/styled/Toggle";
import Label from "../../../common/component/styled/Label";
import SaveTip from "../../../common/component/SaveTip";
import useConfig from "../../../common/hook/useConfig";
import { FirebaseConfig } from "../../../types/server";
import { useTranslation } from "react-i18next";

export default function ConfigFirebase() {
  const { t } = useTranslation("setting");
  const { values, toggleEnable, updateConfig, setValues, reset, changed } = useConfig("firebase");
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
  if (!values) return null;
  const {
    token_url,
    project_id,
    private_key,
    client_email,
    enabled = false
  } = values as FirebaseConfig;
  return (
    <StyledContainer>
      <div className="inputs">
        <div className="input row">
          <Label>{t("firebase.enable")}</Label>
          <Toggle onClick={toggleEnable} data-checked={enabled}></Toggle>
        </div>
        <div className="input">
          <Label htmlFor="name">{t("firebase.token_url")}</Label>
          <Input
            disabled={!enabled}
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
            disabled={!enabled}
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
            disabled={!enabled}
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
            disabled={!enabled}
            data-type="client_email"
            onChange={handleChange}
            value={client_email}
            name="client_email"
            placeholder={t("firebase.client_email")}
          />
        </div>
      </div>
      {changed && <SaveTip saveHandler={handleUpdate} resetHandler={reset} />}
      {/* <button onClick={handleUpdate} className="btn">update</button> */}
    </StyledContainer>
  );
}
