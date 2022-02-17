import { useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useInViewRef } from "rooks";
import Tippy from "@tippyjs/react";
import Profile from "../Profile";
import Avatar from "../Avatar";
import BASE_URL from "../../../app/config";
import { useGetContactsQuery } from "../../../app/services/contact";
import { setChannelMsgRead } from "../../../app/slices/message.channel";
import { setUserMsgRead } from "../../../app/slices/message.user";
import StyledWrapper from "./styled";
import Commands from "./Commands";
const renderContent = (type, content) => {
  let ctn = null;
  switch (type) {
    case "text/plain":
      ctn = content;
      break;
    case "image/jpeg":
      ctn = (
        <img
          className="img"
          src={`${BASE_URL}/resource/image?id=${encodeURIComponent(content)}`}
        />
      );
      break;

    default:
      break;
  }
  return ctn;
};
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
}) {
  const [myRef, inView] = useInViewRef();
  const disptach = useDispatch();
  const avatarRef = useRef(null);
  const { data: contacts } = useGetContactsQuery();
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
  return (
    <StyledWrapper ref={myRef}>
      <Tippy
        interactive
        placement="left"
        trigger="click"
        content={<Profile data={currUser} type="card" />}
      >
        <div className="avatar" data-uid={uid} ref={avatarRef}>
          <Avatar url={currUser.avatar} id={fromUid} name={currUser.name} />
        </div>
      </Tippy>
      <div className="details">
        <div className="up">
          <span className="name">{currUser.name}</span>
          <i className="time">{dayjs(time).format("YYYY-MM-DD h:mm:ss A")}</i>
        </div>
        <div className={`down ${pending ? "pending" : ""}`}>
          {renderContent(content_type, content)}
        </div>
      </div>
      <Commands />
    </StyledWrapper>
  );
}
