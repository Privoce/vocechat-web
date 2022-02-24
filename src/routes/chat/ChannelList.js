// import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import useContextMenu from "../../common/hook/useContextMenu";
import ContextMenu from "../../common/component/ContextMenu";
import { toggleChannelSetting } from "../../app/slices/ui";
import ChannelIcon from "../../common/component/ChannelIcon";
const NavItem = ({ data, setFiles, contextMenuEventHandler }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChannelSetting = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    dispatch(toggleChannelSetting(data.id));
  };
  const [{ isActive }, drop] = useDrop(() => ({
    accept: [NativeTypes.FILE],
    drop({ dataTransfer }) {
      if (dataTransfer.files.length) {
        // console.log(files, rest);
        setFiles([...dataTransfer.files]);
        navigate(`/chat/channel/${data.id}`);
        // 重置
        setTimeout(() => {
          setFiles([]);
        }, 300);
      }
    },
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
  }));
  const { id, is_public, name, unreads } = data;
  return (
    <NavLink
      onContextMenu={contextMenuEventHandler}
      ref={drop}
      key={id}
      className={`link ${isActive ? "drop_over" : ""}`}
      to={`/chat/channel/${id}`}
    >
      <span className="txt">
        <ChannelIcon personal={!is_public} />
        {name}
      </span>
      <div className="icons">
        <i className="setting" onClick={handleChannelSetting}></i>
        {unreads > 0 && (
          <i className={`badge ${unreads > 99 ? "dot" : ""}`}>
            {unreads > 99 ? null : unreads}
          </i>
        )}
      </div>
    </NavLink>
  );
};
export default function ChannelList({ channels, setDropFiles }) {
  const {
    visible: contextMenuVisible,
    posX,
    posY,
    hideContextMenu,
    handleContextMenuEvent,
  } = useContextMenu();
  return (
    <>
      {channels.map(({ id, is_public, name, description, unreads }) => {
        return (
          <NavItem
            contextMenuEventHandler={handleContextMenuEvent}
            key={id}
            data={{ id, is_public, name, description, unreads }}
            setFiles={setDropFiles}
          />
        );
      })}
      {contextMenuVisible ? (
        <ContextMenu
          hideMenu={hideContextMenu}
          posX={posX}
          posY={posY}
          items={[
            {
              title: "Mark As Read",
              underline: true,
            },
            {
              title: "Mute",
            },
            {
              title: "Notification Settings",
              underline: true,
            },
            {
              title: "Edit Channel",
              underline: true,
            },
            {
              title: "Invite People",
            },
            {
              title: "Delete Channel",
              danger: true,
            },
          ]}
        />
      ) : null}
    </>
  );
}
