import { FC } from "react";
import InviteLink from "../InviteLink";
import { useAppSelector } from "../../../app/store";
import { useTranslation } from "react-i18next";
import MemberList from "./MemberList";

interface Props {
  cid?: number;
}
const ManageMembers: FC<Props> = ({ cid }) => {
  const { t } = useTranslation("member");
  const { loginUser } = useAppSelector((store) => {
    return {
      loginUser: store.authData.user
    };
  });

  return (
    <section className="flex flex-col w-full">
      {loginUser?.is_admin && <InviteLink />}
      <div className="flex flex-col mb-10">
        <h4 className="font-bold text-gray-600 dark:text-white">{t("manage_members")}</h4>
        <p className="text-gray-500 dark:text-gray-100 text-xs">
          {t("manage_tip")}
        </p>
      </div>
      <MemberList cid={cid} />
    </section>
  );
};
export default ManageMembers;
