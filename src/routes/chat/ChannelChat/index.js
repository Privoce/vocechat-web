import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

import Message from "../../../common/component/Message";
import ChannelIcon from "../../../common/component/ChannelIcon";
import Send from "../../../common/component/Send";
import { clearChannelMsgUnread } from "../../../app/slices/message.channel";
import Contact from "../../../common/component/Contact";
import Layout from "../Layout";
import {
  StyledNotification,
  StyledContacts,
  StyledChannelChat,
  StyledHeader,
} from "./styled";

export default function ChannelChat({
  cid = "",
  unreads = 0,
  data = {},
  dropFiles = [],
}) {
  // const containerRef = useRef(null);
  const [dragFiles, setDragFiles] = useState([]);
  const dispatch = useDispatch();
  const { msgs, users, pendingMsgs } = useSelector((store) => {
    return {
      msgs: store.channelMessage[cid] || {},
      users: store.contacts,
      pendingMsgs: store.pendingMessage.channel[cid] || {},
    };
  });
  const handleClearUnreads = () => {
    dispatch(clearChannelMsgUnread(cid));
  };
  useEffect(() => {
    if (dropFiles.length) {
      setDragFiles(dropFiles);
    }
  }, [dropFiles]);
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
      setDragFiles={setDragFiles}
      // ref={containerRef}
      header={
        <StyledHeader>
          <div className="txt">
            <ChannelIcon personal={!is_public} />
            <span className="title">{name}</span>
            <span className="desc">{description}</span>
          </div>
          <ul className="opts">
            <li className="opt">
              <img
                src="https://static.nicegoodthings.com/project/rustchat/icon.alert.svg"
                alt="opt icon"
              />
            </li>
            <li className="opt">
              <img
                src="https://static.nicegoodthings.com/project/rustchat/icon.pin.svg"
                alt="opt icon"
              />
            </li>
            <li className="opt">
              <img
                src="https://static.nicegoodthings.com/project/rustchat/icon.people.svg"
                alt="opt icon"
              />
            </li>
          </ul>
        </StyledHeader>
      }
      contacts={
        <StyledContacts>
          {filteredUsers.map(({ name, uid }) => {
            return <Contact key={name} uid={uid} popover />;
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
            {[...Object.entries(msgs), ...Object.entries(pendingMsgs)]
              .sort(([, msg1], [, msg2]) => {
                return msg1.created_at - msg2.created_at;
              })
              .map(([mid, msg]) => {
                if (!msg) return null;
                const {
                  likes = {},
                  pending = false,
                  from_uid,
                  content,
                  content_type,
                  created_at,
                  unread,
                  removed = false,
                  edited,
                } = msg;
                return (
                  <Message
                    edited={edited}
                    likes={likes}
                    removed={removed}
                    pending={pending}
                    content_type={content_type}
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

        <Send dragFiles={dragFiles} id={cid} type="channel" name={name} />
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
