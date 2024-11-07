import SettingBlock from "@/components/SettingBlock";
import { useTranslation } from "react-i18next";
import ServerVersionChecker from "@/components/ServerVersionChecker";
import { KEY_MSG_URL_PREVIEW } from "@/app/config";
import useServerExtSetting from "@/hooks/useServerExtSetting";
import Toggle from "@/components/styled/Toggle";

type Props = {};

const EnableMsgURLPreview = ({}: Props) => {
  const { updateExtSetting, getExtSetting } = useServerExtSetting();
  const { t } = useTranslation("setting");
  const enable = getExtSetting(KEY_MSG_URL_PREVIEW);
  const handleToggle = () => {
    updateExtSetting(KEY_MSG_URL_PREVIEW, !enable);
  };
  return (
    <ServerVersionChecker empty version="0.3.50">
      <SettingBlock
        title={t("overview.enable_msg_url_preview.title")}
        desc={t("overview.enable_msg_url_preview.desc")}
        toggler={<Toggle onClick={handleToggle} checked={enable} />}
      ></SettingBlock>
    </ServerVersionChecker>
  );
};

export default EnableMsgURLPreview;
