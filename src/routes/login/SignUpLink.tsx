import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Props = {
  smtp?: boolean
}
export default function MagicLinkLogin({ smtp = false }: Props) {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const handleSignUp = () => {
    if (smtp) {
      // 配置了SMTP，走magic link 流程
      navigate("/send_magic_link");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="flex gap-1 mt-7 text-sm text-[#667085] dark:text-gray-100 justify-center">
      <span>{t("login.no_account")}</span>
      <a className="text-[#22d3ee] cursor-pointer" onClick={handleSignUp}>{t("sign_up")}</a>
    </div>
  );
}
