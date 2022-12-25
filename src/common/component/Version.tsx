import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useGetServerVersionQuery } from "../../app/services/server";
type Props = {};
const Version: FC<Props> = () => {
  const { t } = useTranslation("setting", { keyPrefix: "version" });
  const { data: serverVersion } = useGetServerVersionQuery();
  return (
    <div className="flex flex-col gap-3">
      <div className="item">{t("client_version")}: {process.env.VERSION}</div>
      <div className="item">{t("server_version")}: {serverVersion}</div>
      <div className="item">{t("build_time")}: {process.env.REACT_APP_BUILD_TIME}</div>
    </div>
  );
};
export default Version;
