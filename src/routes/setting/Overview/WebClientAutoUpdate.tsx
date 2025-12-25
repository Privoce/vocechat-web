import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import SettingBlock from "@/components/SettingBlock";
import {
  useGetSystemCommonQuery,
  useUpdateSystemCommonMutation
} from "../../../app/services/server";
import { useAppSelector } from "../../../app/store";
import { shallowEqual } from "react-redux";
import Toggle from "@/components/styled/Toggle";

const WebClientAutoUpdate = () => {
  const currStatus = useAppSelector(
    (store) => !!store.server.webclient_auto_update,
    shallowEqual
  );
  const { t } = useTranslation("setting", { keyPrefix: "overview.webclient_auto_update" });
  const { t: ct } = useTranslation();
  const { refetch } = useGetSystemCommonQuery();
  const [updateSetting, { isSuccess }] = useUpdateSystemCommonMutation();
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(ct("tip.update"));
    }
  }, [isSuccess]);
  const handleToggle = () => {
    updateSetting({ webclient_auto_update: !currStatus });
  };
  return (
    <SettingBlock
      title={t("title")}
      desc={t("desc")}
      toggler={<Toggle onClick={handleToggle} checked={currStatus} />}
    ></SettingBlock>
  );
};

export default WebClientAutoUpdate;

