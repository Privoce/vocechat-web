import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import StyledRadio from "@/components/styled/Radio";
import StyledButton from "@/components/styled/Button";
import { useGetLoginConfigQuery, useUpdateLoginConfigMutation } from "@/app/services/server";
import { WhoCanSignUp } from "@/types/server";
import { useTranslation } from "react-i18next";
import { useWizard } from "react-use-wizard";

export default function SignUpSetting() {
  const { t } = useTranslation("welcome");
  const { t: st } = useTranslation("setting");
  const { nextStep } = useWizard();
  const { data: loginConfig, refetch } = useGetLoginConfigQuery();
  const [updateLoginConfig, { isSuccess, error }] = useUpdateLoginConfigMutation();

  const [value, setValue] = useState<WhoCanSignUp>();
  useEffect(() => {
    refetch();
  }, []);

  // Sync to `value` when `loginConfig` is fetched
  useEffect(() => {
    if (loginConfig) {
      console.log("login config", loginConfig.who_can_sign_up);

      setValue(loginConfig.who_can_sign_up);
    }
  }, [loginConfig]);

  // Display error
  useEffect(() => {
    if (error === undefined) return;
    toast.error(`Failed to update sign up rule: ${error.data}`);
  }, [error]);

  // Increment `step` when updating has completed
  useEffect(() => {
    if (isSuccess) nextStep();
  }, [isSuccess]);


  return (
    <div className="h-full px-2 flex-center flex-col text-center w-full md:w-[512px] m-auto dark:text-gray-100">
      <span className="font-bold text-2xl mb-2">{t("onboarding.invite_title")}</span>
      <span className="text-sm mb-6">{t("onboarding.invite_desc")}</span>
      {value && <StyledRadio
        options={[st("overview.sign_up.everyone"), st("overview.sign_up.invite")]}
        values={["EveryOne", "InvitationOnly"]}
        value={value}
        onChange={setValue}
      />}
      <StyledButton
        className="w-32 mt-6"
        disabled={!value}
        onClick={() => {
          // nextStep();
          if (loginConfig !== undefined) {
            if (loginConfig.who_can_sign_up !== value) {

              updateLoginConfig({
                ...loginConfig,
                who_can_sign_up: value
              });
            } else {
              nextStep();
            }
          }
        }}
      >
        {t("onboarding.confirm")}
      </StyledButton>
    </div>
  );
}
