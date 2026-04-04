import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { shallowEqual } from "react-redux";

import IconAdd from "@/assets/icons/add.person.svg";
import IconBlock from "@/assets/icons/block.svg";
import { useUpdateContactStatusMutation } from "../../../app/services/user";
import { useAppSelector } from "../../../app/store";
import { ContactAction } from "../../../types/user";

type Props = {
  uid: number;
};

const AddContactTip = (props: Props) => {
  const { t } = useTranslation("chat");
  const { t: tMember } = useTranslation("member");
  const [updateContactStatus, { error: addContactError }] = useUpdateContactStatusMutation();
  const enableContact = useAppSelector(
    (store) => store.server.contact_verification_enable,
    shallowEqual
  );
  const isAdmin = useAppSelector((store) => store.authData.user?.is_admin, shallowEqual);
  const addFriendEnable = useAppSelector(
    (store) => store.server.add_friend_enable ?? true,
    shallowEqual
  );
  const targetUser = useAppSelector((store) => store.users.byId[props.uid], shallowEqual);

  useEffect(() => {
    if (!addContactError) return;
    const err = addContactError as any;
    const httpStatus: number = err?.originalStatus ?? err?.status;
    const errData: string = typeof err?.data === "string" ? err.data : "";
    toast.error(
      httpStatus === 403 && errData.includes("disabled by the administrator")
        ? tMember("add_friend_disabled")
        : tMember("tip.update_failed", { ns: "common", defaultValue: "Operation failed" })
    );
  }, [addContactError]);

  const handleContactStatus = (action: ContactAction) => {
    updateContactStatus({ target_uid: props.uid, action });
  };
  const itemClass = `cursor-pointer flex flex-col items-center gap-1 rounded-lg w-32 text-primary-400 bg-gray-50 dark:bg-gray-800 text-sm pt-3.5 pb-3`;
  if (!targetUser || !enableContact) return null;
  if (targetUser.status == "added") return null;
  const blocked = targetUser.status == "blocked";
  return (
    <div className="py-4 px-10 flex flex-col items-center gap-3 bg-slate-100 dark:bg-slate-600">
      <h3 className="text-gray-700 dark:text-gray-300 text-sm font-semibold">
        {blocked ? t("contact_block_tip") : t("contact_tip")}
      </h3>
      <ul className="flex gap-4">
        {!blocked && (isAdmin || addFriendEnable) && (
          <li className={itemClass} onClick={handleContactStatus.bind(null, "add")}>
            <IconAdd className="fill-primary-400" />
            <span>{t("add_contact")}</span>
          </li>
        )}
        <li
          className={itemClass}
          onClick={
            blocked
              ? handleContactStatus.bind(null, "unblock")
              : handleContactStatus.bind(null, "block")
          }
        >
          <IconBlock className="stroke-primary-400" />
          <span>{blocked ? t("unblock") : t("block")}</span>
        </li>
      </ul>
    </div>
  );
};

export default AddContactTip;
