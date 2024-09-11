import { useAppSelector } from "@/app/store";
import SettingBlock from "@/components/SettingBlock";
import { useTranslation } from "react-i18next";
import StyledRadio from "@/components/styled/Radio";
import { useGetSystemCommonQuery, useUpdateSystemCommonMutation } from "@/app/services/server";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { shallowEqual } from "react-redux";
import ServerVersionChecker from "@/components/ServerVersionChecker";

type Props = {};

const OnlyAdminCreateGroup = ({}: Props) => {
  const { t } = useTranslation("setting");
  const { t: ct } = useTranslation();
  const { refetch } = useGetSystemCommonQuery();
  const onlyAdminCreateGroup = useAppSelector(
    (store) => store.server.only_admin_can_create_group ?? false,
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
    updateSetting({ only_admin_can_create_group: newVal });
  };
  return (
    <ServerVersionChecker empty version="0.3.50">
      <SettingBlock
        title={t("overview.admin_create_group.title")}
        desc={t("overview.admin_create_group.desc")}
      >
        <StyledRadio
          options={[
            t("overview.admin_create_group.enable"),
            t("overview.admin_create_group.disable")
          ]}
          values={["true", "false"]}
          value={`${onlyAdminCreateGroup}`}
          onChange={(v) => {
            handleChange(v == "true");
          }}
        />
      </SettingBlock>
    </ServerVersionChecker>
  );
};

export default OnlyAdminCreateGroup;
