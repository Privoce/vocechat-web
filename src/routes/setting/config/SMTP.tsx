import { useState, useEffect, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useSendTestEmailMutation } from "../../../app/services/server";
import IconQuestion from "../../../assets/icons/question.svg";
import useConfig from "../../../common/hook/useConfig";
import Input from "../../../common/component/styled/Input";
import Button from "../../../common/component/styled/Button";
import Toggle from "../../../common/component/styled/Toggle";
import Label from "../../../common/component/styled/Label";
import SaveTip from "../../../common/component/SaveTip";
import { SMTPConfig } from "../../../types/server";

export default function ConfigSMTP() {
  const { t } = useTranslation("setting", { keyPrefix: "smtp" });
  const [testEmail, setTestEmail] = useState("");
  const [sendTestEmail, { isSuccess, isError }] = useSendTestEmailMutation();
  const { reset, updateConfig, values, setValues, changed, toggleEnable } = useConfig("smtp");

  const handleUpdate = () => {
    // const { token_url, description } = values;
    updateConfig({ ...values, port: Number((values as SMTPConfig)?.port ?? 0) });
  };
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newValue = evt.target.value;
    const { type = "" } = evt.target.dataset;
    setValues((prev) => {
      if (!prev) return prev;
      return { ...prev, [type]: newValue };
    });
  };
  const handleTestEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newValue = evt.target.value;
    setTestEmail(newValue);
  };
  const handleTestClick = () => {
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

  if (!values) return null;
  const { host, port, from, username, password, enabled = false } = values as SMTPConfig;
  return (
    <div className="setting-container max-md:w-full">
      <div className="inputs">
        <div className="input row">
          <Label className="dark:text-gray-200">{t("enable")}</Label>
          <Toggle onClick={toggleEnable} checked={enabled}></Toggle>
        </div>
        <div className="input">
          <Label className="dark:text-gray-200" htmlFor="name">{t("host")}</Label>
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
          <Label className="dark:text-gray-200" htmlFor="desc">{t("port")}</Label>
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
          <Label className="dark:text-gray-200" htmlFor="desc">{t("from")}</Label>
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
          <Label className="dark:text-gray-200" htmlFor="desc">{t("username")}</Label>
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
          <Label className="dark:text-gray-200" htmlFor="desc">{t("password")}</Label>
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
        <IconQuestion className="dark:fill-gray-300" />
        <a
          href="https://doc.voce.chat/setting/smtp/smtp-gmail"
          target="_blank"
          className="link"
          rel="noreferrer"
        >
          {t("how_to")}
        </a>
      </div>
      <div className="flex gap-4 whitespace-nowrap mt-6">
        <Input
          type={"email"}
          disabled={!enabled}
          onChange={handleTestEmailChange}
          value={testEmail}
          name="email"
          placeholder="test@email.com"
        />
        <Button disabled={!enabled || !testEmail} onClick={handleTestClick}>
          {t("send_test_email")}
        </Button>
      </div>
      {changed && <SaveTip saveHandler={handleUpdate} resetHandler={reset} />}
      {/* <button onClick={handleUpdate} className="btn">update</button> */}
    </div>
  );
}