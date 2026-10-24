import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useGetSystemCommonQuery, useUpdateSystemCommonMutation } from "@/app/services/server";
import { useAppSelector } from "@/app/store";
import SettingBlock from "@/components/SettingBlock";
import Toggle from "@/components/styled/Toggle";

export default function HideUserEmail() {
  const { t } = useTranslation("setting", { keyPrefix: "overview.hide_user_email" });
  const { t: ct } = useTranslation();
  const { data: common } = useGetSystemCommonQuery();
  const supported = typeof common?.hide_user_email === "boolean";
  const hideUserEmail = useAppSelector((store) => store.server.hide_user_email ?? false);
  const [updateSetting, { isLoading }] = useUpdateSystemCommonMutation();

  const handleToggle = async () => {
    if (!supported || isLoading) return;
    try {
      await updateSetting({ hide_user_email: !hideUserEmail }).unwrap();
      toast.success(ct("tip.update"));
    } catch {
      toast.error(ct("tip.update_failed", { defaultValue: "Update failed" }));
    }
  };

  if (!supported) return null;

  return (
    <SettingBlock
      title={t("title", { defaultValue: "Hide user emails" })}
      desc={t("desc", {
        defaultValue: "Hide all email addresses from members, including their own. Administrators can still view them. Disabled by default."
      })}
      toggler={<Toggle onClick={handleToggle} checked={hideUserEmail} />}
    />
  );
}
