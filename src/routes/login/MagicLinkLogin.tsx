import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Button from "@/components/styled/Button";

type Props = {
  email: string;
};
export default function MagicLinkLogin({ email }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation("auth", { keyPrefix: "login" });
  const handleLogin = () => {
    navigate(`/send_magic_link/${email}`);
  };

  return (
    <Button className="w-full ghost" onClick={handleLogin}>
      {t("magic_link")}
    </Button>
  );
}
