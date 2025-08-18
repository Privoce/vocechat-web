import { memo, useMemo, useState } from "react";
import { useMatch, useParams } from "react-router-dom";
import clsx from "clsx";

import { useAppSelector } from "@/app/store";
import BlankPlaceholder from "@/components/BlankPlaceholder";
import ChannelModal from "@/components/ChannelModal";
import ErrorCatcher from "@/components/ErrorCatcher";
import Server from "@/components/Server";
import UsersModal from "@/components/UsersModal";
import ChannelChat from "./ChannelChat";
import DMChat from "./DMChat";
import GuestBlankPlaceholder from "./GuestBlankPlaceholder";
import GuestChannelChat from "./GuestChannelChat";
import GuestSessionList from "./GuestSessionList";
import RTCWidget from "./RTCWidget";
import SessionList from "./SessionList";
import VoiceFullscreen from "./VoiceFullscreen";
import { shallowEqual } from "react-redux";
import GlbModelRender from "@/components/Message/GlbModelRender";

function ChatPage() {
  const isHomePath = useMatch(`/`);
  const isChatHomePath = useMatch(`/chat`);
  const [sessionListVisible, setSessionListVisible] = useState(false);
  const [channelModalVisible, setChannelModalVisible] = useState(false);
  const [usersModalVisible, setUsersModalVisible] = useState(false);
  const { channel_id = 0, user_id = 0 } = useParams();
  const callingTo = useAppSelector((store) => store.voice.callingTo, shallowEqual);
  const aside = useAppSelector(
    (store) =>
      channel_id
        ? store.footprint.channelAsides[+channel_id]
        : store.footprint.dmAsides[store.voice.callingTo],
    shallowEqual
  );
  const isGuest = useAppSelector((store) => store.authData.guest, shallowEqual);
  const sessionUids = useAppSelector((store) => store.userMessage.ids, shallowEqual);
  const toggleUsersModalVisible = () => {
    setUsersModalVisible((prev) => !prev);
  };
  const toggleChannelModalVisible = () => {
    setChannelModalVisible((prev) => !prev);
  };
  const toggleSessionList = () => {
    setSessionListVisible((prev) => !prev);
  };
  const tmpSession =
    user_id == 0
      ? undefined
      : sessionUids.findIndex((i) => i == +user_id) == -1
      ? {
          mid: 0,
          unread: 0,
          id: +user_id,
          type: "dm" as const,
        }
      : undefined;
  // console.log("temp uid", tmpUid);
  const placeholderVisible = channel_id == 0 && user_id == 0;
  const voiceFullscreenVisible = aside === "voice_fullscreen";
  const channelChatVisible = channel_id != 0 && aside !== "voice_fullscreen";
  const dmChatVisible = user_id != 0 && aside !== "voice_fullscreen";
  const isMainPath = isHomePath || isChatHomePath;
  const context = channel_id !== 0 ? "channel" : "dm";
  const contextId = (+channel_id || callingTo) ?? 0;
  console.log("fffff", channel_id, user_id, aside, channelChatVisible);

  return (
    <ErrorCatcher>
      {channelModalVisible && (
        <ChannelModal closeModal={toggleChannelModalVisible} personal={true} />
      )}
      {usersModalVisible && <UsersModal closeModal={toggleUsersModalVisible} />}
      <div
        className={clsx(
          `flex h-screen md:h-full md:pt-2 md:pb-2.5 md:pr-1`,
          isGuest ? "guest-container md:px-1" : "md:pr-12"
        )}
      >
        {sessionListVisible && (
          <div
            onClick={toggleSessionList}
            className="z-30 fixed top-0 left-4 w-screen h-screen bg-black/50 transition-all backdrop-blur-sm"
          ></div>
        )}
        <div
          className={clsx(
            "left-container flex-col md:rounded-l-2xl w-full h-screen md:h-full md:max-w-[250px] md:min-w-[268px] shadow-[rgb(0_0_0_/_10%)_-1px_0px_0px_inset] bg-white dark:!bg-gray-800",
            isMainPath ? "flex" : "hidden md:flex"
          )}
        >
          <Server readonly={isGuest} />
          {isGuest ? <GuestSessionList /> : <SessionList tempSession={tmpSession} />}
          <RTCWidget id={+contextId} context={context} />
        </div>
        <div
          className={clsx(
            `right-container md:rounded-r-2xl w-full bg-white dark:!bg-gray-700`,
            placeholderVisible && "h-full flex-center",
            isMainPath && "hidden md:flex"
          )}
        >
          {voiceFullscreenVisible && <VoiceFullscreen id={contextId} context={context} />}
          {placeholderVisible && (isGuest ? <GuestBlankPlaceholder /> : <BlankPlaceholder />)}
          {channelChatVisible &&
            (isGuest ? <GuestChannelChat cid={+channel_id} /> : <ChannelChat cid={+channel_id} />)}
          {dmChatVisible && <DMChat uid={+user_id} />}
        </div>
      </div>
    </ErrorCatcher>
  );
}
export default memo(ChatPage);
