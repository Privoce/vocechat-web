import React, { useRef, useState, useEffect } from "react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import { useSelector } from "react-redux";
import useInView from "./useInView";
import Tippy from "@tippyjs/react";
import Reaction from "./Reaction";
import Reply from "./Reply";
import Profile from "../Profile";
import Avatar from "../Avatar";
import StyledWrapper from "./styled";
import Commands from "./Commands";
import EditMessage from "./EditMessage";
import renderContent from "./renderContent";
import Tooltip from "../Tooltip";
import ContextMenu from "./ContextMenu";

import useContextMenu from "../../hook/useContextMenu";
dayjs.extend(isToday);
dayjs.extend(isYesterday);
function Message({
  readOnly = false,
  contextId = 0,
  mid = "",
  context = "user",
  updateReadIndex,
  read = true,
}) {
  const {
    visible: contextMenuVisible,
    offset,
    handleContextMenuEvent,
    hideContextMenu,
  } = useContextMenu();
  const inviewRef = useInView();
  const [edit, setEdit] = useState(false);
  const avatarRef = useRef(null);
  const { message = {}, reactionMessageData, contactsData } = useSelector(
    (store) => {
      return {
        reactionMessageData: store.reactionMessage,
        message: store.message[mid] || {},
        contactsData: store.contacts.byId,
      };
    }
  );

  const toggleEditMessage = () => {
    setEdit((prev) => !prev);
  };

  const {
    reply_mid,
    from_uid: fromUid,
    created_at: time,
    sending = false,
    content,
    thumbnail,
    download,
    content_type = "text/plain",
    edited,
    properties,
  } = message;

  useEffect(() => {
    if (!read) {
      const data =
        context == "user"
          ? { users: [{ uid: +contextId, mid }] }
          : { groups: [{ gid: +contextId, mid }] };
      updateReadIndex(data);
    }
  }, [mid, read]);

  const reactions = reactionMessageData[mid];
  const currUser = contactsData[fromUid] || {};
  // if (!message) return null;
  let timePrefix = null;
  const dayjsTime = dayjs(time);
  timePrefix = dayjsTime.isToday()
    ? "Today"
    : dayjsTime.isYesterday()
    ? "Yesterday"
    : null;

  console.log("render message");
  // return null;
  return (
    <ContextMenu
      editMessage={toggleEditMessage}
      context={context}
      contextId={contextId}
      mid={mid}
      visible={contextMenuVisible}
      hide={hideContextMenu}
      offset={offset}
    >
      <StyledWrapper
        onContextMenu={handleContextMenuEvent}
        data-msg-mid={mid}
        ref={inviewRef}
        className={`message ${readOnly ? "readonly" : ""}`}
      >
        <Tippy
          disabled={readOnly}
          duration={0}
          interactive
          placement="left"
          trigger="click"
          content={<Profile uid={fromUid} type="card" />}
        >
          <div className="avatar" data-uid={fromUid} ref={avatarRef}>
            <Avatar url={currUser.avatar} name={currUser.name} />
          </div>
        </Tippy>
        <div className="details">
          <div className="up">
            <span className="name">{currUser.name}</span>
            <Tooltip
              delay={200}
              disabled={!timePrefix || readOnly}
              placement="top"
              tip={dayjsTime.format("YYYY-MM-DD h:mm:ss A")}
            >
              <i className="time">
                {timePrefix
                  ? `${timePrefix} ${dayjsTime.format("h:mm A")}`
                  : dayjsTime.format("YYYY-MM-DD h:mm:ss A")}
              </i>
            </Tooltip>
          </div>
          <div className={`down ${sending ? "sending" : ""}`}>
            {reply_mid && <Reply mid={reply_mid} />}
            {edit ? (
              <EditMessage mid={mid} cancelEdit={toggleEditMessage} />
            ) : (
              renderContent({
                context,
                to: contextId,
                from_uid: fromUid,
                created_at: time,
                content_type,
                properties,
                content,
                thumbnail,
                download,
                edited,
              })
            )}
            {reactions && <Reaction mid={mid} reactions={reactions} />}
          </div>
        </div>
        {!edit && !readOnly && (
          <Commands
            content_type={content_type}
            context={context}
            contextId={contextId}
            mid={mid}
            from_uid={fromUid}
            toggleEditMessage={toggleEditMessage}
          />
        )}
      </StyledWrapper>
    </ContextMenu>
  );
}
export default React.memo(Message, (prevs, nexts) => {
  return prevs.mid == nexts.mid;
});
