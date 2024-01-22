// import { useState, MouseEvent } from "react";
// import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import IconQuestion from "@/assets/icons/question.svg";
import { useAppSelector } from "../../app/store";
import Button from "../../components/styled/Button";
import Input from "../../components/styled/Input";
import useCopy from "../../hooks/useCopy";
import { shallowEqual } from "react-redux";
import LinkifyText from "@/components/LinkifyText";

const Row = ({
  paramKey,
  paramDefault,
  remarks
}: {
  paramKey: string;
  paramDefault: string | number;
  remarks: string;
}) => {
  return (
    <tr className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 border-b transition duration-300 ease-in-out md:hover:bg-gray-100 dark:md:hover:bg-gray-900">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{paramKey}</td>
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        {paramKey == "theme-color" ? (
          <span style={{ color: paramDefault as string }}> {paramDefault}</span>
        ) : (
          paramDefault
        )}
      </td>
      <td className="text-sm font-light px-6 py-4">
        <LinkifyText linkPreview={false} text={remarks} mention={false} />
      </td>
    </tr>
  );
};
export default function Widget() {
  const loginUid = useAppSelector((store) => store.authData.user?.uid, shallowEqual);
  const widgetLink = `${location.origin}/widget.html?host=${loginUid}`;
  const { t } = useTranslation("setting", { keyPrefix: "widget" });
  const { t: wt } = useTranslation("widget");
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
        )} -->\n<script \n  data-host-id="${loginUid}" \n  data-auto-reg="true" \n  data-login-token="" \n  data-theme-color="#1fe1f9" \n  data-close-width="48" \n  data-close-height="48" \n  data-open-width="380" \n  data-open-height="680" \n  data-welcome="Your custom welcome text" \n  src="${
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
      <div className="font-semibold dark:text-white mt-5 mb-2">{t("config")}:</div>
      <div className="w-full md:w-[700px] border border-solid border-gray-300 dark:border-gray-400 rounded overflow-auto md:overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="border-b bg-gray-50 dark:bg-gray-500">
            <tr>
              {[t("param_key"), t("default_value"), t("remark")].map((title) => (
                <th
                  key={title}
                  scope="col"
                  className="text-sm font-bold text-gray-900 dark:text-white px-6 py-4 text-left whitespace-nowrap"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {
                paramKey: "host-id",
                paramDefault: 1,
                remarks: t("param_host")
              },
              {
                paramKey: "auto-reg",
                paramDefault: "true",
                remarks: t("param_auto_reg")
              },
              {
                paramKey: "login-token",
                paramDefault: `-`,
                remarks: t("param_login_token")
              },
              {
                paramKey: "theme-color",
                paramDefault: "#1fe1f9",
                remarks: t("param_theme_color")
              },
              {
                paramKey: "close-width",
                paramDefault: `48(px)`,
                remarks: t("param_close_width")
              },
              {
                paramKey: "close-height",
                paramDefault: `48(px)`,
                remarks: t("param_close_height")
              },
              {
                paramKey: "open-width",
                paramDefault: `380(px)`,
                remarks: t("param_open_width")
              },
              {
                paramKey: "open-height",
                paramDefault: `680(px)`,
                remarks: t("param_open_height")
              },
              {
                paramKey: "position",
                paramDefault: `right`,
                remarks: t("param_position")
              },
              {
                paramKey: "welcome",
                paramDefault: wt("welcome"),
                remarks: t("param_welcome")
              }
            ].map((row) => (
              <Row key={row.paramKey} {...row} />
            ))}
          </tbody>
          <tfoot className="border-t border-solid border-gray-200 dark:border-gray-50 dark:bg-gray-500">
            <tr>
              <td colSpan={3} className="text-gray-400 dark:text-white px-5 py-3 text-sm">
                * All the parameters are optional, and prefixed by{" "}
                <i className="bg-gray-700 text-white px-1">data-</i>
              </td>
            </tr>
          </tfoot>
        </table>
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
