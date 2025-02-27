import { useState } from "react";
import { useTranslation } from "react-i18next";
import { hideAll } from "tippy.js";

import { useAppSelector } from "@/app/store";
import IconInvite from "@/assets/icons/add.person.svg";
import IconMention from "@/assets/icons/mention.svg";
import IconSearch from "@/assets/icons/search.svg";
import ChannelIcon from "./ChannelIcon";
import ChannelModal from "./ChannelModal";
import InviteModal from "./InviteModal";
import SearchUser from "./SearchUser";
import UsersModal from "./UsersModal";
import { shallowEqual } from "react-redux";
import useServerExtSetting from "../hooks/useServerExtSetting";
import { KEY_ADMIN_ONLY_INVITE } from "../app/config";

export default function AddEntriesMenu() {
  const { t } = useTranslation();
  const { getExtSetting } = useServerExtSetting();
  const onlyAdminCanInvite = getExtSetting(KEY_ADMIN_ONLY_INVITE);
  const isAdmin = useAppSelector((store) => store.authData.user?.is_admin, shallowEqual);
  const onlyAdminCreateGroup = useAppSelector(
    (store) => store.server.only_admin_can_create_group,
    shallowEqual
  );
  const [isPrivate, setIsPrivate] = useState(false);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
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
  const toggleSearchModalVisible = () => {
    setSearchModalVisible((prevVisible) => {
      if (!prevVisible) {
        hideAll();
      }
      return !prevVisible;
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

  const itemClass =
    "rounded flex items-center gap-2 text-sm font-semibold cursor-pointer px-2 py-2.5 md:hover:bg-gray-800/20 md:dark:hover:bg-gray-200/20";
  const iconClass = "w-5 h-5 dark:fill-gray-300";
  const canPrivateGroup = onlyAdminCreateGroup ? isAdmin : true;
  const showInvite = isAdmin || !onlyAdminCanInvite;
  return (
    <>
      <ul className="flex flex-col rounded-xl drop-shadow p-1 select-none text-gray-500 dark:text-gray-300 bg-white dark:bg-black">
        {/* temp remove public channel */}
        {isAdmin && (
          <li className={itemClass} onClick={handleOpenChannelModal.bind(null, false)}>
            <ChannelIcon className={iconClass} />
            {t("action.new_channel")}
          </li>
        )}
        {canPrivateGroup && (
          <li className={itemClass} onClick={handleOpenChannelModal.bind(null, true)}>
            <ChannelIcon personal={true} className={iconClass} />
            {t("action.new_private_channel")}
          </li>
        )}
        <li className={itemClass} onClick={toggleUsersModalVisible}>
          <IconMention className={iconClass} />
          {t("action.new_msg")}
        </li>
        {showInvite && (
          <li className={itemClass} onClick={toggleInviteModalVisible}>
            <IconInvite className={iconClass} />
            {t("action.invite_people")}
          </li>
        )}
        <li className={itemClass} onClick={toggleSearchModalVisible}>
          <IconSearch className={iconClass} />
          {t("action.search_people")}
        </li>
      </ul>
      {channelModalVisible && <ChannelModal personal={isPrivate} closeModal={handleCloseModal} />}
      {usersModalVisible && <UsersModal closeModal={toggleUsersModalVisible} />}
      {inviteModalVisible && <InviteModal closeModal={toggleInviteModalVisible} />}
      {searchModalVisible && <SearchUser closeModal={toggleSearchModalVisible} />}
    </>
  );
}
