// import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import IconOwner from "../../../assets/icons/owner.svg";
import Avatar from "../Avatar";
import Profile from "../Profile";
import ContextMenu from "./ContextMenu";
import StyledWrapper from "./styled";
import useContextMenu from "../../hook/useContextMenu";
export default function Contact({
  cid = null,
  owner = false,
  dm = false,
  interactive = true,
  uid = "",
  popover = false,
  compact = false,
  avatarSize = 32,
  enableContextMenu = false
}) {
  const navigate = useNavigate();
  const { visible: contextMenuVisible, handleContextMenuEvent, hideContextMenu } = useContextMenu();
  const curr = useSelector((store) => store.contacts.byId[uid]);
  const handleDoubleClick = () => {
    navigate(`/chat/dm/${uid}`);
  };
  if (!curr) return null;
  return (
    <ContextMenu
      cid={cid}
      uid={uid}
      enable={enableContextMenu}
      visible={contextMenuVisible}
      hide={hideContextMenu}
    >
      <Tippy
        inertia={true}
        interactive
        disabled={!popover}
        placement="left"
        trigger="click"
        content={<Profile uid={uid} type="card" cid={cid} />}
      >
        <StyledWrapper
          onContextMenu={enableContextMenu ? handleContextMenuEvent : null}
          size={avatarSize}
          onDoubleClick={dm ? handleDoubleClick : null}
          className={`${interactive ? "interactive" : ""} ${compact ? "compact" : ""}`}
        >
          <div className="avatar">
            <Avatar url={curr.avatar} name={curr.name} alt="avatar" />
            <div className={`status ${curr.online ? "online" : "offline"}`}></div>
          </div>
          {!compact && <span className="name">{curr?.name}</span>}
          {owner && <IconOwner />}
        </StyledWrapper>
      </Tippy>
    </ContextMenu>
  );
}
