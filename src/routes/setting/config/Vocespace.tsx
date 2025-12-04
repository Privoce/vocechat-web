import { ConfigTip } from "@/components/ConfigTip";
import { useTranslation } from "react-i18next";
import HowToTip from "./HowToTip";
import Toggle from "@/components/styled/Toggle";
import Input from "@/components/styled/Input";
import Label from "@/components/styled/Label";
import SaveTip from "@/components/SaveTip";
import useConfig from "@/hooks/useConfig";
import { VocespaceConfig } from "@/types/server";
import { ChangeEvent } from "react";

export function ConfigVocespace() {
  const { t } = useTranslation("setting", { keyPrefix: "vocespace" });
  const { changed, reset, values, setValues, toggleEnable, updateConfig } = useConfig("vocespace");
  const handleUpdate = () => {
    const _values = values as VocespaceConfig;
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
  const { url, license, enabled = false, password } = values as VocespaceConfig;

  return (
    <div className="setting-container">
      <ConfigTip title={t("desc")} desc={t("sub_desc")} />
      <div className="inputs">
        <div className="input row">
          <label className="flex items-center gap-2" style={{ color: "#fff" }}>
            Enable
            <HowToTip link="https://doc.vocespace.com/zh/doc/guide/overview" text={t("how_to")} />
          </label>
          <Toggle onClick={toggleEnable} checked={enabled}></Toggle>
        </div>
        <div className="input">
          <div className="flex flex-col text-sm">
            <Label htmlFor="url">Vocespace Domain</Label>
            <p className="text-gray-400 text-xs">
              Please add a DNS analysis of this domain to the current server IP
            </p>
          </div>

          <Input
            disabled={!enabled}
            data-type="url"
            onChange={handleChange}
            value={url}
            name="url"
            placeholder="your.domain.com or 127.0.0.1:7880"
          />
        </div>
        <div className="input">
          <Label htmlFor="password">Redis Password (Optional)</Label>
          <Input
            disabled={!enabled}
            data-type="password"
            onChange={handleChange}
            value={password}
            name="password"
            placeholder="vocespace"
          />
        </div>
        {/* <div className="input">
          <Label htmlFor="license">APP License (Optional)</Label>
          <Input
            spellCheck={false}
            disabled={!enabled}
            data-type="license"
            onChange={handleChange}
            value={license}
            name="license"
            placeholder="optional"
          />
        </div> */}
      </div>

      {changed && <SaveTip saveHandler={handleUpdate} resetHandler={reset} />}
      {/* <button onClick={handleUpdate} className="btn">update</button> */}
    </div>
  );
}
