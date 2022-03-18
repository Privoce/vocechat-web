import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import useChatScroll from "../../../common/hook/useChatScroll";
import ChannelIcon from "../../../common/component/ChannelIcon";
import Send from "../../../common/component/Send";
import Contact from "../../../common/component/Contact";
import Layout from "../Layout";
import { renderMessageFragment } from "../utils";
import alertIcon from "../../../assets/icons/alert.svg?url";
import peopleIcon from "../../../assets/icons/people.svg?url";
import pinIcon from "../../../assets/icons/pin.svg?url";
import addIcon from "../../../assets/icons/add.svg?url";
import {
  // StyledNotification,
  StyledContacts,
  StyledChannelChat,
  StyledHeader,
} from "./styled";
import AddMemberModal from "./AddMemberModal";

export default function ChannelChat({ cid = "", dropFiles = [] }) {
  // const containerRef = useRef(null);
  const [membersVisible, setMembersVisible] = useState(true);
  const [addMemberModalVisible, setAddMemberModalVisible] = useState(false);
  const [dragFiles, setDragFiles] = useState([]);
  // const dispatch = useDispatch();
  const { msgIds, userIds, data, messageData } = useSelector((store) => {
    return {
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
  useEffect(() => {
    if (dropFiles.length) {
      setDragFiles(dropFiles);
    }
  }, [dropFiles]);
  const { name, description, is_public, members = [] } = data;
  const memberIds = members.length == 0 ? userIds : members;
  console.log("channel message list", msgIds);
  return (
    <>
      {addMemberModalVisible && (
        <AddMemberModal
          cid={cid}
          uids={members}
          closeModal={toggleAddVisible}
        />
      )}
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
                <img src={alertIcon} alt="opt icon" />
              </li>
              <li className="opt">
                <img src={pinIcon} alt="opt icon" />
              </li>
              <li className="opt" onClick={toggleMembersVisible}>
                <img src={peopleIcon} alt="opt icon" />
              </li>
            </ul>
          </StyledHeader>
        }
        contacts={
          membersVisible ? (
            <>
              <StyledContacts>
                {!is_public && (
                  <div className="add" onClick={toggleAddVisible}>
                    <img className="icon" src={addIcon} />
                    <div className="txt">Add members</div>
                  </div>
                )}
                {memberIds.map((uid) => {
                  return <Contact key={uid} uid={uid} popover />;
                })}
              </StyledContacts>
            </>
          ) : null
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
              {[...msgIds]
                .sort((a, b) => {
                  return Number(a) - Number(b);
                })
                .map((mid, idx) => {
                  const prev = idx == 0 ? null : messageData[msgIds[idx - 1]];
                  const curr = messageData[mid];
                  return renderMessageFragment({
                    prev,
                    curr,
                    contextId: cid,
                    context: "channel",
                  });
                })}
            </div>
          </div>

          <Send dragFiles={dragFiles} id={cid} type="channel" name={name} />
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
