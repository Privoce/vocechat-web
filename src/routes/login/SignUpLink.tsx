import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// type Props = {
// }
export default function SignUpLink() {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="flex gap-1 mt-7 text-sm text-slate-500 dark:text-gray-100 justify-center">
      <span>{t("login.no_account")}</span>
      <a className="text-primary-400 cursor-pointer" onClick={handleSignUp}>{t("sign_up")}</a>
    </div>
  );
}
