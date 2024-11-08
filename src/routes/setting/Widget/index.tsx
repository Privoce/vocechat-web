// import { useState, MouseEvent } from "react";
// import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import IconQuestion from "@/assets/icons/question.svg";
import { useAppSelector } from "@/app/store";
import Button from "@/components/styled/Button";
import Input from "@/components/styled/Input";
import useCopy from "@/hooks/useCopy";
import { shallowEqual } from "react-redux";
import ConfigDetails from "./ConfigDetails";
import ExtCSS from "./ExtCSS";
import ServerVersionChecker from "@/components/ServerVersionChecker";

export default function Widget() {
  const loginUid = useAppSelector((store) => store.authData.user?.uid, shallowEqual);
  const widgetLink = `${location.origin}/widget.html?host=${loginUid}`;
  const { t } = useTranslation("setting", { keyPrefix: "widget" });
  const { t: ct } = useTranslation();
  const { copied, copy } = useCopy({ enableToast: false });
  const copyLink = () => {
    copy(widgetLink);
  };
  // const disableBtn = !reachLimit;
  return (
    <div className="flex flex-col justify-start items-start">
      <div className="font-semibold dark:text-white">{t("tip")}</div>
      <label htmlFor="code" className="font-semibold dark:text-white">
        {t("code")}:
      </label>
      <SyntaxHighlighter id="code" language="html" style={vscDarkPlus} className="rounded">
        {`<!-- ${t(
          "code_comment"
        )} -->\n<script \n  data-host-id="${loginUid}" \n  data-auto-reg="true" \n  data-login-token="" \n  data-title="" \n  data-logo="" \n  data-theme-color="#1fe1f9" \n  data-close-width="48" \n  data-close-height="48" \n  data-open-width="380" \n  data-open-height="680" \n  data-welcome="Your custom welcome text" \n  src="${
          location.origin
        }/widget.js" \n  async \n></script>`}
      </SyntaxHighlighter>
      <div className="text-sm dark:text-white">{t("custom_style_tip")}:</div>
      <SyntaxHighlighter id="code" language="html" style={vscDarkPlus} className="rounded">
        {`<style>
  #VOCECHAT_WIDGET {
    left:10px  /* left position */
    bottom: 5px /* bottom position */
  }
</style>`}
      </SyntaxHighlighter>
      <ServerVersionChecker version="0.4.0">
        <div className="flex flex-col gap-2">
          <div className="text-sm dark:text-white">{t("css_code_tip")}:</div>
          <ExtCSS />
        </div>
      </ServerVersionChecker>
      <div className="font-semibold dark:text-white mt-5 mb-2">{t("config")}:</div>
      <div className="w-full md:w-[700px] border border-solid border-gray-300 dark:border-gray-400 rounded overflow-auto md:overflow-hidden">
        {/* 配置说明 */}
        <ConfigDetails />
      </div>
      <div className="mt-8">
        <p className="text-sm mb-2 text-gray-500 dark:text-gray-50 flex flex-col md:flex-row gap-4">
          {t("share_link")}{" "}
          <a
            className="text-primary-500 flex gap-1 items-center"
            href="https://doc.voce.chat/widget"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconQuestion /> {t("widget_faq")}
          </a>
        </p>
        <div className="w-full md:w-96 mb-3 relative">
          <Input readOnly className={"large !pr-16"} value={widgetLink} />
          <Button
            onClick={copyLink}
            className="ghost small border_less absolute right-1 top-1/2 -translate-y-1/2 dark:!text-primary-400"
          >
            {copied ? "Copied" : ct("action.copy")}
          </Button>
        </div>
      </div>
    </div>
  );
}
