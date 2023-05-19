import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import StyledButton from "@/components/styled/Button";
import PlayIcon from "@/assets/icons/play.svg?url";

export default function DonePage({ serverName }: { serverName: string }) {
  const { t } = useTranslation("welcome", { keyPrefix: "onboarding" });
  const navigate = useNavigate();

  return (
    <div className="h-full px-2 flex-center flex-col text-center md:w-[588px] m-auto dark:text-gray-100">
      <span className="text-2xl font-bold mb-2">{t("done_welcome", { serverName })}</span>
      <span className="text-sm mb-12">{t("done_title")}</span>
      <span className="text-xl mb-12">
        <Trans i18nKey={"onboarding.done_desc"} ns={"welcome"}>
          <span className="font-bold" />
        </Trans>
      </span>
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
