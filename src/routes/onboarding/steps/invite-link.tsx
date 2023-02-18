
import { useTranslation } from "react-i18next";
import { useWizard } from "react-use-wizard";
import StyledInput from "../../../common/component/styled/Input";
import StyledButton from "../../../common/component/styled/Button";
import useInviteLink from "../../../common/hook/useInviteLink";
import ServerVersionChecker from "../../../common/component/ServerVersionChecker";
import UpdateFrontendURL from "./UpdateFrontendURL";

export default function InviteLink() {
  const { t } = useTranslation("welcome", { keyPrefix: "onboarding" });
  const { t: ct } = useTranslation();
  const { nextStep } = useWizard();
  const { link, linkCopied, copyLink, generateNewLink } = useInviteLink();

  return (
    <div className="px-2 h-full flex-center flex-col relative dark:text-gray-100">
      <span className="text-2xl mb-2 font-bold">{t("invite_title")}</span>
      <span className="text-sm mb-10 text-gray-400 dark:text-gray-600">{t("last_tip")}</span>
      <span className="text-sm text-gray-500 mb-2 font-semibold">{t("last_desc")}</span>
      <div className="w-full md:w-[400px] rounded shadow-md flex border border-solid border-gray-100">
        <StyledInput className="large !border-none !shadow-none" readOnly placeholder="Generating" value={link} />
        <StyledButton onClick={copyLink} className="ghost small border_less !px-2 hover:!text-primary-600">
          {linkCopied ? "Copied" : ct("action.copy")}
        </StyledButton>
      </div>
      <StyledButton className="w-32 h-11 mt-6" onClick={nextStep}>
        {t("done")}
      </StyledButton>
      <ServerVersionChecker version="0.3.3" empty={true}>
        <UpdateFrontendURL refreshInviteLink={generateNewLink} />
      </ServerVersionChecker>
    </div>
  );
}
