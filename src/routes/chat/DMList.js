// import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import { renderPreviewMessage, getUnreadCount } from "./utils";
import Contact from "../../common/component/Contact";
dayjs.extend(relativeTime);
const NavItem = ({ uid, mid, unreads, setFiles }) => {
  const { currMsg, currUser } = useSelector((store) => {
    return {
      currUser: store.contacts.byId[uid],
      currMsg: store.message[mid],
    };
  });
  const navigate = useNavigate();
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
  if (!currUser || !currMsg) return null;
  return (
    <NavLink
      ref={drop}
      key={uid}
      className={`session ${isActive ? "drop_over" : ""}`}
      to={`/chat/dm/${uid}`}
    >
      <Contact compact interactive={false} className="avatar" uid={uid} />
      <div className="details">
        <div className="up">
          <span className="name">{currUser.name}</span>
          {currMsg && <time>{dayjs(currMsg.created_at).fromNow()}</time>}
        </div>

        <div className="down">
          {renderPreviewMessage(currMsg)}
          {unreads > 0 && (
            <i className={`badge ${unreads > 99 ? "dot" : ""}`}>
              {unreads > 99 ? null : unreads}
            </i>
          )}
        </div>
      </div>
    </NavLink>
  );
};
// mids: ChannelMsgData[channel_id],
// messageData,
// readIndex: readChannels[channel_id],
// loginUid,
export default function DMList({ uids, setDropFiles }) {
  const { userMessage, messageData, readUsers, loginUid } = useSelector(
    (store) => {
      return {
        loginUid: store.authData.uid,
        readUsers: store.footprint.readUsers,
        contactData: store.contacts.byId,
        userMessage: store.userMessage.byId,
        messageData: store.message,
      };
    }
  );
  const sessions = uids.map((uid) => {
    const mids = userMessage[uid];
    const lastMid = [...mids].pop();
    const readIndex = readUsers[uid];
    const unreads = getUnreadCount({ mids, readIndex, messageData, loginUid });

    return { lastMid, unreads, uid };
  });

  return sessions.map(({ lastMid, uid, unreads }) => {
    return (
      <NavItem
        key={uid}
        uid={uid}
        mid={lastMid}
        unreads={unreads}
        setFiles={setDropFiles}
      />
    );
  });
}
