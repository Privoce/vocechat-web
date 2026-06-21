import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { shallowEqual } from "react-redux";

import StyledButton from "@/components/styled/Button";
import PlayIcon from "@/assets/icons/play.svg?url";
import { useGetAutoTunnelInfoQuery } from "@/app/services/server";
import { useAppSelector } from "@/app/store";
import { compareVersion } from "@/utils";

const TUNNEL_MIN_VERSION = "0.5.19";

export default function DonePage({ serverName }: { serverName: string }) {
  const { t } = useTranslation("welcome", { keyPrefix: "onboarding" });
  const navigate = useNavigate();
  const currentVersion = useAppSelector((store) => store.server.version, shallowEqual);
  const versionOk = !!currentVersion && compareVersion(currentVersion, TUNNEL_MIN_VERSION) >= 0;
  const { data: autoInfo } = useGetAutoTunnelInfoQuery(undefined, { skip: !versionOk });

  const tunnelUrl =
    autoInfo?.tunnel_status.status === "running" ? autoInfo.tunnel_status.url : null;

  return (
    <div className="h-full px-2 flex-center flex-col text-center md:w-[588px] m-auto dark:text-gray-100">
      <span className="text-2xl font-bold mb-2">{t("done_welcome", { serverName })}</span>
      <span className="text-sm mb-6">{t("done_title")}</span>
      <span className="text-xl mb-6">
        <Trans i18nKey={"onboarding.done_desc"} ns={"welcome"}>
          <span className="font-bold" />
        </Trans>
      </span>
      {tunnelUrl && (
        <div className="w-full mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg text-left">
          <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-1">
            {t("tunnel_domain_assigned")}
          </p>
          <a
            href={tunnelUrl}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm text-green-600 dark:text-green-400 break-all hover:underline"
          >
            {tunnelUrl}
          </a>
        </div>
      )}
      <StyledButton
        className="!w-32 h-auto flex flex-col items-center py-3"
        onClick={() => navigate("/")}
      >
        <img className="mb-2" src={PlayIcon} alt="play icon" />
        <span className="text-sm">{t("enter")}</span>
      </StyledButton>
    </div>
  );
}
