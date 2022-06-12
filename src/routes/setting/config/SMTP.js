import { useState, useEffect } from "react";
import styled from "styled-components";
const StyledTest = styled.div`
  display: flex;
  gap: 16px;
  white-space: nowrap;
  margin-top: 24px;
`;
import { useSendTestEmailMutation } from "../../../app/services/server";
import iconQuestion from "../../../assets/icons/question.svg?url";
import useConfig from "../../../common/hook/useConfig";
import StyledContainer from "./StyledContainer";
import Input from "../../../common/component/styled/Input";
import Button from "../../../common/component/styled/Button";
import Toggle from "../../../common/component/styled/Toggle";
import Label from "../../../common/component/styled/Label";
import SaveTip from "../../../common/component/SaveTip";
import toast from "react-hot-toast";

export default function ConfigSMTP() {
  const [testEmail, setTestEmail] = useState("");
  const [sendTestEmail, { isSuccess, isError }] = useSendTestEmailMutation();
  const { reset, updateConfig, values, setValues, changed, toggleEnable } = useConfig("smtp");

  const handleUpdate = () => {
    // const { token_url, description } = values;
    updateConfig({ ...values, port: Number(values.port ?? 0) });
  };
  const handleChange = (evt) => {
    const newValue = evt.target.value;
    const { type } = evt.target.dataset;
    setValues((prev) => {
      return { ...prev, [type]: newValue };
    });
  };
  const handleTestEmailChange = (evt) => {
    const newValue = evt.target.value;
    setTestEmail(newValue);
  };
  const handleTestClick = () => {
    console.log("test");
    sendTestEmail({
      to: testEmail,
      subject: "test title",
      content: "test content"
    });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Send Test Email Successfully");
    }
    if (isError) {
      toast.error("Send Test Email Fail");
    }
  }, [isSuccess, isError]);

  //   if (!values) return null;
  const { host, port, from, username, password, enabled = false } = values ?? {};
  console.log("values", values);
  return (
    <StyledContainer>
      <div className="inputs">
        <div className="input row">
          <Label>Enable</Label>
          <Toggle onClick={toggleEnable} data-checked={enabled}></Toggle>
        </div>
        <div className="input">
          <Label htmlFor="name">Host</Label>
          <Input
            disabled={!enabled}
            data-type="host"
            onChange={handleChange}
            value={host}
            name="host"
            placeholder="SMTP Host"
          />
        </div>
        <div className="input">
          <Label htmlFor="desc">Port</Label>
          <Input
            disabled={!enabled}
            type={"number"}
            data-type="port"
            onChange={handleChange}
            value={port}
            name="port"
            placeholder="SMTP Port"
          />
        </div>
        <div className="input">
          <Label htmlFor="desc">From</Label>
          <Input
            disabled={!enabled}
            data-type="from"
            onChange={handleChange}
            value={from}
            name="from"
            placeholder="SMTP From"
          />
        </div>
        <div className="input">
          <Label htmlFor="desc">Username</Label>
          <Input
            disabled={!enabled}
            data-type="username"
            onChange={handleChange}
            value={username}
            name="username"
            placeholder="SMTP Username"
          />
        </div>
        <div className="input">
          <Label htmlFor="desc">Password</Label>
          <Input
            type={"password"}
            disabled={!enabled}
            data-type="password"
            onChange={handleChange}
            value={password}
            name="password"
            placeholder="SMTP Password"
          />
        </div>
      </div>
      <div className="tip">
        <img src={iconQuestion} alt="question icon" />
        <a
          href="https://rustchat.com/doc/smtp-setting"
          target="_blank"
          className="link"
          rel="noreferrer"
        >
          How to set up SMTP?
        </a>
      </div>
      <StyledTest>
        <Input
          type={"email"}
          disabled={!enabled}
          onChange={handleTestEmailChange}
          value={testEmail}
          name="email"
          placeholder="test@email.com"
        />
        <Button disabled={!enabled || !testEmail} onClick={handleTestClick}>
          Send Test Email
        </Button>
      </StyledTest>
      {changed && <SaveTip saveHandler={handleUpdate} resetHandler={reset} />}
      {/* <button onClick={handleUpdate} className="btn">update</button> */}
    </StyledContainer>
  );
}
