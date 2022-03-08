import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useInViewRef } from "rooks";
import Tippy from "@tippyjs/react";
import Profile from "../Profile";
import Avatar from "../Avatar";
import { setChannelMsgRead } from "../../../app/slices/message.channel";
import { setUserMsgRead } from "../../../app/slices/message.user";
import StyledWrapper from "./styled";
import Commands from "./Commands";
import { emojis } from "./EmojiPicker";
import EditMessage from "./EditMessage";
import renderContent from "./renderContent";
export default function Message({
  gid = "",
  mid = "",
  uid,
  fromUid,
  time,
  content,
  content_type = "text/plain",
  unread = false,
  pending,
  removed = false,
  edited = false,
  likes = {},
}) {
  const [myRef, inView] = useInViewRef();
  const [edit, setEdit] = useState(false);
  const [emojiPopVisible, setEmojiPopVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const disptach = useDispatch();
  const avatarRef = useRef(null);
  const contacts = useSelector((store) => store.contacts);
  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };
  const toggleEditMessage = () => {
    setEdit((prev) => !prev);
  };
  const toggleEmojiPopover = () => {
    setEmojiPopVisible((prev) => !prev);
  };
  useEffect(() => {
    if (!unread) {
      avatarRef.current?.scrollIntoView();
    }
  }, [unread]);

  useEffect(() => {
    if (inView) {
      if (unread) {
        const setMsgRead = gid ? setChannelMsgRead : setUserMsgRead;
        disptach(setMsgRead({ id: gid || uid, mid }));
      }
    }
  }, [gid, mid, uid, unread, inView]);

  if (!contacts) return null;
  const currUser = contacts.find((c) => c.uid == fromUid) || {};
  return removed ? (
    "removed"
  ) : (
    <StyledWrapper ref={myRef} className={`${menuVisible ? "menu" : ""}`}>
      <Tippy
        interactive
        placement="left"
        trigger="click"
        content={<Profile data={currUser} type="card" />}
      >
        <div className="avatar" data-uid={uid} ref={avatarRef}>
          <Avatar url={currUser.avatar} name={currUser.name} />
        </div>
      </Tippy>
      <div className="details">
        <div className="up">
          <span className="name">{currUser.name}</span>
          <i className="time">{dayjs(time).format("YYYY-MM-DD h:mm:ss A")}</i>
          {likes && (
            <span className="likes">
              {Object.entries(likes).map(([reaction, uids]) => {
                return uids.length > 0 ? (
                  <i
                    className="like"
                    // data-count={count > 1 ? count : ""}
                    key={reaction}
                  >
                    {emojis[reaction]}

                    {uids.length > 1 ? <em>{`+${uids.length}`} </em> : null}
                  </i>
                ) : null;
              })}
            </span>
          )}
        </div>
        <div className={`down ${pending ? "pending" : ""}`}>
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
          message={{
            name: currUser.name,
            avatar: currUser.avatar,
            time,
            content: renderContent(content_type, content),
          }}
          reactions={Object.entries(likes ?? {})
            .filter(([reaction, uids = []]) => uids.includes(currUser.uid))
            .map(([reaction]) => {
              return reaction;
            })}
          mid={mid}
          uid={fromUid}
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
