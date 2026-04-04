import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { shallowEqual } from "react-redux";

import SettingBlock from "@/components/SettingBlock";
import Toggle from "@/components/styled/Toggle";
import { useGetSystemCommonQuery, useUpdateSystemCommonMutation } from "@/app/services/server";
import { useAppSelector } from "@/app/store";

const AddFriendEnable = () => {
  const { t } = useTranslation("setting", { keyPrefix: "overview.add_friend_enable" });
  const { t: ct } = useTranslation();
  const { refetch } = useGetSystemCommonQuery();
  const addFriendEnable = useAppSelector(
    (store) => store.server.add_friend_enable ?? true,
    shallowEqual
  );
  const [updateSetting, { isSuccess }] = useUpdateSystemCommonMutation();

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(ct("tip.update"));
    }
  }, [isSuccess]);

  const handleToggle = () => {
    updateSetting({ add_friend_enable: !addFriendEnable });
  };

  return (
    <SettingBlock
      title={t("title")}
      desc={t("desc")}
      toggler={<Toggle onClick={handleToggle} checked={addFriendEnable} />}
    />
  );
};

export default AddFriendEnable;
