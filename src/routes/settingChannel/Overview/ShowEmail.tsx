import {
  //   useGetChannelQuery,
  useLazyGetChannelQuery,
  useUpdateChannelMutation
} from "@/app/services/channel";
// import { useAppSelector } from "@/app/store";
import SettingBlock from "@/components/SettingBlock";
import StyledRadio from "@/components/styled/Radio";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
// import { shallowEqual } from "react-redux";

type Props = {
  id: number;
  show_email: boolean;
};

const ShowEmail = ({ id, show_email }: Props) => {
  const { t } = useTranslation("setting", { keyPrefix: "channel" });
  const { t: ct } = useTranslation();
  const [refetch] = useLazyGetChannelQuery();
  // const onlyAdminCreateGroup = useAppSelector(
  //   (store) => store.server.only_admin_can_create_group ?? false,
  //   shallowEqual
  // );
  const [updateSetting, { isSuccess }] = useUpdateChannelMutation();
  useEffect(() => {
    if (isSuccess) {
      refetch(id);
      toast.success(ct("tip.update"));
    }
  }, [isSuccess, id]);
  const handleChange = (newVal: boolean) => {
    updateSetting({ id, show_email: newVal });
  };
  return (
    <SettingBlock title={t("show_email")} desc={""}>
      <StyledRadio
        options={[t("enable"), t("disable")]}
        values={["true", "false"]}
        value={`${show_email}`}
        onChange={(v) => {
          handleChange(v == "true");
        }}
      />
    </SettingBlock>
  );
};

export default ShowEmail;
