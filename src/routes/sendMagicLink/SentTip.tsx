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
    <div className="tips">
      <h2 className="title">{t("check_email")}</h2>
      <span className="desc">
        {t("check_email_desc", { email })}
      </span>
      <Button onClick={reset} className="main flex">
        {t("use_different")}
      </Button>
    </div>
  );
};

export default SentTip;
