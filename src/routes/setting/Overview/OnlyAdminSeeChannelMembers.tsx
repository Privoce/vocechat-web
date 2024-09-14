import { useAppSelector } from "@/app/store";
import SettingBlock from "@/components/SettingBlock";
import { useTranslation } from "react-i18next";
import StyledRadio from "@/components/styled/Radio";
import { useGetSystemCommonQuery, useUpdateSystemCommonMutation } from "@/app/services/server";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { shallowEqual } from "react-redux";
import ServerVersionChecker from "@/components/ServerVersionChecker";
import { getJSONField, upsertJSON } from "@/utils";
import { KEY_ADMIN_SEE_CHANNEL_MEMBERS } from "@/app/config";

type Props = {};

const OnlyAdminCanSeeChannelMembers = ({}: Props) => {
  const { t } = useTranslation("setting");
  const { t: ct } = useTranslation();
  const { refetch } = useGetSystemCommonQuery();
  const serverExtSetting = useAppSelector(
    (store) => store.server.ext_setting ?? "{}",
    shallowEqual
  );
  const [updateSetting, { isSuccess }] = useUpdateSystemCommonMutation();
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(ct("tip.update"));
    }
  }, [isSuccess]);
  const handleChange = (newVal: boolean) => {
    const json = upsertJSON(serverExtSetting, { [KEY_ADMIN_SEE_CHANNEL_MEMBERS]: newVal });
    updateSetting({ ext_setting: json });
  };
  const onlyAdminSeeChannelMembers =
    getJSONField(serverExtSetting, KEY_ADMIN_SEE_CHANNEL_MEMBERS) ?? false;
  return (
    <ServerVersionChecker empty version="0.3.50">
      <SettingBlock
        title={t("overview.admin_see_group_members.title")}
        desc={t("overview.admin_see_group_members.desc")}
      >
        <StyledRadio
          options={[
            t("overview.admin_see_group_members.enable"),
            t("overview.admin_see_group_members.disable")
          ]}
          values={["true", "false"]}
          value={`${onlyAdminSeeChannelMembers}`}
          onChange={(v) => {
            handleChange(v == "true");
          }}
        />
      </SettingBlock>
    </ServerVersionChecker>
  );
};

export default OnlyAdminCanSeeChannelMembers;
