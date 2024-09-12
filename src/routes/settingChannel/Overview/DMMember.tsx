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
  dm_to_member: boolean;
};

const DMMember = ({ id, dm_to_member }: Props) => {
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
    updateSetting({ id, dm_to_member: newVal });
  };
  return (
    <SettingBlock title={t("dm_to_member")} desc={""}>
      <StyledRadio
        options={[t("allow"), t("disallow")]}
        values={["true", "false"]}
        value={`${dm_to_member}`}
        onChange={(v) => {
          handleChange(v == "true");
        }}
      />
    </SettingBlock>
  );
};

export default DMMember;
