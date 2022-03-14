import React, { useRef, useState, useEffect } from "react";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { useInViewRef } from "rooks";
import Tippy from "@tippyjs/react";
import Reaction from "./Reaction";
import Reply from "./Reply";
import Profile from "../Profile";
import Avatar from "../Avatar";
import { readMessage } from "../../../app/slices/message";
import StyledWrapper from "./styled";
import Commands from "./Commands";

import EditMessage from "./EditMessage";
import renderContent from "./renderContent";
function Message({ contextId = 0, mid = "" }) {
  const [myRef, inView] = useInViewRef();
  const [edit, setEdit] = useState(false);
  const [emojiPopVisible, setEmojiPopVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const disptach = useDispatch();
  const avatarRef = useRef(null);
  const { message = {}, reactionMessageData, contactsData } = useSelector(
    (store) => {
      return {
        reactionMessageData: store.reactionMessage,
        message: store.message[mid],
        contactsData: store.contacts.byId,
      };
    }
  );
  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };
  const toggleEditMessage = () => {
    setEdit((prev) => !prev);
  };
  const toggleEmojiPopover = () => {
    setEmojiPopVisible((prev) => !prev);
  };
  // useEffect(() => {
  //   if (!read) {
  //     avatarRef.current?.scrollIntoView();
  //   }
  // }, [read]);

  // console.log("message", mid, messageData[mid]);

  useEffect(() => {
    if (inView && !message.read) {
      disptach(readMessage(mid));
    }
  }, [mid, message, inView]);
  if (!message) return null;
  const {
    reply_mid,
    from_uid: fromUid,
    created_at: time,
    sending,
    content,
    content_type = "text/plain",
    edited,
  } = message;
  const reactions = reactionMessageData[mid];
  const currUser = contactsData[fromUid] || {};
  return (
    <StyledWrapper
      ref={myRef}
      className={`message ${menuVisible ? "menu" : ""} ${
        inView ? "in_view" : ""
      }`}
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
        {reply_mid && <Reply mid={reply_mid} />}
        <div className="up">
          <span className="name">{currUser.name}</span>
          <i className="time">{dayjs(time).format("YYYY-MM-DD h:mm:ss A")}</i>
          {reactions && <Reaction reactions={reactions} />}
        </div>
        <div className={`down ${sending ? "sending" : ""}`}>
          {edit ? (
            <EditMessage
              content={content}
              mid={mid}
              cancelEdit={toggleEditMessage}
            />
          ) : (
            renderContent(content_type, content, edited)
          )}
        </div>
      </div>
      {!edit && (
        <Commands
          contextId={contextId}
          mid={mid}
          from_uid={fromUid}
          toggleMenu={toggleMenu}
          menuVisible={menuVisible}
          emojiPopVisible={emojiPopVisible}
          toggleEmojiPopover={toggleEmojiPopover}
          toggleEditMessage={toggleEditMessage}
        />
      )}
    </StyledWrapper>
  );
}
export default React.memo(Message, (prevs, nexts) => {
  return prevs.mid == nexts.mid;
});
