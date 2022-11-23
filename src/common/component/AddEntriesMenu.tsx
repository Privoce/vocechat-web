import { useState } from "react";
import styled from "styled-components";
import { hideAll } from "tippy.js";
import { useAppSelector } from "../../app/store";
import IconInvite from "../../assets/icons/add.person.svg";
import IconMention from "../../assets/icons/mention.svg";
import ChannelIcon from "./ChannelIcon";
import ChannelModal from "./ChannelModal";
import UsersModal from "./UsersModal";
import InviteModal from "./InviteModal";
import { useTranslation } from "react-i18next";

const Styled = styled.ul`
  z-index: 999;
  user-select: none;
  box-shadow: 0 24px 48px -12px rgba(16, 24, 40, 0.18);
  border-radius: 12px;
  color: #616161;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 4px;
  .item {
    border-radius: 3px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    padding: 10px 8px;
    &:hover {
      background: rgba(116, 127, 141, 0.2);
    }
    .icon {
      width: 20px;
      height: 20px;
      path {
        fill: #475467;
      }
    }
  }
`;
export default function AddEntriesMenu() {
  const { t } = useTranslation();
  const currentUser = useAppSelector((store) => store.authData.user);
  const [isPrivate, setIsPrivate] = useState(false);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);

  const [channelModalVisible, setChannelModalVisible] = useState(false);
  const [usersModalVisible, setUsersModalVisible] = useState(false);
  const toggleInviteModalVisible = () => {
    setInviteModalVisible((prev) => {
      if (!prev) {
        hideAll();
      }
      return !prev;
    });
  };
  const toggleUsersModalVisible = () => {
    setUsersModalVisible((prevVisible) => {
      if (!prevVisible) {
        hideAll();
      }
      return !prevVisible;
    });
  };
  const handleOpenChannelModal = (isPrivate: boolean) => {
    setIsPrivate(isPrivate);
    setChannelModalVisible(true);
    hideAll();
  };
  const handleCloseModal = () => {
    setChannelModalVisible(false);
  };
  return (
    <>
      <Styled>
        {/* temp remove public channel */}
        {currentUser?.is_admin && (
          <li className="item" onClick={handleOpenChannelModal.bind(null, false)}>
            <ChannelIcon className="icon" />
            {t("action.new_channel")}
          </li>
        )}
        <li className="item" onClick={handleOpenChannelModal.bind(null, true)}>
          <ChannelIcon personal={true} className="icon" />
          {t("action.new_private_channel")}
        </li>
        <li className="item" onClick={toggleUsersModalVisible}>
          <IconMention className="icon" />
          {t("action.new_msg")}
        </li>
        <li className="item" onClick={toggleInviteModalVisible}>
          <IconInvite className="icon" />
          {t("action.invite_people")}
        </li>
      </Styled>
      {channelModalVisible && <ChannelModal personal={isPrivate} closeModal={handleCloseModal} />}
      {usersModalVisible && <UsersModal closeModal={toggleUsersModalVisible} />}
      {inviteModalVisible && <InviteModal closeModal={toggleInviteModalVisible} />}
    </>
  );
}
