import StyledButton from "@/components/styled/Button";
import PlayIcon from "@/assets/icons/play.svg?url";
import { useTranslation } from "react-i18next";
import { useWizard } from "react-use-wizard";


export default function WelcomePage() {
  const { t } = useTranslation("welcome", { keyPrefix: "onboarding" });
  const { nextStep } = useWizard();
  return (
    <div className="flex-center flex-col h-full text-center dark:text-gray-100">
      <span className="text-2xl mb-2 font-bold">{t("welcome")}</span>
      <span className="text-sm mb-6">
        {t("welcome_desc")}
      </span>
      <StyledButton className="!w-32 h-auto flex flex-col gap-2 items-center py-3 text-sm" onClick={nextStep}>
        <img src={PlayIcon} alt="play icon" />
        <span>{t("start")}</span>
      </StyledButton>
    </div>
  );
}
