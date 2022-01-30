import { useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useInViewRef } from "rooks";
import Avatar from "./Avatar";
import { useGetContactsQuery } from "../../app/services/contact";
import { setChannelMsgRead } from "../../app/slices/message.channel";
import { setUserMsgRead } from "../../app/slices/message.user";
const StyledMsg = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 12px 0;
  .avatar {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    .up {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
      .name {
        color: #06b6d4;
        font-style: normal;
        font-size: 14px;
        line-height: 20px;
      }
      .time {
        color: #bfbfbf;
        font-size: 12px;
        line-height: 18px;
      }
    }
    .down {
      color: #374151;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      word-break: break-all;
      white-space: break-spaces;
      &.pending {
        opacity: 0.5;
      }
    }
  }
`;
export default function Message({
  gid = "",
  mid = "",
  uid,
  fromUid,
  time,
  content,
  unread = false,
  pending,
}) {
  const [myRef, inView] = useInViewRef();
  const disptach = useDispatch();
  // const wrapperRef = useRef(null);
  const { data: contacts } = useGetContactsQuery();
  useEffect(() => {
    // if (wrapperRef) {
    //   wrapperRef.current.scrollIntoView();
    if (inView && unread) {
      const setMsgRead = gid ? setChannelMsgRead : setUserMsgRead;
      disptach(setMsgRead({ id: gid || uid, mid }));
    }
    // }
  }, [gid, mid, uid, unread, inView]);

  if (!contacts) return null;
  const currUser = contacts.find((c) => c.uid == fromUid) || {};
  return (
    <StyledMsg ref={myRef}>
      <div className="avatar" data-uid={uid}>
        <Avatar url={currUser.avatar} id={fromUid} name={currUser.name} />
      </div>
      <div className="details">
        <div className="up">
          <span className="name">{currUser.name}</span>
          <i className="time">{dayjs(time).format("YYYY-MM-DD h:mm:ss A")}</i>
        </div>
        <div className={`down ${pending ? "pending" : ""}`}>{content}</div>
      </div>
    </StyledMsg>
  );
}
