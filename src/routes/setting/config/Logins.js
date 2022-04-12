// import { useState, useEffect } from "react";
import StyledContainer from "./StyledContainer";
import Textarea from "../../../common/component/styled/Textarea";
import Toggle from "../../../common/component/styled/Toggle";
import Label from "../../../common/component/styled/Label";
import SaveTip from "../../../common/component/SaveTip";
import useConfig from "./useConfig";

export default function Logins() {
  const { values, updateConfig, setValues, reset, changed } = useConfig(
    "login"
  );
  const handleUpdate = () => {
    // const { token_url, description } = values;
    updateConfig(values);
  };
  const handleChange = (evt) => {
    const newValue = evt.target.value;
    const { type } = evt.target.dataset;
    const items = newValue ? newValue.split("\n") : [];
    setValues((prev) => {
      return { ...prev, [type]: items };
    });
  };
  const handleToggle = (val) => {
    setValues((prev) => {
      return { ...prev, ...val };
    });
  };
  if (!values) return null;
  const { google, metamask, password, oidc = [] } = values ?? {};
  return (
    <StyledContainer>
      <div className="inputs">
        <div className="input row">
          <Label>Password</Label>
          <Toggle
            onClick={handleToggle.bind(null, { password: !password })}
            data-checked={password}
          ></Toggle>
        </div>
        <div className="input row">
          <Label>Google</Label>
          <Toggle
            onClick={handleToggle.bind(null, { google: !google })}
            data-checked={google}
          ></Toggle>
        </div>
        <div className="input row">
          <Label>Metamask</Label>
          <Toggle
            onClick={handleToggle.bind(null, { metamask: !metamask })}
            data-checked={metamask}
          ></Toggle>
        </div>
        <div className="input">
          <Label htmlFor="desc">OIDC</Label>
          <Textarea
            rows={10}
            data-type="oidc"
            onChange={handleChange}
            value={oidc.join("\n")}
            name="oidc"
            placeholder="Input issuer list, one line, one issuer"
          />
        </div>

        {/* <div className="input">
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
        </div> */}
      </div>
      {changed && <SaveTip saveHandler={handleUpdate} resetHandler={reset} />}
      {/* <button onClick={handleUpdate} className="btn">update</button> */}
    </StyledContainer>
  );
}
