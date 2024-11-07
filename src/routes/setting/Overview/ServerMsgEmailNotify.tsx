import { useAppSelector } from "@/app/store";
import SettingBlock from "@/components/SettingBlock";
import { useTranslation } from "react-i18next";
import StyledRadio from "@/components/styled/Radio";
import { useGetSystemCommonQuery, useUpdateSystemCommonMutation } from "@/app/services/server";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { shallowEqual } from "react-redux";
import ServerVersionChecker from "@/components/ServerVersionChecker";
import Toggle from "@/components/styled/Toggle";
import { getEmailNotifyDelayList } from "@/app/config";
import useConfig from "@/hooks/useConfig";
import { SMTPConfig } from "@/types/server";

type Props = {};
const items = getEmailNotifyDelayList();
const MsgNotify = ({}: Props) => {
  const { values } = useConfig("smtp");
  const { t } = useTranslation("setting");
  const { t: ct } = useTranslation();
  const { refetch } = useGetSystemCommonQuery();
  const msgNotify = useAppSelector(
    (store) => store.server.msg_smtp_notify_enable ?? false,
    shallowEqual
  );
  const delaySeconds = useAppSelector(
    (store) => store.server.msg_smtp_notify_delay_seconds ?? 0,
    shallowEqual
  );
  const [updateSetting, { isSuccess }] = useUpdateSystemCommonMutation();
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(ct("tip.update"));
    }
  }, [isSuccess]);
  const toggleEnable = () => {
    if (!msgNotify) {
      // 检查下 SMTP 开关
      if (!(values as SMTPConfig).enabled) {
        toast.error("Enable SMTP first!");
        return;
      }
    }
    updateSetting({ msg_smtp_notify_enable: !msgNotify });
  };
  const handleDelayChange = (val: number) => {
    updateSetting({ msg_smtp_notify_delay_seconds: val });
  };

  return (
    <ServerVersionChecker empty version="0.4.0">
      <SettingBlock
        title={t("overview.server_msg_notify.title")}
        desc={t("overview.server_msg_notify.desc")}
        toggler={<Toggle onClick={toggleEnable} checked={msgNotify}></Toggle>}
      >
        <StyledRadio
          disabled={!msgNotify}
          options={items.map((itm) => itm.label)}
          values={items.map((itm) => itm.value)}
          value={delaySeconds}
          onChange={(v) => {
            handleDelayChange(+v);
          }}
        />
      </SettingBlock>
    </ServerVersionChecker>
  );
};

export default MsgNotify;
