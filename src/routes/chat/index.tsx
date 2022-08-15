// import React from 'react';
import { useState } from "react";
import { useParams } from "react-router-dom";

import StyledWrapper from "./styled";
import BlankPlaceholder from "../../common/component/BlankPlaceholder";
import Server from "../../common/component/Server";
import ChannelChat from "./ChannelChat";
import DMChat from "./DMChat";
import UsersModal from "../../common/component/UsersModal";
import ChannelModal from "../../common/component/ChannelModal";
import SessionList from "./SessionList";
import { useAppSelector } from "../../app/store";
export default function ChatPage() {
  const [channelModalVisible, setChannelModalVisible] = useState(false);
  const [usersModalVisible, setUsersModalVisible] = useState(false);
  const { channel_id = 0, user_id = 0 } = useParams();
  const { sessionUids } = useAppSelector((store) => {
    return {
      sessionUids: store.userMessage.ids
    };
  });
  const toggleUsersModalVisible = () => {
    setUsersModalVisible((prev) => !prev);
  };
  const toggleChannelModalVisible = () => {
    setChannelModalVisible((prev) => !prev);
  };
  const tmpSession =
    sessionUids.findIndex((i) => i == user_id) > -1
      ? undefined
      : {
          key: `user_${user_id}`,
          unreads: 0,
          id: +user_id,
          type: "user" as "user" | "channel"
        };
  // console.log("temp uid", tmpUid);
  const placeholderVisible = channel_id == 0 && user_id == 0;
  return (
    <>
      {channelModalVisible && (
        <ChannelModal closeModal={toggleChannelModalVisible} personal={true} />
      )}
      {usersModalVisible && <UsersModal closeModal={toggleUsersModalVisible} />}
      <StyledWrapper>
        <div className="left">
          <Server />
          <SessionList tempSession={tmpSession} />
        </div>
        <div className={`right ${placeholderVisible ? "placeholder" : ""}`}>
          {placeholderVisible && <BlankPlaceholder />}
          {channel_id !== 0 && <ChannelChat cid={+channel_id} />}
          {user_id !== 0 && <DMChat uid={+user_id} />}
        </div>
      </StyledWrapper>
    </>
  );
}
