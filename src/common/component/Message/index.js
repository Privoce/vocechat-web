import React, { useRef, useState, useEffect } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useInViewRef } from "rooks";
import Tippy from "@tippyjs/react";
import Reaction from "./Reaction";
import Reply from "./Reply";
import Profile from "../Profile";
import Avatar from "../Avatar";

import StyledWrapper from "./styled";
import Commands from "./Commands";

import EditMessage from "./EditMessage";
import renderContent from "./renderContent";
function Message({
  contextId = 0,
  mid = "",
  context = "user",
  updateReadIndex,
  read = true,
}) {
  const [myRef, inView] = useInViewRef();
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
  return (
    <StyledWrapper
      data-msg-mid={mid}
      ref={myRef}
      className={`message ${inView ? "in_view" : ""}`}
    >
      <Tippy
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
          <i className="time">{dayjs(time).format("YYYY-MM-DD h:mm:ss A")}</i>
        </div>
        <div className={`down ${sending ? "sending" : ""}`}>
          {reply_mid && <Reply mid={reply_mid} />}
          {edit ? (
            <EditMessage
              content={content}
              mid={mid}
              cancelEdit={toggleEditMessage}
            />
          ) : (
            renderContent({
              from_uid: fromUid,
              created_at: time,
              content_type,
              properties,
              content,
              thumbnail,
              edited,
            })
          )}
          {reactions && <Reaction mid={mid} reactions={reactions} />}
        </div>
      </div>
      {!edit && (
        <Commands
          contextId={contextId}
          mid={mid}
          from_uid={fromUid}
          toggleEditMessage={toggleEditMessage}
        />
      )}
    </StyledWrapper>
  );
}
export default React.memo(Message, (prevs, nexts) => {
  return prevs.mid == nexts.mid;
});
