// @ts-nocheck
import { useState, useEffect, FC } from "react";
import clsx from "clsx";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { useNavigate, NavLink, useMatch } from "react-router-dom";
import ContextMenu from "./ContextMenu";
import getUnreadCount, { renderPreviewMessage } from "../utils";
import User from "@/components/User";
import Avatar from "@/components/Avatar";
import IconLock from "@/assets/icons/lock.svg";
import IconMute from "@/assets/icons/mute.svg";
import IconVoicing from "@/assets/icons/voicing.svg";
import useContextMenu from "@/hooks/useContextMenu";
import useUploadFile from "@/hooks/useUploadFile";
import { useAppSelector } from "@/app/store";
import { fromNowTime } from "@/utils";
import { ChatContext } from "@/types/common";

interface IProps {
  type?: ChatContext;
  id: number;
  mid: number;
  pinned?: boolean;
  setDeleteChannelId: (param: number) => void;
  setInviteChannelId: (param: number) => void;
}
const Session: FC<IProps> = ({
  type = "dm",
  pinned = false,
  id,
  mid,
  setDeleteChannelId,
  setInviteChannelId
}) => {
  const navPath = type == "dm" ? `/chat/dm/${id}` : `/chat/channel/${id}`;
  // const { pathname } = useLocation();
  const isCurrentPath = useMatch(navPath);
  const navigate = useNavigate();
  const { addStageFile } = useUploadFile({ context: type, id });

  const [{ isActive }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop({ files }) {
        if (files.length) {
          const filesData = files.map((file) => {
            const { size, type, name } = file;
            const url = URL.createObjectURL(file);
            return { size, type, name, url };
          });
          addStageFile(filesData);
          navigate(type == "dm" ? `/chat/dm/${id}` : `/chat/channel/${id}`);
        }
      },
      collect: (monitor) => ({
        isActive: monitor.canDrop() && monitor.isOver()
      })
    }),
    [type, id]
  );
  const { visible: contextMenuVisible, handleContextMenuEvent, hideContextMenu } = useContextMenu();
  const [data, setData] = useState<{
    name: string;
    icon: string;
    mid: number;
    is_public: boolean;
  }>();
  const { callingFrom, callingTo, messageData, userData, channelData, readIndex, loginUid, mids, muted, voiceList } = useAppSelector(
    (store) => {
      return {
        callingFrom: store.voice.callingFrom,
        callingTo: store.voice.callingTo,
        voiceList: store.voice.list,
        mids: type == "dm" ? store.userMessage.byId[id] : store.channelMessage[id],
        loginUid: store.authData.user?.uid || 0,
        readIndex:
          type == "dm" ? store.footprint.readUsers[id] : store.footprint.readChannels[id],
        messageData: store.message,
        userData: store.users.byId,
        channelData: store.channels.byId,
        muted: type == "dm" ? store.footprint.muteUsers[id] : store.footprint.muteChannels[id]
      };
    }
  );

  useEffect(() => {
    const tmp = type == "dm" ? userData[id] : channelData[id];
    if (!tmp) return;
    if (type == "dm") {
      // user
      const { name, avatar } = tmp;
      setData({ name, icon: avatar, mid, is_public: true });
    } else {
      // channel
      const { name, icon = "", is_public } = tmp;
      setData({ name, icon, mid, is_public });
    }
  }, [id, mid, type, userData, channelData]);
  if (!data) return null;
  const previewMsg = messageData[mid] || {};
  const { name, icon, is_public } = data;
  const { unreads = 0 } = getUnreadCount({
    mids,
    readIndex,
    messageData,
    loginUid
  });
  const isVoicing = type == "channel" ? voiceList.some((item) => {
    return item.context == type && item.id === id;
  }) : (id == callingFrom || id == callingTo);
  console.log("unreads", unreads, isCurrentPath);

  return (
    <li className={clsx("session")}>
      <ContextMenu
        visible={contextMenuVisible}
        hide={hideContextMenu}
        context={type}
        id={id}
        mid={mid}
        pinned={pinned}
        setInviteChannelId={setInviteChannelId}
        deleteChannel={setDeleteChannelId}
      >
        <NavLink
          ref={drop}
          className={({ isActive: linkActive }) => clsx(`nav flex gap-2 rounded-lg p-2 w-full`, isActive && "shadow-[inset_0_0_0_2px_#52edff]", linkActive && "bg-gray-500/20", pinned ? "md:hover:bg-gray-300/20" : "md:hover:bg-gray-500/20")}
          to={navPath}
          onContextMenu={handleContextMenuEvent}
        >
          <div className="flex shrink-0 relative w-10 h-10">
            {type == "dm" ? (
              <User avatarSize={40} compact interactive={false} uid={id} />
            ) : (
              <Avatar
                width={40}
                height={40}
                className="icon rounded-full object-cover"
                type="channel"
                name={name}
                src={icon}
              />
            )}
            {isVoicing && <IconVoicing className="top-0 -right-[7px] absolute w-6 h-6" />}
          </div>
          <div className="w-full flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between ">
              <span className={clsx(`flex items-center gap-1`)}>
                <i className={clsx("not-italic font-semibold text-sm text-gray-500 dark:text-white max-w-[120px] truncate", !previewMsg.created_at && "max-w-[190px]")}>
                  {name}
                </i>
                {!is_public && <IconLock className="dark:fill-gray-400" />}
              </span>
              <span className={clsx("text-xs text-gray-500 dark:text-gray-400 max-w-[80px] truncate font-semibold")}>
                {fromNowTime(previewMsg.created_at)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={clsx("text-xs text-gray-500 dark:text-gray-400  truncate", unreads > 0 ? `w-36` : ``)}>{renderPreviewMessage(previewMsg)}</span>
              {(unreads > 0 && !isCurrentPath) ? <strong className={clsx(`text-white px-1.5 py-[3px] font-bold text-[10px] leading-[10px] rounded-[10px]`, muted ? "bg-black/10 dark:bg-gray-500" : "bg-primary-400")}>
                {unreads > 99 ? "99+" : unreads}
              </strong> : (muted && <IconMute className="w-3 h-3 fill-black/10 dark:fill-gray-500" />)}
            </div>
          </div>
        </NavLink>
      </ContextMenu>
    </li>
  );
};
export default Session;
