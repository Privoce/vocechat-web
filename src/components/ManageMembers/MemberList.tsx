import { FC, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { ViewportList } from "react-viewport-list";
import Search from "@/routes/users/Search";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";

import { useUpdateUserMutation } from "@/app/services/user";
import { useAppSelector } from "@/app/store";
import useFilteredUsers from "@/hooks/useFilteredUsers";
import useUserOperation from "@/hooks/useUserOperation";
import IconArrowDown from "@/assets/icons/arrow.down.mini.svg";
import IconCheck from "@/assets/icons/check.sign.svg";
import IconMore from "@/assets/icons/more.svg";
import IconOwner from "@/assets/icons/owner.svg";
import User from "../User";

interface Props {
  cid?: number;
}
const MemberList: FC<Props> = ({ cid }) => {
  const ref = useRef<HTMLUListElement | null>(null);
  const { t } = useTranslation("member");
  const { t: ct } = useTranslation();
  const { channels, loginUser } = useAppSelector((store) => {
    return {
      channels: store.channels,
      loginUser: store.authData.user
    };
  });
  const { users, input, updateInput } = useFilteredUsers();
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
  const ids = users.map((u) => u.uid);
  const uids = channel ? (channel.is_public ? ids : channel.members) : ids;
  return (
    <>
      <Search input={input} updateInput={updateInput} type="members" />
      <ul
        className="flex flex-col gap-1 w-full md:w-[512px] mb-44 max-h-[800px] overflow-y-scroll"
        ref={ref}
      >
        <ViewportList initialPrerender={15} viewportRef={ref} items={uids}>
          {(uid) => {
            const currUser = users.find((u) => u.uid == uid);
            if (!currUser) return null;
            const { name, email, is_admin } = currUser;
            const owner = channel && channel.owner == uid;
            const switchRoleVisible = loginUser?.is_admin && loginUser.uid !== uid && uid !== 1;
            const dotsVisible = email || loginUser?.is_admin;
            const canRemove = loginUser?.is_admin && loginUser?.uid != uid && uid !== 1;
            const canRemoveFromChannel =
              channel && channel.owner == loginUser?.uid && loginUser?.uid != uid;
            return (
              <li
                key={uid}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md md:hover:bg-slate-50 md:dark:hover:bg-gray-800"
              >
                <div className="flex gap-4">
                  <User compact uid={uid} interactive={false} />
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-gray-600 dark:text-white flex items-center gap-1">
                      {name} {owner && <IconOwner />}
                    </span>
                    <span className="hidden md:block text-xs text-gray-500 dark:text-slate-50">
                      {email}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-7">
                  {switchRoleVisible ? (
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
                            {is_admin && <IconCheck className="icon dark:fill-white" />}
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
                            {!is_admin && <IconCheck className="icon dark:fill-white" />}
                          </li>
                        </ul>
                      }
                    >
                      <span className="text-xs text-right text-gray-500 dark:text-slate-100 flex items-center gap-1 cursor-pointer">
                        {is_admin ? t("admin") : t("user")}
                        <IconArrowDown className="dark:fill-slate-50" />
                      </span>
                    </Tippy>
                  ) : (
                    <span className="text-xs text-right text-gray-500 dark:text-slate-100 flex items-center gap-1">
                      {is_admin ? t("admin") : t("user")}
                    </span>
                  )}

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
                        <IconMore role="button" className="dark:fill-gray-400" />
                      </div>
                    </Tippy>
                  )}
                </div>
              </li>
            );
          }}
        </ViewportList>
      </ul>
    </>
  );
};
export default MemberList;
