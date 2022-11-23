import { FC, useState } from "react";
import ChannelModal from "./ChannelModal";
import InviteModal from "./InviteModal";
import IconChat from "../../assets/icons/placeholder.chat.svg";
import IconAsk from "../../assets/icons/placeholder.question.svg";
import IconInvite from "../../assets/icons/placeholder.invite.svg";
import IconDownload from "../../assets/icons/placeholder.download.svg";
import UsersModal from "./UsersModal";
import { useAppSelector } from "../../app/store";
import { useTranslation } from "react-i18next";


interface Props {
  type?: "chat" | "user";
}
const classes = {
  box: "w-[200px] h-[200px] cursor-pointer bg-[#f9fafb] rounded-3xl flex flex-col justify-center items-center gap-4",
  boxIcon: "w-10 h-10",
  boxTip: "px-5 text-sm text-[#475467] font-bold text-center"
};
const BlankPlaceholder: FC<Props> = ({ type = "chat" }) => {
  const { t } = useTranslation("welcome");
  const server = useAppSelector((store) => store.server);
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
  const chatTip =
    type == "chat" ? t("start_by_channel") : t("start_by_dm");
  const chatHandler = type == "chat" ? toggleChannelModalVisible : toggleUserListVisible;
  return (
    <>
      <div className="flex flex-col gap-8 -mt-[50px]">
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-3xl text-[#344054] font-bold">{t("title", { name: server.name })}</h2>
          <p className="text-sm text-[#98a2b3] max-w-[424px] text-center">
            {t("desc")}
          </p>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-6">
          <div className={classes.box} onClick={toggleInviteModalVisible}>
            <IconInvite className={classes.boxIcon} />
            <div className={classes.boxTip}>{t("invite")}</div>
          </div>
          <button onClick={chatHandler} className={classes.box} >
            <IconChat className={classes.boxIcon} />
            <div className={classes.boxTip}>{chatTip}</div>
          </button>
          <a href={"https://voce.chat#download"} target={"_blank"} rel="noreferrer" className={classes.box} >
            <IconDownload className={classes.boxIcon} />
            <div className={classes.boxTip}>{t("download")}</div>
          </a>
          <a href={"https://doc.voce.chat"} target={"_blank"} rel="noreferrer" className={classes.box} >
            <IconAsk className={classes.boxIcon} />
            <div className={classes.boxTip}>{t("help")}</div>
          </a>
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
