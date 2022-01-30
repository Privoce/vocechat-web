// import React from 'react';
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { MdAdd } from "react-icons/md";
import { AiOutlineCaretDown } from "react-icons/ai";

import { useGetContactsQuery } from "../../app/services/contact";
import StyledWrapper from "./styled";
import Search from "../../common/component/Search";
import Avatar from "../../common/component/Avatar";
import ChannelIcon from "../../common/component/ChannelIcon";
import ChannelChat from "./ChannelChat";
import DMChat from "./DMChat";
import ContactsModal from "../../common/component/ContactsModal";
import ChannelModal from "../../common/component/ChannelModal";

export default function ChatPage() {
  const { channels, UserMsgData, ChannelMsgData } = useSelector((store) => {
    return {
      channels: store.channels,
      UserMsgData: store.userMsg,
      ChannelMsgData: store.channelMsg,
    };
  });
  const [channelModalVisible, setChannelModalVisible] = useState(false);
  const [contactsModalVisible, setContactsModalVisible] = useState(false);
  const { channel_id, user_id } = useParams();
  const { data: contacts } = useGetContactsQuery();
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
  if (!contacts) return null;
  const Sessions = Object.keys(UserMsgData);
  const tmpSessionUser = contacts.find((c) => c.uid == user_id);
  const transformedChannels = Object.entries(channels).map(([key, obj]) => {
    return { id: key, ...obj };
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
              <span className="txt">
                <AiOutlineCaretDown size={18} color="#78787C" />
                CHANNELS
              </span>
              <MdAdd
                onClick={toggleChannelModalVisible}
                size={18}
                color="#78787C"
              />
            </h3>
            <nav className="nav">
              {transformedChannels.map(
                ({ id, is_public, name, description }) => {
                  let unreads = getUnreadCount(id);
                  return (
                    <NavLink
                      title={description}
                      key={id}
                      className="link"
                      to={`/chat/channel/${id}`}
                    >
                      <span className="txt">
                        <ChannelIcon personal={!is_public} />
                        {name}
                      </span>
                      {unreads > 0 && <i className="badge">{unreads}</i>}
                    </NavLink>
                  );
                }
              )}
            </nav>
          </div>
          <div className="list dms">
            <h3 className="title">
              <span className="txt">
                <AiOutlineCaretDown size={18} color="#78787C" />
                DIRECT MESSAGE
              </span>
              <MdAdd
                size={18}
                color="#78787C"
                onClick={toggleContactsModalVisible}
              />
            </h3>
            <nav className="nav">
              {Sessions.map((uid) => {
                let currUser = contacts.find((c) => c.uid == uid);
                let latestMid = Object.keys(UserMsgData[uid]).sort().pop();
                let unreads = Object.values(UserMsgData[uid] || {}).filter(
                  (m) => m.unread
                ).length;
                let latestMsg = UserMsgData[uid][latestMid];
                return (
                  <NavLink key={uid} className="session" to={`/chat/dm/${uid}`}>
                    <Avatar className="avatar" url={currUser.avatar} id={uid} />
                    <div className="details">
                      <div className="up">
                        <span className="name">{currUser.name}</span>
                        <time>
                          {dayjs(latestMsg.created_at).format("YYYY-MM-DD")}
                        </time>
                      </div>

                      <div className="down">
                        <div className="msg">{latestMsg.content}</div>
                        {unreads > 0 && <i className="badge">{unreads}</i>}
                      </div>
                    </div>
                  </NavLink>
                );
              })}
              {user_id && !Sessions.includes(user_id) && (
                <NavLink className="session" to={`/chat/dm/${user_id}`}>
                  <Avatar
                    className="avatar"
                    url={tmpSessionUser.avatar}
                    id={user_id}
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
        </div>
        <div className="right">
          {channel_id && (
            <ChannelChat
              unreads={getUnreadCount(channel_id)}
              cid={channel_id}
              data={channels[channel_id]}
            />
          )}
          {user_id && <DMChat uid={user_id} />}
        </div>
      </StyledWrapper>
    </>
  );
}
