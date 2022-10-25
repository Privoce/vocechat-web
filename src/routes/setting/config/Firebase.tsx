import { ChangeEvent } from "react";
import StyledContainer from "./StyledContainer";
import Input from "../../../common/component/styled/Input";
import Textarea from "../../../common/component/styled/Textarea";
import Toggle from "../../../common/component/styled/Toggle";
import Label from "../../../common/component/styled/Label";
import SaveTip from "../../../common/component/SaveTip";
import useConfig from "../../../common/hook/useConfig";
import { FirebaseConfig } from "../../../types/server";

export default function ConfigFirebase() {
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
          <Label>Enable</Label>
          <Toggle onClick={toggleEnable} data-checked={enabled}></Toggle>
        </div>
        <div className="input">
          <Label htmlFor="name">Token Url</Label>
          <Input
            disabled={!enabled}
            data-type="token_url"
            onChange={handleChange}
            value={token_url}
            name="token_url"
            placeholder="Token URL"
          />
        </div>
        <div className="input">
          <Label htmlFor="desc">Project ID</Label>
          <Input
            disabled={!enabled}
            data-type="project_id"
            onChange={handleChange}
            value={project_id}
            name="project_id"
            placeholder="Project ID"
          />
        </div>
        <div className="input">
          <Label htmlFor="desc">Private Key</Label>
          <Textarea
            rows={10}
            disabled={!enabled}
            data-type="private_key"
            onChange={handleChange}
            value={private_key}
            name="private_key"
            placeholder="Private key"
          />
        </div>
        <div className="input">
          <Label htmlFor="desc">Client Email</Label>
          <Input
            disabled={!enabled}
            data-type="client_email"
            onChange={handleChange}
            value={client_email}
            name="client_email"
            placeholder="Client Email address"
          />
        </div>
      </div>
      {changed && <SaveTip saveHandler={handleUpdate} resetHandler={reset} />}
      {/* <button onClick={handleUpdate} className="btn">update</button> */}
    </StyledContainer>
  );
}
