// import React from 'react'
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import SettingBlock from "@/components/SettingBlock";
import StyledRadio from "@/components/styled/Radio";
import {
  useGetSystemCommonQuery,
  useUpdateSystemCommonMutation
} from "../../../app/services/server";
import { useAppSelector } from "../../../app/store";
import { shallowEqual } from "react-redux";

// type Props = {}

const Index = () => {
  const currStatus = useAppSelector(
    (store) => !!store.server.contact_verification_enable,
    shallowEqual
  );
  const { t } = useTranslation("setting", { keyPrefix: "overview.contact_verify" });
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
    updateSetting({ contact_verification_enable: !currStatus });
  };
  // if (!loadSuccess) return null;
  return (
    <SettingBlock title={t("title")} desc={t("desc")}>
      <StyledRadio
        options={[t("enable"), t("disable")]}
        values={["true", "false"]}
        value={`${currStatus}`}
        onChange={handleToggle}
      />
    </SettingBlock>
  );
};

export default Index;
