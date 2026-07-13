import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { shallowEqual } from "react-redux";

import { useGetUserByAdminQuery, useUpdateUserMutation } from "@/app/services/user";
import { useAppSelector } from "@/app/store";
import Toggle from "@/components/styled/Toggle";

type Props = {
  uid: number;
};

const PublicToggle = ({ uid }: Props) => {
  const { data, isSuccess, refetch } = useGetUserByAdminQuery(uid);
  const [updateUser, { isSuccess: updateSuccess, isLoading: isUpdating }] = useUpdateUserMutation();
  const guestModeEnabled = useAppSelector(
    (store) => store.server.loginConfig?.guest ?? false,
    shallowEqual
  );
  const { t } = useTranslation("setting", { keyPrefix: "bot" });
  const { t: ct } = useTranslation();

  useEffect(() => {
    if (updateSuccess) {
      toast.success(ct("tip.update"));
      refetch();
    }
  }, [updateSuccess]);

  const handleToggle = () => {
    if (isUpdating || !isSuccess || !data) return;
    updateUser({ id: uid, is_public: !data.is_public });
  };

  const isPublic = isSuccess && !!data?.is_public;
  return (
    <div className="flex flex-col gap-1">
      <Toggle onClick={handleToggle} checked={isPublic} />
      {isPublic && !guestModeEnabled && (
        <span className="text-xs text-orange-400 whitespace-normal max-w-[180px]">
          {t("public_guest_off_tip")}
        </span>
      )}
    </div>
  );
};

export default PublicToggle;
