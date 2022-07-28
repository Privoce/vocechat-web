import { useEffect, FC } from "react";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";
import toast from "react-hot-toast";
import { useUpdateUserMutation } from "../../app/services/user";
import User from "./User";
import StyledMenu from "./styled/Menu";
import InviteLink from "./InviteLink";
import moreIcon from "../../assets/icons/more.svg?url";
import IconOwner from "../../assets/icons/owner.svg";
import IconArrowDown from "../../assets/icons/arrow.down.mini.svg";
import IconCheck from "../../assets/icons/check.sign.svg";
import useUserOperation from "../hook/useUserOperation";
import { useAppSelector } from "../../app/store";

const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  .intro {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    .title {
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      color: #374151;
    }
    .desc {
      font-weight: normal;
      font-size: 12px;
      line-height: 18px;
      color: #616161;
    }
  }
  .members {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 512px;
    margin-bottom: 176px;
    .member {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      border-radius: var(--br);
      &:hover {
        background: #f9fafb;
      }
      .left {
        display: flex;
        gap: 8px;
        .info {
          display: flex;
          flex-direction: column;
          .name {
            font-weight: bold;
            font-size: 14px;
            line-height: 20px;
            color: #52525b;
            display: flex;
            align-items: center;
            gap: 4px;
          }
          .email {
            font-weight: normal;
            font-size: 12px;
            line-height: 18px;
            color: #52525b;
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        gap: 28px;
        .role {
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          text-align: right;
          color: #616161;
          display: flex;
          align-items: center;
          gap: 4px;
          > .icon {
            cursor: pointer;
          }
          /* override */
          .menu {
            min-width: 120px;
            .item .icon {
              width: 16px;
              height: 12px;
            }
          }
        }
        .opts {
          position: relative;
          width: 24px;
          height: 24px;
          .dots {
            cursor: pointer;
          }
          .menu {
            position: absolute;
          }
        }
      }
    }
  }
`;

interface Props {
  cid?: number;
}
const ManageMembers: FC<Props> = ({ cid }) => {
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
        <h4 className="title">Manage Members</h4>
        <p className="desc">
          Disabling your account means you can recover it at any time after taking this action.
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
                  {is_admin ? "Admin" : "User"}
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
                            Admin
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
                            User
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
                            Copy Email
                          </li>
                        )}
                        {canRemoveFromChannel && (
                          <li className="item danger" onClick={removeFromChannel.bind(null, uid)}>
                            Remove From Channel
                          </li>
                        )}
                        {canRemove && (
                          <li className="item danger" onClick={removeUser.bind(null, uid)}>
                            Remove
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
