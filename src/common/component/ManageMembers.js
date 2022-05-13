import { useEffect } from "react";
import styled from "styled-components";

import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import useCopy from "../hook/useCopy";
import { useLazyDeleteContactQuery } from "../../app/services/contact";
import { useRemoveMembersMutation } from "../../app/services/channel";
import Contact from "./Contact";
import StyledMenu from "./styled/Menu";
import InviteLink from "./InviteLink";
import moreIcon from "../../assets/icons/more.svg?url";
const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 94px);
  overflow-y: scroll;
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
    gap: 24px;
    width: 512px;
    margin-bottom: 176px;
    .member {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0;
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
export default function ManageMembers({ cid = null }) {
  const { contacts, channels, loginUser } = useSelector((store) => {
    return {
      contacts: store.contacts,
      channels: store.channels,
      loginUser: store.contacts.byId[store.authData.uid],
    };
  });
  const [copied, copy] = useCopy();
  const [
    removeUser,
    { isSuccess: removeSuccess },
  ] = useLazyDeleteContactQuery();
  const [
    removeMemberFromChannel,
    { isSuccess: removeMemberSuccess },
  ] = useRemoveMembersMutation();
  const remove = cid ? removeMemberFromChannel : removeUser;
  const handleRemoveUser = (uid) => {
    remove(cid ? { id: cid, members: [+uid] } : uid);
  };
  useEffect(() => {
    if (removeSuccess) {
      toast.success("delete successfully");
    }
  }, [removeSuccess]);
  useEffect(() => {
    if (copied) {
      toast.success("Emial Copied!");
    }
  }, [copied]);
  useEffect(() => {
    if (removeMemberSuccess) {
      toast.success("remove member successfully");
    }
  }, [removeMemberSuccess]);
  const handleCopy = (str) => {
    copy(str);
    hideAll();
  };
  const channel = channels.byId[cid] ?? null;
  const uids = channel
    ? channel.is_public
      ? contacts.ids
      : channel.members
    : contacts.ids;

  return (
    <StyledWrapper>
      {loginUser?.is_admin && <InviteLink />}
      <div className="intro">
        <h4 className="title">Manage Members</h4>
        <p className="desc">
          Disabling your account means you can recover it at any time after
          taking this action.
        </p>
      </div>
      <ul className="members">
        {uids.map((uid) => {
          const { name, email, is_admin } = contacts.byId[uid];
          return (
            <li key={uid} className="member">
              <div className="left">
                <Contact compact uid={uid} interactive={false} />
                <div className="info">
                  <span className="name">{name}</span>
                  <span className="email">{email}</span>
                </div>
              </div>
              <div className="right">
                <span className="role">
                  {is_admin ? "Admin" : cid ? "Member" : "User"}
                </span>
                <Tippy
                  duration={0}
                  delay={[0, 0]}
                  interactive
                  placement="right-start"
                  trigger="click"
                  content={
                    <StyledMenu className="menu">
                      {email && (
                        <li
                          className="item"
                          onClick={handleCopy.bind(null, email)}
                        >
                          Copy Email
                        </li>
                      )}
                      {/* <li className="item underline">Mute</li> */}
                      {/* <li className="item underline">Change Nickname</li> */}
                      {/* <li className="item danger">Ban</li> */}
                      {loginUser?.is_admin && (
                        <li
                          className="item danger"
                          onClick={handleRemoveUser.bind(null, uid)}
                        >
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
              </div>
            </li>
          );
        })}
      </ul>
    </StyledWrapper>
  );
}
