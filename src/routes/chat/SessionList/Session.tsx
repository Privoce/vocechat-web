import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import relativeTime from "dayjs/plugin/relativeTime";
import ContextMenu from "./ContextMenu";
import getUnreadCount, { renderPreviewMessage } from "../utils";
import User from "../../../common/component/User";
import Avatar from "../../../common/component/Avatar";
import iconChannel from "../../../assets/icons/channel.svg?url";
import IconLock from "../../../assets/icons/lock.svg";
import useContextMenu from "../../../common/hook/useContextMenu";
import { useNavigate, NavLink } from "react-router-dom";
import useUploadFile from "../../../common/hook/useUploadFile";

// todo: move to root file
dayjs.extend(relativeTime);

export default function Session({
  type = "user",
  id,
  mid,
  setDeleteChannelId,
  setInviteChannelId
}) {
  const navigate = useNavigate();
  const { addStageFile } = useUploadFile({ context: type, id });

  const [{ isActive }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop({ files }) {
        if (files.length) {
          // console.log(files, rest);
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
  const [data, setData] = useState(null);
  const { messageData, userData, channelData, readIndex, loginUid, mids, muted } = useSelector(
    (store) => {
      return {
        mids: type == "user" ? store.userMessage.byId[id] : store.channelMessage[id],
        loginUid: store.authData.user?.uid,
        readIndex:
          type == "user" ? store.footprint.readUsers[id] : store.footprint.readChannels[id],
        messageData: store.message,
        userData: store.users.byId,
        channelData: store.channels.byId,
        muted: type == "user" ? store.footprint.muteUsers[id] : store.footprint.muteChannels[id]
      };
    }
  );

  const handleImageError = (evt) => {
    evt.target.classList.add("channel_default");
    evt.target.src = iconChannel;
  };

  useEffect(() => {
    const tmp = type == "user" ? userData[id] : channelData[id];
    if (!tmp) return;
    const { name, icon, avatar, is_public = true } = tmp;
    const session =
      type == "user" ? { name, icon: avatar, mid, is_public } : { name, icon, mid, is_public };
    setData(session);
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
          className={`nav ${isActive ? "drop_over" : ""} ${muted ? "muted" : ""}`}
          to={type == "user" ? `/chat/dm/${id}` : `/chat/channel/${id}`}
          onContextMenu={handleContextMenuEvent}
        >
          <div className="icon">
            {type == "user" ? (
              <User avatarSize={40} compact interactive={false} className="avatar" uid={id} />
            ) : (
              <Avatar className="icon" type="channel" name={name} url={icon} />
              // <img
              //   className={`${icon ? "" : "channel_default"}`}
              //   onError={handleImageError}
              //   src={icon || iconChannel}
              // />
            )}
          </div>
          <div className="details">
            <div className="up">
              <span className="name">
                {name} {!is_public && <IconLock />}
              </span>
              <span className="time">
                {previewMsg.created_at ? dayjs(previewMsg.created_at).fromNow() : null}
              </span>
            </div>
            <div className="down">
              <span className="msg">{renderPreviewMessage(previewMsg)}</span>
              {unreads > 0 && (
                <i className={`badge ${unreads > 99 ? "dot" : ""}`}>
                  {unreads > 99 ? null : unreads}
                </i>
              )}
            </div>
          </div>
        </NavLink>
      </ContextMenu>
    </li>
  );
}
