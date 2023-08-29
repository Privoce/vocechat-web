import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/app/store";
import InviteLink from "../InviteLink";
import MemberList from "./MemberList";
import { shallowEqual } from "react-redux";

interface Props {
  cid?: number;
}
const ManageMembers: FC<Props> = ({ cid }) => {
  const { t } = useTranslation("member");
  const isAdmin = useAppSelector((store) => store.authData.user?.is_admin, shallowEqual);

  return (
    <section className="flex flex-col w-full">
      {isAdmin && <InviteLink />}
      <div className="flex flex-col mb-10">
        <h4 className="font-bold text-gray-700 dark:text-white">{t("manage_members")}</h4>
        <p className="text-gray-400 dark:text-gray-100 text-xs">{t("manage_tip")}</p>
      </div>
      <MemberList cid={cid} />
    </section>
  );
};
export default ManageMembers;
