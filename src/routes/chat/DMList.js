// import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import Avatar from "../../common/component/Avatar";
const NavItem = ({ data, setFiles }) => {
  const navigate = useNavigate();
  const [{ isActive }, drop] = useDrop(() => ({
    accept: [NativeTypes.FILE],
    drop({ dataTransfer }) {
      if (dataTransfer.files.length) {
        // console.log(files, rest);
        setFiles([...dataTransfer.files]);
        navigate(`/chat/dm/${data.uid}`);
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
  const { uid, user, lastMsg, unreads } = data;
  return (
    <NavLink
      ref={drop}
      key={uid}
      className={`session ${isActive ? "drop_over" : ""}`}
      to={`/chat/dm/${uid}`}
    >
      <Avatar className="avatar" url={user.avatar} id={uid} />
      <div className="details">
        <div className="up">
          <span className="name">{user.name}</span>
          <time>{dayjs(lastMsg.created_at).format("YYYY-MM-DD")}</time>
        </div>

        <div className="down">
          <div className="msg">{lastMsg.content}</div>
          {unreads > 0 && <i className="badge">{unreads}</i>}
        </div>
      </div>
    </NavLink>
  );
};
export default function DMList({ sessions, setDropFiles }) {
  return sessions.map(({ uid, user, lastMsg, unreads } = {}) => {
    if (!user) return null;
    return (
      <NavItem
        key={uid}
        data={{ uid, user, lastMsg, unreads }}
        setFiles={setDropFiles}
      />
    );
  });
}
