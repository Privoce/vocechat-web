import SettingBlock from "@/components/SettingBlock";
import { useTranslation } from "react-i18next";
import StyledRadio from "@/components/styled/Radio";
import ServerVersionChecker from "@/components/ServerVersionChecker";
import { KEY_MSG_URL_PREVIEW } from "@/app/config";
import useServerExtSetting from "@/hooks/useServerExtSetting";

type Props = {};

const EnableMsgURLPreview = ({}: Props) => {
  const { updateExtSetting, getExtSetting } = useServerExtSetting();
  const { t } = useTranslation("setting");
  const handleChange = (newVal: boolean) => {
    updateExtSetting(KEY_MSG_URL_PREVIEW, newVal);
  };
  const enable = getExtSetting(KEY_MSG_URL_PREVIEW);
  return (
    <ServerVersionChecker empty version="0.3.50">
      <SettingBlock
        title={t("overview.enable_msg_url_preview.title")}
        desc={t("overview.enable_msg_url_preview.desc")}
      >
        <StyledRadio
          options={[
            t("overview.enable_msg_url_preview.enable"),
            t("overview.enable_msg_url_preview.disable")
          ]}
          values={["true", "false"]}
          value={`${enable}`}
          onChange={(v) => {
            handleChange(v == "true");
          }}
        />
      </SettingBlock>
    </ServerVersionChecker>
  );
};

export default EnableMsgURLPreview;
