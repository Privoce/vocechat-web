import { FC, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import ChannelModal from "./ChannelModal";
import InviteModal from "./InviteModal";
import IconChat from "../../assets/icons/placeholder.chat.svg";
import IconAsk from "../../assets/icons/placeholder.question.svg";
import IconInvite from "../../assets/icons/placeholder.invite.svg";
import IconDownload from "../../assets/icons/placeholder.download.svg";
import ContactsModal from "./ContactsModal";
import { useAppSelector } from "../../app/store";

const Styled = styled.div`
  margin-top: -50px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  .head {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    .title {
      font-weight: 700;
      font-size: 30px;
      line-height: 38px;
      color: #344054;
    }
    .desc {
      text-align: center;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #98a2b3;
      max-width: 424px;
    }
  }
  .boxes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 24px;
    .box {
      cursor: pointer;
      width: 200px;
      height: 200px;
      background: #f9fafb;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 16px;
      .icon {
        width: 40px;
        height: 40px;
      }
      .txt {
        padding: 0 21px;
        text-align: center;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        color: #475467;
      }
    }
  }
`;

interface Props {
  type?: "chat";
}

const BlankPlaceholder: FC<Props> = ({ type = "chat" }) => {
  const server = useAppSelector((store) => store.server);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [createChannelVisible, setCreateChannelVisible] = useState(false);
  const [contactListVisible, setContactListVisible] = useState(false);
  const toggleChannelModalVisible = () => {
    setCreateChannelVisible((prev) => !prev);
  };
  const toggleContactListVisible = () => {
    setContactListVisible((prev) => !prev);
  };
  const toggleInviteModalVisible = () => {
    setInviteModalVisible((prev) => !prev);
  };
  const chatTip =
    type == "chat" ? "Create a Channel to Start a Conversation" : "Send a Direct Message";
  const chatHandler = type == "chat" ? toggleChannelModalVisible : toggleContactListVisible;

  return (
    <>
      <Styled>
        <div className="head">
          <h2 className="title">Welcome to {server.name} server</h2>
          <p className="desc">
            Here are some steps to help you get started. For more, check out our Getting Started
            guide
          </p>
        </div>
        <div className="boxes">
          <div className="box" onClick={toggleInviteModalVisible}>
            <IconInvite className="icon" />
            <div className="txt">Invite your friends or teammates</div>
          </div>
          <div className="box" onClick={chatHandler}>
            <IconChat className="icon" />
            <div className="txt">{chatTip}</div>
          </div>
          <a className="box" href="#">
            <IconDownload className="icon" />
            <div className="txt">Download PC and Mobile apps</div>
          </a>
          <NavLink to={"#"} className="box">
            <IconAsk className="icon" />
            <div className="txt">Got questions? Visit our help center </div>
          </NavLink>
        </div>
      </Styled>
      {createChannelVisible && (
        <ChannelModal personal={true} closeModal={toggleChannelModalVisible} />
      )}
      {contactListVisible && <ContactsModal closeModal={toggleContactListVisible} />}
      {inviteModalVisible && <InviteModal closeModal={toggleInviteModalVisible} />}
    </>
  );
};

export default BlankPlaceholder;
