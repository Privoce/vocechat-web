import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import Linkify from "linkify-react";

import { useAppSelector } from "@/app/store";
import IconEdit from "@/assets/icons/edit.svg";
import IconChat from "@/assets/icons/placeholder.chat.svg";
import IconDownload from "@/assets/icons/placeholder.download.svg";
import IconInvite from "@/assets/icons/placeholder.invite.svg";
import IconAsk from "@/assets/icons/placeholder.question.svg";
import ChannelModal from "./ChannelModal";
import InviteModal from "./InviteModal";
import UsersModal from "./UsersModal";
import { shallowEqual } from "react-redux";
import { KEY_ADMIN_ONLY_INVITE } from "../app/config";
import useServerExtSetting from "../hooks/useServerExtSetting";

interface Props {
  type?: "chat" | "user";
}
const classes = {
  box: "w-[220px] md:w-[200px] h-[100px] md:h-[200px] cursor-pointer bg-gray-50 dark:bg-gray-800 rounded-3xl flex-center flex-col gap-4",
  boxIcon: "w-7 h-7 md:w-10 md:h-10",
  boxTip: "px-5 text-xs md:text-sm text-slate-600 dark:text-gray-100 font-bold text-center",
};
const BlankPlaceholder: FC<Props> = ({ type = "chat" }) => {
  const { getExtSetting } = useServerExtSetting();
  const onlyAdminCanInvite = getExtSetting(KEY_ADMIN_ONLY_INVITE);
  const { t } = useTranslation("welcome");
  const server = useAppSelector((store) => store.server, shallowEqual);
  const isAdmin = useAppSelector((store) => store.authData.user?.is_admin, shallowEqual);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [createChannelVisible, setCreateChannelVisible] = useState(false);
  const [userListVisible, setUserListVisible] = useState(false);
  const toggleChannelModalVisible = () => {
    setCreateChannelVisible((prev) => !prev);
  };
  const toggleUserListVisible = () => {
    setUserListVisible((prev) => !prev);
  };
  const toggleInviteModalVisible = () => {
    setInviteModalVisible((prev) => !prev);
  };
  const chatTip = type == "chat" ? t("start_by_channel") : t("start_by_dm");
  const chatHandler = type == "chat" ? toggleChannelModalVisible : toggleUserListVisible;
  return (
    <>
      <div className="flex flex-col gap-8 -mt-[50px] dark:bg-gray-700">
        <div className="flex flex-col gap-2 items-center group px-4">
          <h2 className="text-center text-3xl text-slate-700 dark:text-white font-bold">
            {t("title", { name: server.name })}
          </h2>
          <p className="text-sm text-gray-400 max-w-md text-center relative whitespace-normal">
            <Linkify
              options={{
                render: {
                  url: ({ content, attributes: { href: link } }) => {
                    return (
                      <>
                        <a
                          className="text-primary-400"
                          target="_blank"
                          href={link}
                          rel="noreferrer"
                        >
                          {content}
                        </a>
                      </>
                    );
                  },
                },
              }}
            >
              {server.description ? server.description : t("desc")}
            </Linkify>
            {isAdmin && (
              <NavLink
                to={"/setting/overview"}
                className="absolute top-0 -right-7 invisible group-hover:visible"
              >
                <IconEdit />
              </NavLink>
            )}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-2 md:gap-6 m-auto">
          {(isAdmin || !onlyAdminCanInvite) && (
            <button className={classes.box} onClick={toggleInviteModalVisible}>
              <IconInvite className={classes.boxIcon} />
              <div className={classes.boxTip}>{t("invite")}</div>
            </button>
          )}
          <button onClick={chatHandler} className={classes.box}>
            <IconChat className={classes.boxIcon} />
            <div className={classes.boxTip}>{chatTip}</div>
          </button>
          {!server.upgraded && (
            <>
              <a
                href={"https://voce.chat#download"}
                target={"_blank"}
                rel="noreferrer"
                className={classes.box}
              >
                <IconDownload className={classes.boxIcon} />
                <div className={classes.boxTip}>{t("download")}</div>
              </a>
              <a
                href={"https://doc.voce.chat"}
                target={"_blank"}
                rel="noreferrer"
                className={classes.box}
              >
                <IconAsk className={classes.boxIcon} />
                <div className={classes.boxTip}>{t("help")}</div>
              </a>
            </>
          )}
        </div>
      </div>
      {createChannelVisible && (
        <ChannelModal personal={true} closeModal={toggleChannelModalVisible} />
      )}
      {userListVisible && <UsersModal closeModal={toggleUserListVisible} />}
      {inviteModalVisible && <InviteModal closeModal={toggleInviteModalVisible} />}
    </>
  );
};

export default BlankPlaceholder;
