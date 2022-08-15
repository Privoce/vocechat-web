// import React from 'react';
import { useState, MouseEvent } from "react";
import { useParams } from "react-router-dom";

import { AiOutlineCaretDown } from "react-icons/ai";

import StyledWrapper from "./styled";
import AddIcon from "../../assets/icons/add.svg";
import BlankPlaceholder from "../../common/component/BlankPlaceholder";
import Server from "../../common/component/Server";
import Tooltip from "../../common/component/Tooltip";
import ChannelChat from "./ChannelChat";
import DMChat from "./DMChat";
import ChannelList from "./ChannelList";
import UsersModal from "../../common/component/UsersModal";
import ChannelModal from "../../common/component/ChannelModal";
import DMList from "./DMList";
import { useAppSelector } from "../../app/store";

export default function ChatPage() {
  const [channelDropFiles, setChannelDropFiles] = useState<File[]>([]);
  const [userDropFiles, setUserDropFiles] = useState<File[]>([]);
  const { sessionUids } = useAppSelector((store) => {
    return {
      sessionUids: store.userMessage.ids
    };
  });
  const [channelModalVisible, setChannelModalVisible] = useState(false);
  const [usersModalVisible, setUsersModalVisible] = useState(false);
  const { channel_id, user_id = 0 } = useParams();
  const toggleUsersModalVisible = () => {
    setUsersModalVisible((prev) => !prev);
  };
  const toggleChannelModalVisible = () => {
    setChannelModalVisible((prev) => !prev);
  };
  const handleToggleExpand = (evt: MouseEvent<HTMLElement>) => {
    const { currentTarget } = evt;
    currentTarget.classList.toggle("collapse");
  };
  const tmpUid = sessionUids.findIndex((i) => i == +user_id) > -1 ? 0 : +user_id;
  // console.log("temp uid", tmpUid);
  const placeholderVisible = !channel_id && !user_id;
  return (
    <>
      {channelModalVisible && (
        <ChannelModal closeModal={toggleChannelModalVisible} personal={true} />
      )}
      {usersModalVisible && <UsersModal closeModal={toggleUsersModalVisible} />}
      <StyledWrapper>
        <div className="left">
          <Server />
          <div className="list channels">
            <h3 className="title">
              <span className="txt" onClick={handleToggleExpand}>
                <AiOutlineCaretDown className="icon" size={18} color="#78787C" />
                CHANNELS
              </span>
              <Tooltip tip="New Channel" placement="bottom">
                <AddIcon className="add_icon" onClick={toggleChannelModalVisible} />
              </Tooltip>
            </h3>
            <nav className="nav">
              <ChannelList setDropFiles={setChannelDropFiles} />
            </nav>
          </div>
          <div className="list dms">
            <h3 className="title">
              <span className="txt" onClick={handleToggleExpand}>
                <AiOutlineCaretDown className="icon" size={18} color="#78787C" />
                DIRECT MESSAGE
              </span>
              <Tooltip tip="New DM" placement="bottom">
                <AddIcon className="add_icon" onClick={toggleUsersModalVisible} />
              </Tooltip>
            </h3>
            <nav className="nav">
              <DMList
                uids={tmpUid ? [...sessionUids, tmpUid] : sessionUids}
                setDropFiles={setUserDropFiles}
              />
            </nav>
          </div>
        </div>
        <div className={`right ${placeholderVisible ? "placeholder" : ""}`}>
          {placeholderVisible && <BlankPlaceholder />}
          {channel_id && <ChannelChat cid={+channel_id} dropFiles={channelDropFiles} />}
          {user_id && <DMChat uid={+user_id} dropFiles={userDropFiles} />}
        </div>
      </StyledWrapper>
    </>
  );
}
