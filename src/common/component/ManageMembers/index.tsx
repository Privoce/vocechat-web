import { useEffect, FC } from "react";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";
import toast from "react-hot-toast";
import { useUpdateUserMutation } from "../../../app/services/user";
import User from "../User";
import InviteLink from "../InviteLink";
import moreIcon from "../../../assets/icons/more.svg?url";
import IconOwner from "../../../assets/icons/owner.svg";
import IconArrowDown from "../../../assets/icons/arrow.down.mini.svg";
import IconCheck from "../../../assets/icons/check.sign.svg";
import useUserOperation from "../../hook/useUserOperation";
import { useAppSelector } from "../../../app/store";
import { useTranslation } from "react-i18next";

interface Props {
  cid?: number;
}
const ManageMembers: FC<Props> = ({ cid }) => {
  const { t } = useTranslation("member");
  const { t: ct } = useTranslation();
  const { users, channels, loginUser } = useAppSelector((store) => {
    return {
      users: store.users,
      channels: store.channels,
      loginUser: store.authData.user
    };
  });
  const { copyEmail, removeFromChannel, removeUser } = useUserOperation({ cid });
  const [updateUser, { isSuccess: updateSuccess }] = useUpdateUserMutation();

  useEffect(() => {
    if (updateSuccess) {
      toast.success(ct("tip.update"));
    }
  }, [updateSuccess]);

  const handleToggleRole = ({
    ignore = false,
    uid,
    isAdmin = true
  }: {
    ignore: boolean;
    uid: number;
    isAdmin: boolean;
  }) => {
    hideAll();
    if (ignore) return;
    updateUser({ id: uid, is_admin: isAdmin });
  };

  const channel = cid ? channels.byId[cid] : null;
  const uids = channel ? (channel.is_public ? users.ids : channel.members) : users.ids;
  return (
    <section className="flex flex-col w-full">
      {loginUser?.is_admin && <InviteLink />}
      <div className="flex flex-col mb-10">
        <h4 className="font-bold text-gray-600 dark:text-white">{t("manage_members")}</h4>
        <p className="text-gray-500 dark:text-gray-100 text-xs">
          {t("manage_tip")}
        </p>
      </div>

      <ul className="flex flex-col gap-1 w-full md:w-[512px] mb-44">
        {uids.map((uid) => {
          const currUser = users.byId[uid];
          if (!currUser) return null;
          const { name, email, is_admin } = currUser;
          const owner = channel && channel.owner == uid;
          const switchRoleVisible = loginUser?.is_admin && loginUser.uid !== uid && uid !== 1;
          const dotsVisible = email || loginUser?.is_admin;
          const canRemove = loginUser?.is_admin && loginUser?.uid != uid && uid !== 1;
          const canRemoveFromChannel =
            channel && channel.owner == loginUser?.uid && loginUser?.uid != uid;
          return (
            <li key={uid} className="w-full flex items-center justify-between px-3 py-2 rounded-md md:hover:bg-slate-50 md:dark:hover:bg-gray-800">
              <div className="flex gap-4">
                <User compact uid={uid} interactive={false} />
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-gray-600 dark:text-white flex items-center gap-1">
                    {name} {owner && <IconOwner />}
                  </span>
                  <span className="hidden md:block text-xs text-gray-500 dark:text-slate-50">{email}</span>
                </div>
              </div>
              <div className="flex items-center gap-7">
                <span className="text-xs text-right text-gray-500 dark:text-slate-100 flex items-center gap-1">
                  {is_admin ? t("admin") : t("user")}
                  {switchRoleVisible && (
                    <Tippy
                      interactive
                      placement="bottom-end"
                      trigger="click"
                      content={
                        <ul className="context-menu">
                          <li
                            className="item sb"
                            onClick={handleToggleRole.bind(null, {
                              ignore: is_admin,
                              uid,
                              isAdmin: true
                            })}
                          >
                            {t("admin")}
                            {is_admin && <IconCheck className="icon" />}
                          </li>
                          <li
                            className="item sb"
                            onClick={handleToggleRole.bind(null, {
                              ignore: !is_admin,
                              uid,
                              isAdmin: false
                            })}
                          >
                            {t("user")}
                            {!is_admin && <IconCheck className="icon" />}
                          </li>
                        </ul>
                      }
                    >
                      <IconArrowDown className="cursor-pointer dark:fill-slate-50" />
                    </Tippy>
                  )}
                </span>
                {dotsVisible && (
                  <Tippy
                    interactive
                    placement="right-start"
                    trigger="click"
                    content={
                      <ul className="min-w-30 context-menu">
                        {email && (
                          <li className="item" onClick={copyEmail.bind(null, email)}>
                            {ct("action.copy_email")}
                          </li>
                        )}
                        {canRemoveFromChannel && (
                          <li className="item danger" onClick={removeFromChannel.bind(null, uid)}>
                            {t("remove_from_channel")}
                          </li>
                        )}
                        {canRemove && (
                          <li className="item danger" onClick={removeUser.bind(null, uid)}>
                            {ct("action.remove")}
                          </li>
                        )}
                      </ul>
                    }
                  >
                    <div className="relative w-6 h-6">
                      <img className="cursor-pointer" src={moreIcon} alt="dots icon" />
                    </div>
                  </Tippy>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default ManageMembers;
