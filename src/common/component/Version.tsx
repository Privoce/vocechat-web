import dayjs from "dayjs";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useGetServerVersionQuery } from "../../app/services/server";
type Props = {};
const Version: FC<Props> = () => {
  const { t } = useTranslation("setting", { keyPrefix: "version" });
  const { data: serverVersion } = useGetServerVersionQuery();
  const ts = (process.env.REACT_APP_BUILD_TIME ?? 0) as number;
  return (
    <ul className="flex flex-col gap-2 dark:text-white">
      <li>{t("client_version")}: {process.env.VERSION}</li>
      <li>{t("server_version")}: {serverVersion}</li>
      <li>{t("build_time")}: {ts}  <span className="text-gray-700 dark:text-gray-300">({dayjs(ts * 1000).fromNow()})</span></li>
      <li>GitHub:&nbsp;
        <strong className="font-bold">
          <a className="text-primary-600 underline underline-offset-2" href="https://github.com/Privoce/vocechat-web/issues" target="_blank" rel="noopener noreferrer">vocechat-web/issues</a>
        </strong>
      </li>
    </ul>
  );
};
export default Version;
