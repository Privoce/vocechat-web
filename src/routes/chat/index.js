// import React from 'react';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { AiOutlineCaretDown } from "react-icons/ai";

import StyledWrapper from "./styled";
import AddIcon from "../../assets/icons/add.svg";
import BlankPlaceholder from "../../common/component/BlankPlaceholder";
import Server from "../../common/component/Server";
import Tooltip from "../../common/component/Tooltip";
// import Contact from "../../common/component/Contact";
import CurrentUser from "../../common/component/CurrentUser";
import ChannelChat from "./ChannelChat";
import DMChat from "./DMChat";
import ChannelList from "./ChannelList";
import ContactsModal from "../../common/component/ContactsModal";
import ChannelModal from "../../common/component/ChannelModal";
import DMList from "./DMList";

export default function ChatPage() {
  const [channelDropFiles, setChannelDropFiles] = useState([]);
  const [userDropFiles, setUserDropFiles] = useState([]);
  const { sessionUids } = useSelector((store) => {
    return {
      sessionUids: store.userMessage.ids,
    };
  });
  const [channelModalVisible, setChannelModalVisible] = useState(false);
  const [contactsModalVisible, setContactsModalVisible] = useState(false);
  const { channel_id, user_id } = useParams();
  const toggleContactsModalVisible = () => {
    setContactsModalVisible((prev) => !prev);
  };
  const toggleChannelModalVisible = () => {
    setChannelModalVisible((prev) => !prev);
  };
  const handleToggleExpand = (evt) => {
    const { currentTarget } = evt;
    const listEle = currentTarget.parentElement.parentElement;
    listEle.classList.toggle("collapse");
  };
  const tmpUid =
    sessionUids.findIndex((i) => i == user_id) > -1 ? null : user_id;
  console.log("temp uid", tmpUid);
  const placeholderVisible = !channel_id && !user_id;
  return (
    <>
      {channelModalVisible && (
        <ChannelModal closeModal={toggleChannelModalVisible} personal={true} />
      )}
      {contactsModalVisible && (
        <ContactsModal closeModal={toggleContactsModalVisible} />
      )}
      <StyledWrapper>
        <div className="left">
          <Server />
          <div className="list channels">
            <h3 className="title">
              <span className="txt" onClick={handleToggleExpand}>
                <AiOutlineCaretDown
                  className="icon"
                  size={18}
                  color="#78787C"
                />
                CHANNELS
              </span>
              <Tooltip tip="New Channel" placement="bottom">
                <AddIcon
                  className="add_icon"
                  onClick={toggleChannelModalVisible}
                />
              </Tooltip>
            </h3>
            <nav className="nav">
              <ChannelList setDropFiles={setChannelDropFiles} />
            </nav>
          </div>
          <div className="list dms">
            <h3 className="title">
              <span className="txt" onClick={handleToggleExpand}>
                <AiOutlineCaretDown
                  className="icon"
                  size={18}
                  color="#78787C"
                />
                DIRECT MESSAGE
              </span>
              <Tooltip tip="New DM" placement="bottom">
                <AddIcon
                  className="add_icon"
                  onClick={toggleContactsModalVisible}
                />
              </Tooltip>
            </h3>
            <nav className="nav">
              <DMList
                uids={tmpUid ? [...sessionUids, tmpUid] : sessionUids}
                setDropFiles={setUserDropFiles}
              />
            </nav>
          </div>
          <CurrentUser />
        </div>
        <div className={`right ${placeholderVisible ? "placeholder" : ""}`}>
          {placeholderVisible && <BlankPlaceholder />}
          {channel_id && (
            <ChannelChat cid={channel_id} dropFiles={channelDropFiles} />
          )}
          {user_id && <DMChat uid={user_id} dropFiles={userDropFiles} />}
        </div>
      </StyledWrapper>
    </>
  );
}
