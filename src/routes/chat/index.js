// import React from 'react';
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { MdAdd } from "react-icons/md";
import { AiOutlineCaretDown } from "react-icons/ai";

import StyledWrapper from "./styled";
import Search from "../../common/component/Search";
import Contact from "../../common/component/Contact";
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
  const { contacts, channels, UserMsgData, ChannelMsgData } = useSelector(
    (store) => {
      return {
        contacts: store.contacts,
        channels: store.channels,
        UserMsgData: store.userMessage,
        ChannelMsgData: store.channelMessage,
      };
    }
  );
  const [channelModalVisible, setChannelModalVisible] = useState(false);
  const [contactsModalVisible, setContactsModalVisible] = useState(false);
  const { channel_id, user_id } = useParams();
  const toggleContactsModalVisible = () => {
    setContactsModalVisible((prev) => !prev);
  };
  const toggleChannelModalVisible = () => {
    setChannelModalVisible((prev) => !prev);
  };
  const getUnreadCount = (gid) => {
    return Object.values(ChannelMsgData[gid] || {}).filter((m) => m.unread)
      .length;
  };
  const handleToggleExpand = (evt) => {
    const { currentTarget } = evt;
    const listEle = currentTarget.parentElement.parentElement;
    listEle.classList.toggle("collapse");
  };
  if (!contacts) return null;
  const tmpSessionUser = contacts.find((c) => c.uid == user_id);
  const transformedChannels = Object.entries(channels).map(([key, obj]) => {
    const unreads = Object.values(ChannelMsgData[key] || {}).filter(
      (m) => m.unread
    ).length;
    return { id: key, ...obj, unreads };
  });
  const sessions = Object.keys(UserMsgData).map((uid) => {
    let currUser = contacts.find((c) => c.uid == uid);
    if (!currUser) return undefined;
    let lastMid = Object.keys(UserMsgData[uid]).sort().pop();
    let unreads = Object.values(UserMsgData[uid] || {}).filter((m) => m.unread)
      .length;
    let lastMsg = UserMsgData[uid][lastMid];
    return { user: currUser, unreads, uid, lastMsg };
  });
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
          <Search />
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
              <MdAdd
                onClick={toggleChannelModalVisible}
                size={18}
                color="#78787C"
              />
            </h3>
            <nav className="nav">
              <ChannelList
                channels={transformedChannels}
                setDropFiles={setChannelDropFiles}
              />
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
              <MdAdd
                size={18}
                color="#78787C"
                onClick={toggleContactsModalVisible}
              />
            </h3>
            <nav className="nav">
              <DMList sessions={sessions} setDropFiles={setUserDropFiles} />
              {user_id && !Object.keys(UserMsgData).includes(user_id) && (
                <NavLink className="session" to={`/chat/dm/${user_id}`}>
                  <Contact
                    compact
                    interactive={false}
                    className="avatar"
                    uid={user_id}
                  />
                  <div className="details">
                    <div className="up">
                      <span className="name">{tmpSessionUser.name}</span>
                      <time></time>
                    </div>

                    <div className="down">
                      <div className="msg"></div>
                      {/* <i className="badge">3</i> */}
                    </div>
                  </div>
                </NavLink>
              )}
            </nav>
          </div>
          <CurrentUser />
        </div>
        <div className="right">
          {channel_id && (
            <ChannelChat
              unreads={getUnreadCount(channel_id)}
              cid={channel_id}
              data={channels[channel_id]}
              dropFiles={channelDropFiles}
            />
          )}
          {user_id && <DMChat uid={user_id} dropFiles={userDropFiles} />}
        </div>
      </StyledWrapper>
    </>
  );
}
