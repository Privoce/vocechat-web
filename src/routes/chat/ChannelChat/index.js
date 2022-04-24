import { useState } from "react";
import { useDebounce } from "rooks";
import { useSelector } from "react-redux";
import { useReadMessageMutation } from "../../../app/services/message";
import useChatScroll from "../../../common/hook/useChatScroll";
import ChannelIcon from "../../../common/component/ChannelIcon";
import Tooltip from "../../../common/component/Tooltip";
import Send from "../../../common/component/Send";
import Contact from "../../../common/component/Contact";
import Layout from "../Layout";
import { renderMessageFragment } from "../utils";
import EditIcon from "../../../assets/icons/edit.svg";
import alertIcon from "../../../assets/icons/alert.svg?url";
import peopleIcon from "../../../assets/icons/people.svg?url";
import pinIcon from "../../../assets/icons/pin.svg?url";
import searchIcon from "../../../assets/icons/search.svg?url";
import headphoneIcon from "../../../assets/icons/headphone.svg?url";
import boardosIcon from "../../../assets/icons/app.boardos.svg?url";
import webrowseIcon from "../../../assets/icons/app.webrowse.svg?url";
import addIcon from "../../../assets/icons/add.svg?url";
import {
  // StyledNotification,
  StyledContacts,
  StyledChannelChat,
  StyledHeader,
} from "./styled";
import ChannelInviteModal from "../../../common/component/ChannelInviteModal";
import { NavLink, useLocation } from "react-router-dom";

export default function ChannelChat({ cid = "", dropFiles = [] }) {
  const { pathname } = useLocation();
  const [updateReadIndex] = useReadMessageMutation();
  const updateReadDebounced = useDebounce(updateReadIndex, 300);
  const [membersVisible, setMembersVisible] = useState(true);
  const [addMemberModalVisible, setAddMemberModalVisible] = useState(false);
  // const dispatch = useDispatch();
  const {
    msgIds,
    userIds,
    data,
    messageData,
    loginUid,
    loginUser,
    footprint,
  } = useSelector((store) => {
    return {
      footprint: store.footprint,
      loginUser: store.contacts.byId[store.authData.uid],
      loginUid: store.authData.uid,
      msgIds: store.channelMessage[cid] || [],
      userIds: store.contacts.ids,
      data: store.channels.byId[cid] || {},
      messageData: store.message || {},
    };
  });
  const ref = useChatScroll(msgIds);
  // const handleClearUnreads = () => {
  //   dispatch(readMessage(msgIds));
  // };
  const toggleMembersVisible = () => {
    setMembersVisible((prev) => !prev);
  };
  const toggleAddVisible = () => {
    setAddMemberModalVisible((prev) => !prev);
  };

  const { name, description, is_public, members = [], owner } = data;
  const memberIds = is_public ? userIds : members;
  const addVisible = loginUser?.is_admin || owner == loginUid;
  console.log("channel message list", msgIds);
  const readIndex = footprint.readChannels[cid];
  return (
    <>
      {addMemberModalVisible && (
        <ChannelInviteModal cid={cid} closeModal={toggleAddVisible} />
      )}
      <Layout
        to={cid}
        context="channel"
        dropFiles={dropFiles}
        // ref={containerRef}
        aside={
          <>
            <ul className="tools">
              {/* <li className="tool">
                <Tooltip tip="Search" placement="left">
                  <img src={searchIcon} alt="opt icon" />
                </Tooltip>
              </li> */}
              <li className="tool">
                <Tooltip tip="Voice/Video Chat" placement="left">
                  <img src={headphoneIcon} alt="opt icon" />
                </Tooltip>
              </li>
              <li className="tool">
                <Tooltip tip="Notifications" placement="left">
                  <img src={alertIcon} alt="opt icon" />
                </Tooltip>
              </li>
              <li className="tool">
                <Tooltip tip="Pin" placement="left">
                  <img src={pinIcon} alt="opt icon" />
                </Tooltip>
              </li>
              <li className="tool" onClick={toggleMembersVisible}>
                <Tooltip tip="Channel Members" placement="left">
                  <img src={peopleIcon} alt="opt icon" />
                </Tooltip>
              </li>
            </ul>
            <hr className="divider" />
            <ul className="apps">
              <li className="app">
                <Tooltip tip="Webrowse" placement="left">
                  <img src={webrowseIcon} alt="app icon" />
                </Tooltip>
              </li>
              <li className="app">
                <Tooltip tip="BoardOS" placement="left">
                  <img src={boardosIcon} alt="app icon" />
                </Tooltip>
              </li>
            </ul>
          </>
        }
        header={
          <StyledHeader className="head">
            <div className="txt">
              <ChannelIcon personal={!is_public} />
              <span className="title">{name}</span>
              <span className="desc">{description}</span>
            </div>
          </StyledHeader>
        }
        contacts={
          membersVisible ? (
            <>
              <StyledContacts>
                {addVisible && (
                  <div className="add" onClick={toggleAddVisible}>
                    <img className="icon" src={addIcon} />
                    <div className="txt">Add members</div>
                  </div>
                )}
                {memberIds.map((uid) => {
                  return <Contact key={uid} uid={uid} dm popover />;
                })}
              </StyledContacts>
            </>
          ) : null
        }
      >
        <StyledChannelChat>
          <div className="wrapper">
            <div className="chat" ref={ref}>
              <div className="info">
                <h2 className="title">Welcome to #{name} !</h2>
                <p className="desc">
                  This is the start of the #{name} channel.{" "}
                </p>
                <NavLink
                  to={`/setting/channel/${cid}?f=${pathname}`}
                  className="edit"
                >
                  <EditIcon className="icon" />
                  Edit Channel
                </NavLink>
              </div>
              <div className="feed">
                {[...msgIds]
                  .sort((a, b) => {
                    return Number(a) - Number(b);
                  })
                  .map((mid, idx) => {
                    const curr = messageData[mid];
                    if (!curr) return null;
                    const isFirst = idx == 0;
                    const prev = idx == 0 ? null : messageData[msgIds[idx - 1]];
                    const read = curr?.from_uid == loginUid || mid <= readIndex;
                    return renderMessageFragment({
                      updateReadIndex: updateReadDebounced,
                      read,
                      isFirst,
                      prev,
                      curr,
                      contextId: cid,
                      context: "channel",
                    });
                  })}
              </div>
            </div>
            <Send
              key={cid}
              id={cid}
              context="channel"
              name={name}
              members={memberIds}
            />
          </div>
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
    </>
  );
}
