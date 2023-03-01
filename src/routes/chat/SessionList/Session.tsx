// @ts-nocheck
import { useState, useEffect, FC } from "react";
import clsx from "clsx";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { useNavigate, NavLink } from "react-router-dom";
import ContextMenu from "./ContextMenu";
import getUnreadCount, { renderPreviewMessage } from "../utils";
import User from "../../../common/component/User";
import Avatar from "../../../common/component/Avatar";
import IconLock from "../../../assets/icons/lock.svg";
import useContextMenu from "../../../common/hook/useContextMenu";
import useUploadFile from "../../../common/hook/useUploadFile";
import { useAppSelector } from "../../../app/store";
import { fromNowTime } from "../../../common/utils";

interface IProps {
  type?: "user" | "channel";
  id: number;
  mid: number;
  setDeleteChannelId: (param: number) => void;
  setInviteChannelId: (param: number) => void;
}
const Session: FC<IProps> = ({
  type = "user",
  id,
  mid,
  setDeleteChannelId,
  setInviteChannelId
}) => {
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
          navigate(type == "user" ? `/chat/dm/${id}` : `/chat/channel/${id}`);
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
  const { messageData, userData, channelData, readIndex, loginUid, mids, muted } = useAppSelector(
    (store) => {
      return {
        mids: type == "user" ? store.userMessage.byId[id] : store.channelMessage[id],
        loginUid: store.authData.user?.uid || 0,
        readIndex:
          type == "user" ? store.footprint.readUsers[id] : store.footprint.readChannels[id],
        messageData: store.message,
        userData: store.users.byId,
        channelData: store.channels.byId,
        muted: type == "user" ? store.footprint.muteUsers[id] : store.footprint.muteChannels[id]
      };
    }
  );

  useEffect(() => {
    const tmp = type == "user" ? userData[id] : channelData[id];
    if (!tmp) return;
    if ("avatar" in tmp) {
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
  return (
    <li className="session">
      <ContextMenu
        visible={contextMenuVisible}
        hide={hideContextMenu}
        context={type}
        id={id}
        mid={mid}
        setInviteChannelId={setInviteChannelId}
        deleteChannel={setDeleteChannelId}
      >
        <NavLink
          ref={drop}
          className={({ isActive: linkActive }) => clsx(`nav flex gap-2 rounded-lg p-2 w-full md:hover:bg-gray-500/20`, isActive && "shadow-[inset_0_0_0_2px_#52edff]", linkActive && "bg-gray-500/20")}
          to={type == "user" ? `/chat/dm/${id}` : `/chat/channel/${id}`}
          onContextMenu={handleContextMenuEvent}
        >
          <div className="flex shrink-0 w-10 h-10 bg-slate-50 rounded-full overflow-hidden">
            {type == "user" ? (
              <User avatarSize={40} compact interactive={false} uid={id} />
            ) : (
              <Avatar
                width={40}
                height={40}
                className="icon"
                type="channel"
                name={name}
                src={icon}
              />
            )}
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
              {unreads > 0 && (
                <strong className={clsx(`text-white h-5 min-w-[20px] bg-primary-400 font-bold text-[10px] rounded-[10px] flex-center`, unreads > 99 && 'w-1.5 !h-1.5 p-0 min-w-[unset]', muted && "bg-gray-500")}>
                  {unreads > 99 ? null : unreads}
                </strong>
              )}
            </div>
          </div>
        </NavLink>
      </ContextMenu>
    </li>
  );
};
export default Session;
