import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function SignInLink({ token }: { token?: string }) {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/login");
  };
  useEffect(() => {
    const isMobile = "ontouchstart" in document.documentElement;
    // 直接跳转
    if (isMobile && !!token) {
      location.href = `https://join.voce.chat/download?link=${encodeURIComponent(`${location.origin}?magic_token=${token}`)}`;
    }
  }, [token]);

  return (
    <div className="flex gap-1 mt-7 text-sm text-[#667085] dark:text-gray-100 justify-center">
      <span>{t("reg.have_account")}</span>
      <a onClick={handleSignIn} className="text-[#22d3ee] cursor-pointer">{t("sign_in")}</a>
    </div>
  );
}
