// import { useState } from "react";
import StyledContainer from "./StyledContainer";
import Textarea from "../../../common/component/styled/Textarea";
import Toggle from "../../../common/component/styled/Toggle";
import Label from "../../../common/component/styled/Label";
import Input from "../../../common/component/styled/Input";
import SaveTip from "../../../common/component/SaveTip";
import useConfig from "./useConfig";
import useGoogleAuthConfig from "../../../common/hook/useGoogleAuthConfig";
import toast from "react-hot-toast";
export default function Logins() {
  const {
    changed: clientIdChanged,
    clientId,
    updateClientId,
    updateServerClientId,
  } = useGoogleAuthConfig();
  const { values, updateConfig, setValues, reset, changed } = useConfig(
    "login"
  );
  const handleUpdate = async () => {
    const { google } = values;
    if (changed) {
      updateConfig(values);
    }
    if (google && clientIdChanged) {
      // 更新google client id
      await updateServerClientId();
      if (!changed) {
        toast.success("Configuration Updated!");
      }
    }
  };
  const handleGoogleClientIdChange = (evt) => {
    updateClientId(evt.target.value);
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
  const valuesChanged = clientIdChanged || changed;
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
        {google && (
          <div className="input row">
            <Input
              onChange={handleGoogleClientIdChange}
              placeholder="Client ID"
              value={clientId}
            />
          </div>
        )}
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
      </div>
      {valuesChanged && (
        <SaveTip saveHandler={handleUpdate} resetHandler={reset} />
      )}
    </StyledContainer>
  );
}
