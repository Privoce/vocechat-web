// import { useState } from "react";
import toast from "react-hot-toast";
import StyledContainer from "./StyledContainer";
import Toggle from "../../../common/component/styled/Toggle";
import Label from "../../../common/component/styled/Label";
import Input from "../../../common/component/styled/Input";
import SaveTip from "../../../common/component/SaveTip";
import useConfig from "./useConfig";
import Tooltip from "./Tooltip";
import IssuerList from "./IssuerList";
import useGoogleAuthConfig from "../../../common/hook/useGoogleAuthConfig";
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
  // const handleChange = (evt) => {
  //   const newValue = evt.target.value;
  //   const { type } = evt.target.dataset;
  //   const items = newValue ? newValue.split("\n") : [];
  //   setValues((prev) => {
  //     return { ...prev, [type]: items };
  //   });
  // };
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
        <div className="input">
          <div className="row">
            <div className="title">
              <div className="txt">
                <Label>Password</Label>
              </div>
              <span className="desc">Allows members login with password.</span>
            </div>
            <Toggle
              onClick={handleToggle.bind(null, { password: !password })}
              data-checked={password}
            ></Toggle>
          </div>
        </div>
        <div className="input">
          <div className="row">
            <div className="title">
              <div className="txt">
                <Label>Google</Label>
                <Tooltip link="https://doc.rustchat.com/en-us/login-google.html" />
              </div>
              <span className="desc">Allows members login with Google.</span>
            </div>
            <Toggle
              onClick={handleToggle.bind(null, { google: !google })}
              data-checked={google}
            ></Toggle>
          </div>
          <div className="row">
            <Input
              disabled={!google}
              onChange={handleGoogleClientIdChange}
              placeholder="Client ID"
              value={clientId}
            />
          </div>
        </div>
        <div className="input">
          <div className="row">
            <div className="title">
              <div className="txt">
                <Label>Metamask</Label>
                <Tooltip link="https://doc.rustchat.com/en-us/login-metamask.html" />
              </div>
              <span className="desc">Allows members login with Metamask.</span>
            </div>
            <Toggle
              onClick={handleToggle.bind(null, { metamask: !metamask })}
              data-checked={metamask}
            ></Toggle>
          </div>
        </div>
        <div className="input">
          <div className="row">
            <div className="title">
              <div className="txt">
                <Label htmlFor="desc">OIDC</Label>
                <Tooltip link="https://doc.rustchat.com/en-us/login-webid.html" />
              </div>
              <span className="desc">Save my login details for next time.</span>
            </div>
          </div>
          <div className="row">
            <IssuerList />
          </div>
        </div>
      </div>
      {valuesChanged && (
        <SaveTip saveHandler={handleUpdate} resetHandler={reset} />
      )}
    </StyledContainer>
  );
}