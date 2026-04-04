import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { shallowEqual } from "react-redux";

import SettingBlock from "@/components/SettingBlock";
import Toggle from "@/components/styled/Toggle";
import { useGetSystemCommonQuery, useUpdateSystemCommonMutation } from "@/app/services/server";
import { useAppSelector } from "@/app/store";

const DMEnable = () => {
  const { t } = useTranslation("setting", { keyPrefix: "overview.dm_enable" });
  const { t: ct } = useTranslation();
  const { refetch } = useGetSystemCommonQuery();
  const dmEnable = useAppSelector((store) => store.server.dm_enable ?? true, shallowEqual);
  const [updateSetting, { isSuccess }] = useUpdateSystemCommonMutation();

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(ct("tip.update"));
    }
  }, [isSuccess]);

  const handleToggle = () => {
    updateSetting({ dm_enable: !dmEnable });
  };

  return (
    <SettingBlock
      title={t("title")}
      desc={t("desc")}
      toggler={<Toggle onClick={handleToggle} checked={dmEnable} />}
    />
  );
};

export default DMEnable;
