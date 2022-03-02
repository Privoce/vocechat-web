// import { useState, useEffect } from "react";
import useConfig from "./useConfig";
import StyledContainer from "./StyledContainer";
import Input from "../../styled/Input";
import Toggle from "../../styled/Toggle";
import Label from "../../styled/Label";
import SaveTip from "../../SaveTip";
export default function ConfigSMTP() {
  const {
    reset,
    updateConfig,
    values,
    setValues,
    changed,
    toggleEnable,
  } = useConfig("smtp");

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

  //   if (!values) return null;
  const { host, port, from, username, password, enabled = false } =
    values ?? {};
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
            data-type="password"
            onChange={handleChange}
            value={password}
            name="password"
            placeholder="SMTP Password"
          />
        </div>
      </div>
      {changed && <SaveTip saveHandler={handleUpdate} resetHandler={reset} />}
      {/* <button onClick={handleUpdate} className="btn">update</button> */}
    </StyledContainer>
  );
}
