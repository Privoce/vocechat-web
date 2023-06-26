import { FC, MouseEvent } from "react";
import { Trans, useTranslation } from "react-i18next";

import BASE_URL from "@/app/config";
import Button from "@/components/styled/Button";

interface Props {
  email: string;
  handleBack: () => void;
}

const SentTip: FC<Props> = ({ email, handleBack }) => {
  const { t } = useTranslation("auth");
  return (
    <div className="flex flex-col items-center max-w-sm">
      <img
        src={`${BASE_URL}/resource/organization/logo`}
        alt="logo"
        className="w-14 h-14 mb-2 md:mb-7 rounded-full"
      />
      <h2 className="font-semibold text-2xl text-gray-900 dark:text-gray-100 mb-2">
        {t("check_email")}
      </h2>
      <span className="text-center text-gray-500 mb-6">
        <Trans i18nKey={"check_email_desc"} ns="auth" values={{ email }}>
          <strong className="font-bold" />
        </Trans>
      </span>
      <Button onClick={handleBack} className="flex-center ghost">
        {t("back_sign_in")}
      </Button>
    </div>
  );
};

export default SentTip;
