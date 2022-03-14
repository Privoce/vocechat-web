import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
// import dayjs from "dayjs";
import useChatScroll from "../../../common/hook/useChatScroll";

import Message from "../../../common/component/Message";
import ChannelIcon from "../../../common/component/ChannelIcon";
import Send from "../../../common/component/Send";
// import { readMessage } from "../../../app/slices/message";
import Contact from "../../../common/component/Contact";
import Layout from "../Layout";
import {
  StyledNotification,
  StyledContacts,
  StyledChannelChat,
  StyledHeader,
} from "./styled";

export default function ChannelChat({ cid = "", dropFiles = [] }) {
  // const containerRef = useRef(null);
  const [dragFiles, setDragFiles] = useState([]);
  // const dispatch = useDispatch();
  const { msgIds, userIds, data } = useSelector((store) => {
    return {
      msgIds: store.channelMessage[cid] || [],
      userIds: store.contacts.ids,
      data: store.channels.byId[cid],
    };
  });
  const ref = useChatScroll(msgIds);
  // const handleClearUnreads = () => {
  //   dispatch(readMessage(msgIds));
  // };
  useEffect(() => {
    if (dropFiles.length) {
      setDragFiles(dropFiles);
    }
  }, [dropFiles]);
  const { name, description, is_public, members = [] } = data;
  const memberIds = members.length == 0 ? userIds : members;
  console.log("channel message list", msgIds);
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
          {memberIds.map((uid) => {
            return <Contact key={uid} uid={uid} popover />;
          })}
        </StyledContacts>
      }
    >
      <StyledChannelChat>
        <div className="wrapper" ref={ref}>
          <div className="info">
            <h2 className="title">Welcome to #{name} !</h2>
            <p className="desc">This is the start of the #{name} channel. </p>
            {/* <button className="edit">Edit Channel</button> */}
          </div>
          <div className="chat">
            {msgIds.map((mid, idx) => {
              // if (!msg) return null;
              return <Message contextId={cid} mid={mid} key={idx} />;
            })}
          </div>
        </div>

        <Send dragFiles={dragFiles} id={cid} type="channel" name={name} />
        <div className="placeholder"></div>
      </StyledChannelChat>
      {/* {unreads != 0 && (
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
      )} */}
    </Layout>
  );
}
