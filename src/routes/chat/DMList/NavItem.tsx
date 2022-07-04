import { useEffect, useState } from "react";
import { NavLink, useNavigate, useMatch } from "react-router-dom";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { NativeTypes } from "react-dnd-html5-backend";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Tippy from "@tippyjs/react";
import { useReadMessageMutation } from "../../../app/services/message";
import { removeUserSession } from "../../../app/slices/message.user";
import useNormalizeMessage from "../../../common/hook/useNormalizeMessage";
import useContextMenu from "../../../common/hook/useContextMenu";
import ContextMenu from "../../../common/component/ContextMenu";
dayjs.extend(relativeTime);
import { renderPreviewMessage } from "../utils";
import User from "../../../common/component/User";
import { ContentTypes } from "../../../app/config";
const NavItem = ({ uid, mid, unreads, setFiles }) => {
  const [previewMsg, setPreviewMsg] = useState(null);
  const { messages: normalizedMessages, normalizeMessage } = useNormalizeMessage();
  const dispatch = useDispatch();
  const pathMatched = useMatch(`/chat/dm/${uid}`);
  const [updateReadIndex] = useReadMessageMutation();
  const { currMsg, currUser } = useSelector((store) => {
    return {
      currUser: store.users.byId[uid],
      currMsg: store.message[mid]
    };
  });
  const navigate = useNavigate();
  const { visible: contextMenuVisible, handleContextMenuEvent, hideContextMenu } = useContextMenu();
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
      isActive: monitor.canDrop() && monitor.isOver()
    })
  }));
  useEffect(() => {
    if (currMsg) {
      if (currMsg.content_type == ContentTypes.archive) {
        normalizeMessage(currMsg.content);
      } else {
        setPreviewMsg(currMsg);
      }
    }
  }, [currMsg]);
  useEffect(() => {
    if (normalizedMessages) {
      setPreviewMsg(normalizedMessages.pop());
    }
  }, [normalizedMessages]);

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
  // console.log("preview msg", previewMsg, normalizedMessages);
  return (
    <Tippy
      interactive
      popperOptions={{ strategy: "fixed" }}
      placement="right-start"
      visible={contextMenuVisible}
      followCursor={"initial"}
      onClickOutside={hideContextMenu}
      key={uid}
      content={
        <ContextMenu
          hideMenu={hideContextMenu}
          items={[
            {
              title: "Mark As Read",
              handler: handleReadAll
            },
            {
              title: "Hide Session",
              danger: true,
              handler: handleRemoveSession
            }
          ]}
        />
      }
    >
      <NavLink
        ref={drop}
        key={uid}
        className={`link session ${isActive ? "drop_over" : ""}`}
        to={`/chat/dm/${uid}`}
        onContextMenu={handleContextMenuEvent}
      >
        <User compact interactive={false} className="avatar" uid={uid} />
        <div className="details">
          <div className="up">
            <span className="name">{currUser.name}</span>
            {previewMsg && <time>{dayjs(previewMsg.created_at).fromNow()}</time>}
          </div>

          <div className="down">
            <div className="msg">{renderPreviewMessage(previewMsg)}</div>
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
