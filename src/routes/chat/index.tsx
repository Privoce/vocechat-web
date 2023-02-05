import { memo, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
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
import GuestChannelChat from "./GuestChannelChat";
import GuestSessionList from "./GuestSessionList";
import IconList from '../../assets/icons/list.svg';
// import IconClose from '../../assets/icons/close.svg';
function ChatPage() {
  const [sessionListVisible, setSessionListVisible] = useState(false);
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
  const toggleSessionList = () => {
    setSessionListVisible(prev => !prev);
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
      <StyledWrapper className={`${isGuest ? "!pr-1 !pt-0" : ""} md:!pr-12 `}>
        {sessionListVisible && <div onClick={toggleSessionList} className="z-30 fixed top-0 left-4 w-screen h-screen bg-black/50 transition-all backdrop-blur-sm"></div>}
        <div className={clsx("left fixed md:relative top-0 left-0 z-40 transition-all  md:overflow-auto bg-white dark:!bg-[#1F2A37]", sessionListVisible ? "max-md:translate-x-0" : "max-md:-translate-x-full")}>
          <Server readonly={isGuest} />
          {isGuest ? <GuestSessionList /> : <SessionList tempSession={tmpSession} />}
          {sessionListVisible ? null : <button className="absolute top-2 -right-[52px] z-50 p-2 bg-none  md:hidden" onClick={toggleSessionList}>
            <IconList className="dark:stroke-gray-300" />
          </button>}
        </div>
        <div className={`right ${placeholderVisible ? "placeholder" : ""} bg-white dark:!bg-[#384250]`}>
          {placeholderVisible && (isGuest ? <GuestBlankPlaceholder /> : <BlankPlaceholder />)}
          {channel_id !== 0 &&
            (isGuest ? (
              <GuestChannelChat cid={+channel_id} />
            ) : (
              <ChannelChat cid={+channel_id} />
            ))}
          {user_id !== 0 && <DMChat uid={+user_id} />}
        </div>
      </StyledWrapper>
    </>
  );
}
export default memo(ChatPage);
