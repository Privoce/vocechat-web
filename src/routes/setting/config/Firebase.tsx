import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import { FirebaseConfig } from "@/types/server";
import SaveTip from "@/components/SaveTip";
import Input from "@/components/styled/Input";
import Label from "@/components/styled/Label";
import StyledRadio from "@/components/styled/Radio";
import Textarea from "@/components/styled/Textarea";
import useConfig from "@/hooks/useConfig";
import { ConfigTip } from "@/components/ConfigTip";

interface IOptions {
  disable: string;
  official: string;
  custom: string;
}
export default function ConfigFirebase() {
  const { values, setValues, updateConfig, changed, reset } = useConfig("firebase");
  const { t } = useTranslation("setting");
  const Options: IOptions = {
    disable: t("firebase.disable"),
    official: t("firebase.use_official"),
    custom: t("firebase.custom")
  };
  let select: keyof IOptions | "" = "";
  if (values) {
    const { use_official, enabled = false } = values as FirebaseConfig;
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
      case "custom":
        {
          tmp = { ...values, enabled: true, use_official: false };
        }
        break;
      case "official":
        {
          tmp = { ...values, enabled: true, use_official: true };
        }
        break;
      case "disable":
        {
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
  const { token_url, project_id, private_key, client_email } = values as FirebaseConfig;
  return (
    <div className="setting-container max-md:w-full max-md:h-auto">
      <ConfigTip title={t("firebase.desc")} desc={t("firebase.sub_desc")} />
      <StyledRadio
        options={Object.values(Options)}
        values={Object.keys(Options)}
        value={select}
        onChange={handleChangeSelect}
      />
      {
        <fieldset className="inputs" disabled={select !== "custom"}>
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
            <Label htmlFor="project_id">{t("firebase.project_id")}</Label>
            <Input
              data-type="project_id"
              onChange={handleChange}
              value={project_id}
              name="project_id"
              placeholder={t("firebase.project_id")}
            />
          </div>
          <div className="input">
            <Label htmlFor="private_key">{t("firebase.private_key")}</Label>
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
            <Label htmlFor="client_email">{t("firebase.client_email")}</Label>
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
    </div>
  );
}
