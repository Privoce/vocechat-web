// import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import ChannelIcon from "../../common/component/ChannelIcon";
const NavItem = ({ data, setFiles }) => {
  const navigate = useNavigate();
  const [{ isActive }, drop] = useDrop(() => ({
    accept: [NativeTypes.FILE],
    drop({ dataTransfer }) {
      if (dataTransfer.files.length) {
        // console.log(files, rest);
        setFiles([...dataTransfer.files]);
        navigate(`/chat/channel/${data.id}`);
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
  const { id, is_public, name, description, unreads } = data;
  return (
    <NavLink
      ref={drop}
      title={description}
      key={id}
      className={`link ${isActive ? "drop_over" : ""}`}
      to={`/chat/channel/${id}`}
    >
      <span className="txt">
        <ChannelIcon personal={!is_public} />
        {name}
      </span>
      {unreads > 0 && <i className="badge">{unreads}</i>}
    </NavLink>
  );
};
export default function ChannelList({ channels, setDropFiles }) {
  return channels.map(({ id, is_public, name, description, unreads }) => {
    return (
      <NavItem
        key={id}
        data={{ id, is_public, name, description, unreads }}
        setFiles={setDropFiles}
      />
    );
  });
}
