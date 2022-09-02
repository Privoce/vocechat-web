import { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useUpdateServerMutation, useUpdateLogoMutation } from "../../app/services/server";
import LogoUploader from "../../common/component/AvatarUploader";
import Input from "../../common/component/styled/Input";
import Label from "../../common/component/styled/Label";
import Textarea from "../../common/component/styled/Textarea";
import SaveTip from "../../common/component/SaveTip";
import StyledRadio from "../../common/component/styled/Radio";
import { useAppSelector } from "../../app/store";
import { LoginConfig, WhoCanSignUp } from "../../types/server";
import Toggle from "../../common/component/styled/Toggle";
import useConfig from "../../common/hook/useConfig";

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
    margin-bottom: 64px;
    .input {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }
  > .setting {
    font-size: 14px;
    line-height: 20px;
    > .label {
      font-weight: 500;
    }
    > .tip {
      font-weight: 400;
      color: #667085;
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    > form {
      margin-top: 16px;
      width: 512px;
    }
  }
`;

export default function Overview() {
  const { loginUser, server } = useAppSelector((store) => {
    return { loginUser: store.authData.user, server: store.server };
  });
  const [changed, setChanged] = useState(false);
  const [serverValues, setServerValues] = useState<typeof server>(server);
  const { values: loginConfig, updateConfig: updateLoginConfig } = useConfig("login");
  const [updateServer] = useUpdateServerMutation();
  const [uploadLogo, { isSuccess: uploadSuccess }] = useUpdateLogoMutation();
  const handleUpdateServer = () => {
    const { name, description } = serverValues;
    updateServer({ name, description });
  };
  const handleUpdateWhoCanSignUp = (value: WhoCanSignUp) => {
    updateLoginConfig({ ...loginConfig, who_can_sign_up: value });
  };
  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = evt.target.value;
    const { type = "" } = evt.target.dataset;
    setServerValues((prev) => {
      return { ...prev, [type]: newValue };
    });
  };
  const handleReset = () => {
    setServerValues(server);
  };
  const handleGuestToggle = (v: "true" | "false") => {
    const guest = v === "true";
    updateLoginConfig({ ...loginConfig, guest });
  };
  useEffect(() => {
    if (uploadSuccess) {
      toast.success("Update logo successfully!");
    }
  }, [uploadSuccess]);
  useEffect(() => {
    if (server) {
      setServerValues(server);
    }
  }, [server]);
  useEffect(() => {
    if (server && serverValues) {
      const { name, description } = serverValues;
      const { name: oName, description: oDescription } = server;
      if (oName !== name || oDescription !== description) {
        setChanged(true);
      } else {
        setChanged(false);
      }
    }
  }, [server, serverValues]);
  if (!serverValues || !loginConfig) return null;
  const { name, description, logo } = serverValues;
  const { who_can_sign_up: whoCanSignUp, guest } = loginConfig as LoginConfig;
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
      </div>
      {isAdmin && (
        <>
          <div className="setting">
            <p className="label">Default Sign Up</p>
            <p className="tip">Who can sign up this server.</p>
            <StyledRadio
              options={["Everyone", "Invitation Link Only"]}
              values={["EveryOne", "InvitationOnly"]}
              value={whoCanSignUp}
              onChange={(v: WhoCanSignUp) => {
                handleUpdateWhoCanSignUp(v);
              }}
            />
          </div>
          <div className="setting">
            <p className="label">Guest Mode</p>
            <p className="tip">
              <span className="txt">
                If enabled, visitors will see public channels on this server.
              </span>
            </p>
            <StyledRadio
              options={["Enabled", "Disabled"]}
              values={["true", "false"]}
              value={String(guest)}
              onChange={(v) => {
                console.log("wtff", v);

                handleGuestToggle(v);
              }}
            />
          </div>
        </>
      )}
      {changed && <SaveTip saveHandler={handleUpdateServer} resetHandler={handleReset} />}
    </StyledWrapper>
  );
}
