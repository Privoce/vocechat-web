import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import { AgoraConfig } from "@/types/server";
import SaveTip from "@/components/SaveTip";
import Input from "@/components/styled/Input";
import Label from "@/components/styled/Label";
import Toggle from "@/components/styled/Toggle";
import useConfig from "@/hooks/useConfig";
import HowToTip from "./HowToTip";
import { ConfigTip } from "@/components/ConfigTip";

export default function ConfigAgora() {
  const { t } = useTranslation("setting", { keyPrefix: "agora" });
  const { changed, reset, values, setValues, toggleEnable, updateConfig } = useConfig("agora");
  const handleUpdate = () => {
    // const { token_url, description } = values;
    const _values = values as AgoraConfig;
    if (!_values.url) {
      _values.url = "https://api.agora.io";
    }
    updateConfig(_values);
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
    url,
    project_id,
    app_id,
    app_certificate,
    customer_id,
    customer_secret,
    enabled = false
  } = values as AgoraConfig;
  const _url = url || "https://api.agora.io";
  return (
    <div className="setting-container">
      <ConfigTip title={t("desc")} desc={t("sub_desc")} />
      <div className="inputs">
        <div className="input row">
          <Label className="flex items-center gap-2">
            Enable
            <HowToTip link="https://doc.voce.chat/setting/setting-agora" text={t("how_to")} />
          </Label>
          <Toggle onClick={toggleEnable} checked={enabled}></Toggle>
        </div>
        <div className="input">
          <Label htmlFor="url">Agora URL</Label>
          <Input
            disabled={!enabled}
            data-type="url"
            onChange={handleChange}
            value={_url}
            name="url"
            placeholder="Agora URL"
          />
        </div>
        <div className="input">
          <Label htmlFor="project_id">Project ID</Label>
          <Input
            spellCheck={false}
            disabled={!enabled}
            data-type="project_id"
            onChange={handleChange}
            value={project_id}
            name="project_id"
            placeholder="Project ID"
          />
        </div>
        <div className="input">
          <Label htmlFor="app_id">App ID</Label>
          <Input
            spellCheck={false}
            disabled={!enabled}
            data-type="app_id"
            onChange={handleChange}
            value={app_id}
            name="app_id"
            placeholder="APP ID"
          />
        </div>
        <div className="input">
          <Label htmlFor="app_certificate">APP Certificate</Label>
          <Input
            spellCheck={false}
            disabled={!enabled}
            data-type="app_certificate"
            onChange={handleChange}
            value={app_certificate}
            name="app_certificate"
            placeholder="APP Certificate"
          />
        </div>
        <div className="input">
          <Label htmlFor="customer_id">Customer ID</Label>
          <Input
            spellCheck={false}
            disabled={!enabled}
            data-type="customer_id"
            onChange={handleChange}
            value={customer_id}
            name="customer_id"
            placeholder="Customer ID for RESTful API"
          />
        </div>
        <div className="input">
          <Label htmlFor="customer_secret">Customer Secret</Label>
          <Input
            spellCheck={false}
            disabled={!enabled}
            data-type="customer_secret"
            onChange={handleChange}
            value={customer_secret}
            name="customer_secret"
            placeholder="Customer Secret for RESTful API"
          />
        </div>
      </div>

      {changed && <SaveTip saveHandler={handleUpdate} resetHandler={reset} />}
      {/* <button onClick={handleUpdate} className="btn">update</button> */}
    </div>
  );
}
