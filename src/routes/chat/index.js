// import React from 'react';
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import { MdAdd } from "react-icons/md";
import { AiOutlineCaretDown } from "react-icons/ai";
import { useGetChannelsQuery } from "../../app/services/channel";
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
  const UserMsgData = useSelector((store) => {
    return store.userMsg;
  });
  const [channelModalVisible, setChannelModalVisible] = useState(false);
  const [contactsModalVisible, setContactsModalVisible] = useState(false);
  const { channel_id, user_id } = useParams();
  const { data: channels } = useGetChannelsQuery();
  const { data: contacts } = useGetContactsQuery();
  const toggleContactsModalVisible = () => {
    setContactsModalVisible((prev) => !prev);
  };
  const toggleChannelModalVisible = () => {
    setChannelModalVisible((prev) => !prev);
  };
  console.log("channels", channels);
  if (!channels || !contacts) return null;
  const Sessions = Object.keys(UserMsgData);
  const tmpSessionUser = contacts.find((c) => c.uid == user_id);
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
              {channels.map(({ gid, is_public, name, description }) => {
                return (
                  <NavLink
                    title={description}
                    key={gid}
                    className="link"
                    to={`/chat/channel/${gid}`}
                  >
                    <span className="txt">
                      <ChannelIcon personal={!is_public} />
                      {name}
                    </span>
                    <i className="badge">12</i>
                  </NavLink>
                );
              })}
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
                        <i className="badge">3</i>
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
                      <i className="badge">3</i>
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
              cid={channel_id}
              data={channels.find(({ gid }) => gid == channel_id)}
            />
          )}
          {user_id && <DMChat uid={user_id} />}
        </div>
      </StyledWrapper>
    </>
  );
}
