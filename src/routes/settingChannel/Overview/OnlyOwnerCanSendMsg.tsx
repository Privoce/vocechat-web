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
  only_owner_can_send_msg: boolean;
};

const OnlyOwnerCanSendMsg = ({ id, only_owner_can_send_msg }: Props) => {
  const { t } = useTranslation("setting");
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
    updateSetting({ id, only_owner_can_send_msg: newVal });
  };
  return (
    <SettingBlock title={"Only Owner Send Message"} desc={""}>
      <StyledRadio
        options={["Enable", "Disable"]}
        values={["true", "false"]}
        value={`${only_owner_can_send_msg}`}
        onChange={(v) => {
          handleChange(v == "true");
        }}
      />
    </SettingBlock>
  );
};

export default OnlyOwnerCanSendMsg;
