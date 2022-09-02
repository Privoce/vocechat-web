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
import GuestBlankPlaceholder from "./GuestBlankPlaceholder";
import GuestChannelChatInfo from "./GuestChannelChatInfo";
import GuestSessionList from "./GuestSessionList";
export default function ChatPage() {
  const [channelModalVisible, setChannelModalVisible] = useState(false);
  const [usersModalVisible, setUsersModalVisible] = useState(false);
  const { channel_id = 0, user_id = 0 } = useParams();
  const { sessionUids, isGuest } = useAppSelector((store) => {
    return {
      isGuest: store.authData.guest,
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
      <StyledWrapper className={isGuest ? "guest" : ""}>
        <div className="left">
          <Server readonly={isGuest} />
          {isGuest ? <GuestSessionList /> : <SessionList tempSession={tmpSession} />}
        </div>
        <div className={`right ${placeholderVisible ? "placeholder" : ""}`}>
          {placeholderVisible && (isGuest ? <GuestBlankPlaceholder /> : <BlankPlaceholder />)}
          {channel_id !== 0 &&
            (isGuest ? (
              <GuestChannelChatInfo cid={+channel_id} />
            ) : (
              <ChannelChat cid={+channel_id} />
            ))}
          {user_id !== 0 && <DMChat uid={+user_id} />}
        </div>
      </StyledWrapper>
    </>
  );
}
