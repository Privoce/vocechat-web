import { useEffect, FC } from "react";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";
import toast from "react-hot-toast";
import { useUpdateUserMutation } from "../../../app/services/user";
import User from "../User";
import StyledWrapper from "./styled";
import StyledMenu from "../styled/Menu";
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
  const { t } = useTranslation(["member", "common"]);
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
      toast.success("Update Successfully");
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
    <StyledWrapper>
      {loginUser?.is_admin && <InviteLink />}
      <div className="intro">
        <h4 className="title">{t("manage_members")}</h4>
        <p className="desc">
          {t("manage_tip")}
        </p>
      </div>

      <ul className="members">
        {uids.map((uid) => {
          const currUser = users.byId[uid];
          if (!currUser) return null;
          const { name, email, is_admin } = currUser;
          const owner = channel && channel.owner == uid;
          const switchRoleVisible = loginUser?.is_admin && loginUser.uid !== uid;
          const dotsVisible = email || loginUser?.is_admin;
          const canRemove = loginUser?.is_admin && loginUser?.uid != uid;
          const canRemoveFromChannel =
            channel && channel.owner == loginUser?.uid && loginUser?.uid != uid;
          return (
            <li key={uid} className="member">
              <div className="left">
                <User compact uid={uid} interactive={false} />
                <div className="info">
                  <span className="name">
                    {name} {owner && <IconOwner />}
                  </span>
                  <span className="email">{email}</span>
                </div>
              </div>
              <div className="right">
                <span className="role">
                  {is_admin ? t("admin") : t("user")}
                  {switchRoleVisible && (
                    <Tippy
                      interactive
                      placement="bottom-end"
                      trigger="click"
                      content={
                        <StyledMenu className="menu">
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
                        </StyledMenu>
                      }
                    >
                      <IconArrowDown className="icon" />
                    </Tippy>
                  )}
                </span>
                {dotsVisible && (
                  <Tippy
                    interactive
                    placement="right-start"
                    trigger="click"
                    content={
                      <StyledMenu className="menu">
                        {email && (
                          <li className="item" onClick={copyEmail.bind(null, email)}>
                            {t("action.copy_email", { ns: "common" })}
                          </li>
                        )}
                        {canRemoveFromChannel && (
                          <li className="item danger" onClick={removeFromChannel.bind(null, uid)}>
                            {t("remove_from_channel")}
                          </li>
                        )}
                        {canRemove && (
                          <li className="item danger" onClick={removeUser.bind(null, uid)}>
                            {t("action.remove", { ns: "common" })}
                          </li>
                        )}
                      </StyledMenu>
                    }
                  >
                    <div className="opts">
                      <img className="dots" src={moreIcon} alt="dots icon" />
                    </div>
                  </Tippy>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </StyledWrapper>
  );
};
export default ManageMembers;
