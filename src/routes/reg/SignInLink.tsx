import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function SignInLink({ token }: { token?: string }) {
  const { t } = useTranslation("auth");
  const handleSignIn = () => {
    location.href = "/#/login";
  };
  useEffect(() => {
    const isMobile = "ontouchstart" in document.documentElement;
    // 直接跳转
    if (isMobile && !!token) {
      location.href = `https://join.voce.chat/download?link=${encodeURIComponent(`${location.origin}?magic_token=${token}`)}`;
    }
  }, [token]);

  return (
    <div className="flex gap-1 mt-7 text-sm text-[#667085] justify-center">
      <span>{t("reg.have_account")}</span>
      <a onClick={handleSignIn} className="text-[#22d3ee] cursor-pointer">{t("sign_in")}</a>
    </div>
  );
}
