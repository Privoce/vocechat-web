import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import IconOwner from "../../../assets/icons/owner.svg";
import IconBot from "../../../assets/icons/bot.svg";
import Avatar from "../Avatar";
import Profile from "../Profile";
import ContextMenu from "./ContextMenu";
import StyledWrapper from "./styled";
import useContextMenu from "../../hook/useContextMenu";
import { useAppSelector } from "../../../app/store";
import clsx from "clsx";

interface Props {
  uid: number;
  cid?: number;
  owner?: boolean;
  dm?: boolean;
  interactive?: boolean;
  popover?: boolean;
  compact?: boolean;
  avatarSize?: number;
  enableContextMenu?: boolean;
}

const User: FC<Props> = ({
  cid,
  uid,
  owner = false,
  dm = false,
  interactive = true,
  popover = false,
  compact = false,
  avatarSize = 32,
  enableContextMenu = false
}) => {
  const navigate = useNavigate();
  const { visible: contextMenuVisible, handleContextMenuEvent, hideContextMenu } = useContextMenu();
  const { curr, loginUid } = useAppSelector((store) => {
    return { curr: store.users.byId[uid], loginUid: store.authData.user?.uid };
  });
  const handleDoubleClick = () => {
    navigate(`/chat/dm/${uid}`);
  };
  if (!curr) return null;
  const online = curr.online || curr.uid == loginUid;
  if (!popover)
    return (
      <ContextMenu
        cid={cid}
        uid={uid}
        enable={enableContextMenu}
        visible={contextMenuVisible}
        hide={hideContextMenu}
      >
        <StyledWrapper
          size={avatarSize}
          className={`${interactive ? "interactive" : ""} ${compact ? "compact" : ""} relative`}
          onDoubleClick={dm ? handleDoubleClick : undefined}
          onContextMenu={enableContextMenu ? handleContextMenuEvent : undefined}
        >
          <div className="avatar">
            <Avatar
              width={avatarSize}
              height={avatarSize}
              src={curr.avatar}
              name={curr.name}
              alt="avatar"
            />
            <div className={`status ${online ? "online" : "offline"}`}></div>
          </div>
          {!compact && (
            <span className="name" title={curr?.name}>
              {curr?.name}
            </span>
          )}
          {owner && <IconOwner />}
          {curr.is_bot && <IconBot className={clsx(compact && "absolute -top-1 -right-1", "!w-4 !h-4")} />}
        </StyledWrapper>
      </ContextMenu>
    );
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
        placement="left"
        trigger="click"
        content={<Profile uid={uid} type="card" cid={cid} />}
      >
        <StyledWrapper
          size={avatarSize}
          className={`${interactive ? "interactive" : ""} ${compact ? "compact" : ""}`}
          onDoubleClick={dm ? handleDoubleClick : undefined}
          onContextMenu={enableContextMenu ? handleContextMenuEvent : undefined}
        >
          <div className="avatar">
            <Avatar
              width={avatarSize}
              height={avatarSize}
              src={curr.avatar}
              name={curr.name}
              alt="avatar"
            />
            <div className={`status ${online ? "online" : "offline"}`}></div>
          </div>
          {!compact && (
            <span className="name" title={curr?.name}>
              {curr?.name}
            </span>
          )}
          {owner && <IconOwner />}
          {curr.is_bot && <IconBot className="!w-4 !h-4" />}
        </StyledWrapper>
      </Tippy>
    </ContextMenu>
  );
};

export default memo(User, (prev, next) => prev.uid == next.uid);
