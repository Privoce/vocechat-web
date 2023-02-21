import Button from "../../common/component/styled/Button";
import { FC, MouseEvent } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  email: string;
  reset?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SentTip: FC<Props> = ({ email, reset }) => {
  const { t } = useTranslation("auth");
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-semibold text-2xl text-gray-800 dark:text-gray-200 mb-2">{t("check_email")}</h2>
      <span className="text-center text-gray-500 mb-6">
        {t("check_email_desc", { email })}
      </span>
      <Button onClick={reset} className="main flex">
        {t("use_different")}
      </Button>
    </div>
  );
};

export default SentTip;
