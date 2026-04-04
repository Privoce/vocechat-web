import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { shallowEqual } from "react-redux";

import SettingBlock from "@/components/SettingBlock";
import Toggle from "@/components/styled/Toggle";
import { useGetSystemCommonQuery, useUpdateSystemCommonMutation } from "@/app/services/server";
import { useAppSelector } from "@/app/store";

const SearchUserEnable = () => {
  const { t } = useTranslation("setting", { keyPrefix: "overview.search_user_enable" });
  const { t: ct } = useTranslation();
  const { refetch } = useGetSystemCommonQuery();
  const searchUserEnable = useAppSelector(
    (store) => store.server.search_user_enable ?? true,
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
    updateSetting({ search_user_enable: !searchUserEnable });
  };

  return (
    <SettingBlock
      title={t("title")}
      desc={t("desc")}
      toggler={<Toggle onClick={handleToggle} checked={searchUserEnable} />}
    />
  );
};

export default SearchUserEnable;
