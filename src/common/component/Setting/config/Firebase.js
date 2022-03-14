// import { useState, useEffect } from "react";
import StyledContainer from "./StyledContainer";
import Input from "../../styled/Input";
import Textarea from "../../styled/Textarea";
import Toggle from "../../styled/Toggle";
import Label from "../../styled/Label";
import SaveTip from "../../SaveTip";
import useConfig from "./useConfig";

export default function ConfigFirebase() {
  const {
    values,
    toggleEnable,
    updateConfig,
    setValues,
    reset,
    changed,
  } = useConfig("firebase");
  const handleUpdate = () => {
    // const { token_url, description } = values;
    updateConfig(values);
  };
  const handleChange = (evt) => {
    const newValue = evt.target.value;
    const { type } = evt.target.dataset;
    setValues((prev) => {
      return { ...prev, [type]: newValue };
    });
  };
  //   if (!values) return null;
  const { token_url, project_id, private_key, client_email, enabled = false } =
    values ?? {};
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
            value={token_url || "https://oauth2.googleapis.com/token"}
            name="token_url"
            placeholder="Token URL"
          />
        </div>
        <div className="input">
          <Label htmlFor="desc">Project ID</Label>
          <Input
            disabled={!enabled}
            type={"number"}
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
            rows={15}
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
