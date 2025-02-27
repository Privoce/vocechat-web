import SettingBlock from "@/components/SettingBlock";
import useConfig from "@/hooks/useConfig";
import { LoginConfig, WhoCanSignUp } from "@/types/server";
import { useTranslation } from "react-i18next";
import StyledRadio from "../../../components/styled/Radio";
type Props = {};

const WhoCanSignUpSetting = ({}: Props) => {
  const { t } = useTranslation("setting");
  const { values: loginConfig, updateConfig: updateLoginConfig } = useConfig("login");
  const handleUpdateWhoCanSignUp = (value: WhoCanSignUp) => {
    updateLoginConfig({ ...loginConfig, who_can_sign_up: value });
  };

  if (!loginConfig) return null;
  const { who_can_sign_up: whoCanSignUp } = loginConfig as LoginConfig;
  return (
    <SettingBlock title={t("overview.sign_up.title")} desc={t("overview.sign_up.desc")}>
      <StyledRadio
        options={[t("overview.sign_up.everyone"), t("overview.sign_up.invite")]}
        values={["EveryOne", "InvitationOnly"]}
        value={whoCanSignUp}
        onChange={(v: WhoCanSignUp) => {
          handleUpdateWhoCanSignUp(v);
        }}
      />
    </SettingBlock>
  );
};

export default WhoCanSignUpSetting;
