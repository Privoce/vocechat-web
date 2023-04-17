import Input from "../../../common/component/styled/Input";
import Textarea from "../../../common/component/styled/Textarea";
import Label from "../../../common/component/styled/Label";
import Toggle from "../../../common/component/styled/Toggle";
import SaveTip from "../../../common/component/SaveTip";
import useConfig from "../../../common/hook/useConfig";
import { ChangeEvent } from "react";
import { AgoraConfig } from "../../../types/server";

export default function ConfigAgora() {
  const { changed, reset, values, setValues, toggleEnable, updateConfig } = useConfig("agora");
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
    url,
    project_id,
    app_id,
    app_certificate,
    rtm_key,
    rtm_secret,
    enabled = false
  } = values as AgoraConfig;

  return (
    <div className="setting-container">
      <div className="inputs">
        <div className="input row">
          <Label>Enable</Label>
          <Toggle onClick={toggleEnable} checked={enabled}></Toggle>
        </div>
        <div className="input">
          <Label htmlFor="url">Agora Url</Label>
          <Input
            disabled={!enabled}
            data-type="url"
            onChange={handleChange}
            value={url || "https://api.agora.io"}
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
          <Label htmlFor="rtm_key">Customer ID</Label>
          <Textarea
            spellCheck={false}
            disabled={!enabled}
            data-type="rtm_key"
            onChange={handleChange}
            value={rtm_key}
            name="rtm_key"
            placeholder="Customer ID for RESTful API"
          />
        </div>
        <div className="input">
          <Label htmlFor="rtm_secret">Customer Secret</Label>
          <Textarea
            spellCheck={false}
            disabled={!enabled}
            data-type="rtm_secret"
            onChange={handleChange}
            value={rtm_secret}
            name="rtm_secret"
            placeholder="Customer Secret for RESTful API"
          />
        </div>
      </div>
      {changed && <SaveTip saveHandler={handleUpdate} resetHandler={reset} />}
      {/* <button onClick={handleUpdate} className="btn">update</button> */}
    </div>
  );
}
