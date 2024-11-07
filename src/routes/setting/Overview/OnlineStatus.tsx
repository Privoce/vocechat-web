// import React from 'react'
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

// type Props = {}

const Index = () => {
  const currStatus = useAppSelector(
    (store) => !!store.server.show_user_online_status,
    shallowEqual
  );
  const { t } = useTranslation("setting", { keyPrefix: "overview.online_status" });
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
    updateSetting({ show_user_online_status: !currStatus });
  };
  // if (!loadSuccess) return null;
  return (
    <SettingBlock
      title={t("title")}
      desc={t("desc")}
      toggler={<Toggle onClick={handleToggle} checked={currStatus} />}
    ></SettingBlock>
  );
};

export default Index;
