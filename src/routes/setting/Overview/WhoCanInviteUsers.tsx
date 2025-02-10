import SettingBlock from "@/components/SettingBlock";
import { useTranslation } from "react-i18next";
import ServerVersionChecker from "@/components/ServerVersionChecker";
import { KEY_ADMIN_ONLY_INVITE } from "@/app/config";
import useServerExtSetting from "@/hooks/useServerExtSetting";
import Toggle from "@/components/styled/Toggle";

type Props = {};

const WhoCanInviteUsers = ({}: Props) => {
  const { updateExtSetting, getExtSetting } = useServerExtSetting();
  const { t } = useTranslation("setting");
  const adminOnlyCanInvite = getExtSetting(KEY_ADMIN_ONLY_INVITE);
  const handleToggle = () => {
    updateExtSetting(KEY_ADMIN_ONLY_INVITE, !adminOnlyCanInvite);
  };
  return (
    <ServerVersionChecker empty version="0.3.50">
      <SettingBlock
        title={t("overview.admin_only_can_invite.title")}
        desc={t("overview.admin_only_can_invite.desc")}
        toggler={<Toggle onClick={handleToggle} checked={adminOnlyCanInvite} />}
      ></SettingBlock>
    </ServerVersionChecker>
  );
};

export default WhoCanInviteUsers;
