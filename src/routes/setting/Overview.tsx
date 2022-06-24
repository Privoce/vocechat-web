import { useState, useEffect } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import {
  useGetServerQuery,
  useUpdateServerMutation,
  useUpdateLogoMutation,
  useUpdateLoginConfigMutation,
  useGetLoginConfigQuery
} from "../../app/services/server";
import LogoUploader from "../../common/component/AvatarUploader";
import Input from "../../common/component/styled/Input";
import Label from "../../common/component/styled/Label";
import Textarea from "../../common/component/styled/Textarea";
import SaveTip from "../../common/component/SaveTip";
import StyledRadio from "../../common/component/styled/Radio";
import { useAppSelector } from "../../app/store";

const StyledWrapper = styled.div`
  position: relative;
  width: 512px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .logo {
    display: flex;
    gap: 16px;

    .preview {
      width: 96px;
      height: 96px;
    }

    .upload {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;

      .tip {
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        color: #374151;
      }

      .btn {
        padding: 8px 14px;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #1fe1f9;
        background: #ecfeff;
        border: 1px solid #ecfeff;
        box-sizing: border-box;
        box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
        border-radius: 8px;
      }
    }
  }

  .inputs {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;

    .input {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }

    > .radioButton {
      > .label {
        margin-top: 64px;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
      }

      > .tip {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #667085;
      }

      > form {
        margin-top: 16px;
        width: 512px;
      }
    }
  }
`;

export default function Overview() {
  const loginUser = useAppSelector((store) => {
    return store.contacts.byId[store.authData.uid];
  });
  const [changed, setChanged] = useState(false);
  const [serverValues, setServerValues] = useState(null);
  const [loginConfigValues, setLoginConfigValues] = useState(null);
  const { data: server, refetch: refetchServer } = useGetServerQuery();
  const { data: loginConfig, refetch: refetchLoginConfig } = useGetLoginConfigQuery();
  const [updateServer, { isSuccess: serverUpdated }] = useUpdateServerMutation();
  const [uploadLogo, { isSuccess: uploadSuccess }] = useUpdateLogoMutation();
  const [updateLoginConfig, { isSuccess: loginConfigUpdated }] = useUpdateLoginConfigMutation();
  const handleUpdate = () => {
    const { name, description } = serverValues;
    updateServer({ name, description });
    updateLoginConfig({
      ...loginConfig,
      who_can_sign_up: loginConfigValues.who_can_sign_up
    });
  };
  const handleChange = (evt) => {
    const newValue = evt.target.value;
    const { type } = evt.target.dataset;
    setServerValues((prev) => {
      return { ...prev, [type]: newValue };
    });
  };
  const handleReset = () => {
    console.log("reset", server, loginConfig);
    setServerValues(server);
    setLoginConfigValues(loginConfig);
  };
  useEffect(() => {
    if (uploadSuccess) {
      toast.success("Update logo successfully!");
      refetchServer();
    }
  }, [uploadSuccess]);
  useEffect(() => {
    if (server) {
      setServerValues(server);
    }
  }, [server]);
  useEffect(() => {
    if (loginConfig) {
      setLoginConfigValues(loginConfig);
    }
  }, [loginConfig]);
  useEffect(() => {
    if (server && serverValues && loginConfig && loginConfigValues) {
      const { name, description } = serverValues;
      const { name: oName, description: oDescription } = server;
      const { who_can_sign_up: whoCanSignUp } = loginConfigValues;
      const { who_can_sign_up: oWhoCanSignUp } = loginConfig;
      if (oName !== name || oDescription !== description || oWhoCanSignUp !== whoCanSignUp) {
        setChanged(true);
      } else {
        setChanged(false);
      }
    }
  }, [server, serverValues, loginConfig, loginConfigValues]);
  useEffect(() => {
    if (serverUpdated && loginConfigUpdated) {
      toast.success("Configuration updated!");
      refetchServer();
      refetchLoginConfig();
    }
  }, [serverUpdated, loginConfigUpdated]);

  if (!serverValues || !loginConfigValues) return null;
  const { name, description, logo } = serverValues;
  const { who_can_sign_up: whoCanSignUp } = loginConfigValues;
  const isAdmin = loginUser?.is_admin;
  return (
    <StyledWrapper>
      <div className="logo">
        <div className="preview">
          <LogoUploader
            disabled={!isAdmin}
            url={uploadSuccess ? `${logo}?t=${+new Date()}` : logo}
            name={name}
            uploadImage={uploadLogo}
          />
        </div>
        {isAdmin && (
          <div className="upload">
            <div className="tip">
              Minimum size is 128x128, We recommend at least 512x512 for the server. Max size
              limited to 5M.
            </div>
            {/* <button className="btn">Upload Image</button> */}
          </div>
        )}
      </div>
      <div className="inputs">
        <div className="input">
          <Label htmlFor="name">Server Name</Label>
          <Input
            disabled={!isAdmin}
            data-type="name"
            onChange={handleChange}
            value={name}
            name="name"
            id="name"
            placeholder="Server Name"
          />
        </div>
        <div className="input">
          <Label htmlFor="desc">Server Description</Label>
          <Textarea
            disabled={!isAdmin}
            data-type="description"
            onChange={handleChange}
            value={description ?? ""}
            rows={4}
            name="name"
            id="name"
            placeholder="Tell the world a bit about this server"
          />
        </div>
        {isAdmin && (
          <div className="radioButton">
            <p className="label">Default Sign Up</p>
            <p className="tip">Who can sign up this server.</p>
            <StyledRadio
              options={["Everyone", "Invitation Link Only"]}
              values={["EveryOne", "InvitationOnly"]}
              value={whoCanSignUp}
              onChange={(v) =>
                setLoginConfigValues({
                  ...loginConfig,
                  who_can_sign_up: v
                })
              }
            />
          </div>
        )}
      </div>
      {changed && <SaveTip saveHandler={handleUpdate} resetHandler={handleReset} />}
      {/* <button onClick={handleUpdate} className="btn">update</button> */}
    </StyledWrapper>
  );
}
