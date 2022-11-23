import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


export default function MagicLinkLogin() {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="flex gap-1 mt-7 text-sm text-[#667085] justify-center">
      <span>{t("login.no_account")}</span>
      <a className="text-[#22d3ee] cursor-pointer" onClick={handleSignUp}>{t("sign_up")}</a>
    </div>
  );
}
