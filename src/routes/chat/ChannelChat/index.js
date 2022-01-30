import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

import Message from "../../../common/component/Message";
import ChannelIcon from "../../../common/component/ChannelIcon";
import Send from "../../../common/component/Send";
import {
  clearChannelMsgUnread,
  setLastAccessTime,
} from "../../../app/slices/message.channel";
import { useGetContactsQuery } from "../../../app/services/contact";
import Contact from "../../../common/component/Contact";
import Layout from "../Layout";
import {
  StyledNotification,
  StyledContacts,
  StyledChannelChat,
  StyledHeader,
} from "./styled";

export default function ChannelChat({ cid = "", unreads = 0, data = {} }) {
  const dispatch = useDispatch();
  const msgs = useSelector((store) => {
    return store.channelMsg[cid] || {};
  });
  const { data: users } = useGetContactsQuery();
  const handleClearUnreads = () => {
    dispatch(clearChannelMsgUnread(cid));
  };
  useEffect(() => {
    console.log({ cid });
    return () => {
      dispatch(setLastAccessTime(cid));
    };
  }, [cid]);
  const { name, description, is_public, members = [] } = data;
  const filteredUsers =
    members.length == 0
      ? users
      : users.filter((u) => {
          return members.includes(u.uid);
        });
  console.log("channel message list", msgs);
  return (
    <Layout
      header={
        <StyledHeader>
          <div className="txt">
            <ChannelIcon personal={!is_public} />
            <span className="title">{name}</span>
            <span className="desc">{description}</span>
          </div>
          <ul className="members">members</ul>
        </StyledHeader>
      }
      contacts={
        <StyledContacts>
          {filteredUsers.map(({ name, status, uid }) => {
            return <Contact key={name} uid={uid} status={status} />;
          })}
        </StyledContacts>
      }
    >
      <StyledChannelChat>
        <div className="wrapper">
          <div className="info">
            <h2 className="title">Welcome to #{name} !</h2>
            <p className="desc">This is the start of the #{name} channel. </p>
            {/* <button className="edit">Edit Channel</button> */}
          </div>
          <div className="chat">
            {Object.entries(msgs).map(([mid, msg]) => {
              if (!msg) return null;
              const { from_uid, content, created_at, unread } = msg;
              return (
                <Message
                  unread={unread}
                  gid={cid}
                  mid={mid}
                  key={mid}
                  time={created_at}
                  fromUid={from_uid}
                  content={content}
                />
              );
            })}
          </div>
        </div>

        <Send id={cid} type="channel" name={name} />
        <div className="placeholder"></div>
      </StyledChannelChat>
      {unreads != 0 && (
        <StyledNotification>
          <div className="content">
            {unreads} new messages
            {msgs.lastAccess
              ? `since ${dayjs(msgs.lastAccess).format("YYYY-MM-DD h:mm:ss A")}`
              : ""}
          </div>
          <button onClick={handleClearUnreads} className="clear">
            Mark As Read
          </button>
        </StyledNotification>
      )}
    </Layout>
  );
}
