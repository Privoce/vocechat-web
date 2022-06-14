import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import relativeTime from "dayjs/plugin/relativeTime";
import ContextMenu from "./ContextMenu";
import { renderPreviewMessage } from "../utils";
import Contact from "../../../common/component/Contact";
import iconChannel from "../../../assets/icons/channel.svg?url";
import IconLock from "../../../assets/icons/lock.svg";
import useContextMenu from "../../../common/hook/useContextMenu";
import { useNavigate, NavLink } from "react-router-dom";
dayjs.extend(relativeTime);
export default function Session({
  type = "dm",
  id,
  mid,
  setFiles,
  setDeleteChannelId,
  setInviteChannelId
}) {
  const navigate = useNavigate();
  const [{ isActive }, drop] = useDrop(() => ({
    accept: [NativeTypes.FILE],
    drop({ dataTransfer }) {
      if (dataTransfer.files.length) {
        // console.log(files, rest);
        setFiles([...dataTransfer.files]);
        navigate(type == "dm" ? `/chat/dm/${id}` : `/chat/channel/${id}`);
        // 重置
        setTimeout(() => {
          setFiles([]);
        }, 300);
      }
    },
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver()
    })
  }));
  const { visible: contextMenuVisible, handleContextMenuEvent, hideContextMenu } = useContextMenu();
  const [data, setData] = useState(null);
  const { messageData, contactData, channelData } = useSelector((store) => {
    return {
      messageData: store.message,
      contactData: store.contacts.byId,
      channelData: store.channels.byId
    };
  });
  const handleImageError = (evt) => {
    evt.target.classList.add("channel_default");
    evt.target.src = iconChannel;
  };
  useEffect(() => {
    const tmp = type == "dm" ? contactData[id] : channelData[id];
    if (!tmp) return;
    const { name, icon, avatar, is_public = true } = tmp;
    const session =
      type == "dm" ? { name, icon: avatar, mid, is_public } : { name, icon, mid, is_public };
    setData(session);
  }, [id, mid, type, contactData, channelData]);
  if (!data) return null;
  const previewMsg = messageData[mid] || {};
  const { name, icon, is_public } = data;
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
          className={`nav ${isActive ? "drop_over" : ""}`}
          to={type == "dm" ? `/chat/dm/${id}` : `/chat/channel/${id}`}
          onContextMenu={handleContextMenuEvent}
        >
          <div className="icon">
            {type == "dm" ? (
              <Contact avatarSize={40} compact interactive={false} className="avatar" uid={id} />
            ) : (
              <img
                className={`${icon ? "" : "channel_default"}`}
                onError={handleImageError}
                src={icon || iconChannel}
              />
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
            </div>
          </div>
        </NavLink>
      </ContextMenu>
    </li>
  );
}
