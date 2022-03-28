// import React from 'react'
import { NavLink, useNavigate, useMatch } from "react-router-dom";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { NativeTypes } from "react-dnd-html5-backend";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Tippy from "@tippyjs/react";
import { useReadMessageMutation } from "../../../app/services/message";
import { removeUserSession } from "../../../app/slices/message.user";

import useContextMenu from "../../../common/hook/useContextMenu";
import ContextMenu from "../../../common/component/ContextMenu";
dayjs.extend(relativeTime);
import { renderPreviewMessage } from "../utils";
import Contact from "../../../common/component/Contact";
const NavItem = ({ uid, mid, unreads, setFiles }) => {
  const dispatch = useDispatch();
  const pathMatched = useMatch(`/chat/dm/${uid}`);
  const [updateReadIndex] = useReadMessageMutation();
  const { currMsg, currUser } = useSelector((store) => {
    return {
      currUser: store.contacts.byId[uid],
      currMsg: store.message[mid],
    };
  });
  const navigate = useNavigate();
  const {
    visible: contextMenuVisible,
    offset,
    handleContextMenuEvent,
    hideContextMenu,
  } = useContextMenu();
  const [{ isActive }, drop] = useDrop(() => ({
    accept: [NativeTypes.FILE],
    drop({ dataTransfer }) {
      if (dataTransfer.files.length) {
        // console.log(files, rest);
        setFiles([...dataTransfer.files]);
        navigate(`/chat/dm/${uid}`);
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
  const handleReadAll = () => {
    const param = { users: [{ uid, mid }] };
    updateReadIndex(param);
  };
  const handleRemoveSession = () => {
    dispatch(removeUserSession(uid));
    if (pathMatched) {
      navigate("/chat");
    }
  };
  if (!currUser) return null;
  return (
    <Tippy
      interactive
      placement="right-start"
      offset={[offset.y, offset.x]}
      visible={contextMenuVisible}
      onClickOutside={hideContextMenu}
      key={uid}
      content={
        <ContextMenu
          hideMenu={hideContextMenu}
          items={[
            {
              title: "Mark As Read",
              handler: handleReadAll,
            },
            {
              title: "Hide Session",
              danger: true,
              handler: handleRemoveSession,
            },
          ]}
        />
      }
    >
      <NavLink
        ref={drop}
        key={uid}
        className={`session ${isActive ? "drop_over" : ""}`}
        to={`/chat/dm/${uid}`}
        onContextMenu={handleContextMenuEvent}
      >
        <Contact compact interactive={false} className="avatar" uid={uid} />
        <div className="details">
          <div className="up">
            <span className="name">{currUser.name}</span>
            {currMsg && <time>{dayjs(currMsg.created_at).fromNow()}</time>}
          </div>

          <div className="down">
            <div className="msg">{renderPreviewMessage(currMsg)}</div>
            {unreads > 0 && (
              <i className={`badge ${unreads > 99 ? "dot" : ""}`}>
                {unreads > 99 ? null : unreads}
              </i>
            )}
          </div>
        </div>
      </NavLink>
    </Tippy>
  );
};

export default NavItem;
