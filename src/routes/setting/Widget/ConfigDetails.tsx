import LinkifyText from "@/components/LinkifyText";
import React from "react";
import { useTranslation } from "react-i18next";

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
type Props = {};

const ConfigDetails = ({}: Props) => {
  const { t } = useTranslation("setting", { keyPrefix: "widget" });
  const { t: wt } = useTranslation("widget");
  return (
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
            paramKey: "id",
            paramDefault: "-",
            remarks: t("param_id")
          },
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
            paramKey: "title",
            paramDefault: `[VoceChat Name]`,
            remarks: t("param_title")
          },
          {
            paramKey: "logo",
            paramDefault: `[VoceChat Logo]`,
            remarks: t("param_logo")
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
  );
};

export default ConfigDetails;
