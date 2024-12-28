import { useAppSelector } from "@/app/store";
import SettingBlock from "@/components/SettingBlock";
import { useTranslation } from "react-i18next";
import { useGetSystemCommonQuery } from "@/app/services/server";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { shallowEqual } from "react-redux";
import ServerVersionChecker from "@/components/ServerVersionChecker";
import Toggle from "@/components/styled/Toggle";
import { useUpdateInfoMutation } from "@/app/services/user";

type Props = {};
const UserMsgEmailNotify = ({}: Props) => {
  const [updateInfo, { isSuccess }] = useUpdateInfoMutation();
  const { t } = useTranslation("setting");
  const { t: ct } = useTranslation();
  const { refetch } = useGetSystemCommonQuery();
  const ServerMsgNotify = useAppSelector(
    (store) => store.server.msg_smtp_notify_enable ?? false,
    shallowEqual
  );
  const msgNotify = useAppSelector(
    (store) => store.authData.user?.msg_smtp_notify_enable ?? false,
    shallowEqual
  );
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(ct("tip.update"));
    }
  }, [isSuccess]);
  const toggleEnable = () => {
    updateInfo({ msg_smtp_notify_enable: !msgNotify });
  };
  if (!ServerMsgNotify) return null;
  return (
    <ServerVersionChecker empty version="0.4.0">
      <SettingBlock
        title={t("overview.user_msg_notify.title")}
        desc={t("overview.user_msg_notify.desc")}
        toggler={<Toggle onClick={toggleEnable} checked={msgNotify}></Toggle>}
      ></SettingBlock>
    </ServerVersionChecker>
  );
};

export default UserMsgEmailNotify;
