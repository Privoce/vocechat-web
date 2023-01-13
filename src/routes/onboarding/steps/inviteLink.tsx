import StyledInput from "../../../common/component/styled/Input";
import StyledButton from "../../../common/component/styled/Button";
import useInviteLink from "../../../common/hook/useInviteLink";
import { useTranslation } from "react-i18next";
import { useWizard } from "react-use-wizard";
import { ChangeEvent, useState, useEffect } from "react";
import { useUpdateFrontendUrlMutation } from "../../../app/services/server";
import { toast } from "react-hot-toast";
import InfoIcon from '../../../assets/icons/info.svg';
import ServerVersionChecker from "../../../common/component/ServerVersionChecker";

export default function InviteLink() {
  const [updateUrl, { isSuccess, isLoading }] = useUpdateFrontendUrlMutation();
  const { t } = useTranslation("welcome", { keyPrefix: "onboarding" });
  const { t: ct } = useTranslation();
  const { nextStep } = useWizard();
  const { link, linkCopied, copyLink, generateNewLink } = useInviteLink();
  const [frontUrl, setFrontUrl] = useState(location.origin);
  const handleUpdateUrl = (evt: ChangeEvent<HTMLInputElement>) => {
    setFrontUrl(evt.target.value);
  };
  const updateFrontUrl = () => {
    updateUrl(frontUrl);
  };
  useEffect(() => {
    if (isSuccess) {
      generateNewLink();
      toast.success("Update Successfully!");
    }
  }, [isSuccess]);
  return (
    <div className="h-full flex flex-col items-center justify-center relative">
      <span className="text-2xl mb-2 font-bold">{t("invite_title")}</span>
      <span className="text-sm mb-10 text-gray-400">{t("last_tip")}</span>
      <span className="text-sm text-gray-500 mb-2 font-semibold">{t("last_desc")}</span>
      <div className="w-[400px] rounded shadow-md flex border border-solid border-gray-100">
        <StyledInput className="large !border-none !shadow-none" readOnly placeholder="Generating" value={link} />
        <StyledButton onClick={copyLink} className="ghost small border_less !px-2 hover:!text-[#088ab2]">
          {linkCopied ? "Copied" : ct("action.copy")}
        </StyledButton>
      </div>
      <StyledButton className="w-32 h-11 mt-6" onClick={nextStep}>
        {t("done")}
      </StyledButton>
      <ServerVersionChecker version="0.3.2" empty={true}>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 border-2 border-solid border-[#67E3F9] bg-[#F5FEFF] rounded-lg px-2 py-3 flex justify-start gap-4">
          <InfoIcon />
          <div className="flex flex-col items-start gap-2">
            <span className="text-sm text-[#0E7090] mb-1">{t("update_domain_tip")}</span>
            <div className="w-[400px] rounded flex gap-2">
              <StyledInput type={"url"} className="!shadow-none !bg-transparent" placeholder="Frontend URL" value={frontUrl} onChange={handleUpdateUrl} />
              <StyledButton disabled={!frontUrl || isLoading} onClick={updateFrontUrl} className="small ">
                {ct("action.update")}
              </StyledButton>
            </div>
          </div>
        </div>
      </ServerVersionChecker>
    </div>
  );
}
