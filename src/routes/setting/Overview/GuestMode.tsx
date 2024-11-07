import SettingBlock from "@/components/SettingBlock";
import { useTranslation } from "react-i18next";
import Toggle from "@/components/styled/Toggle";
import useConfig from "@/hooks/useConfig";
import { LoginConfig } from "@/types/server";

type Props = {};

const GuestMode = ({}: Props) => {
  const { values: loginConfig, updateConfig: updateLoginConfig } = useConfig("login");

  const { t } = useTranslation("setting");
  const handleGuestToggle = (v: boolean) => {
    updateLoginConfig({ ...loginConfig, guest: v });
  };
  if (!loginConfig) return null;
  const { guest = false } = loginConfig as LoginConfig;
  return (
    <SettingBlock
      title={t("overview.guest_mode.title")}
      desc={t("overview.guest_mode.desc")}
      toggler={<Toggle onClick={handleGuestToggle.bind(null, !guest)} checked={guest} />}
    ></SettingBlock>
  );
};

export default GuestMode;
