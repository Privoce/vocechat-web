import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import IconOwner from "../../../assets/icons/owner.svg";
import IconBot from "../../../assets/icons/bot.svg";
import Avatar from "../Avatar";
import Profile from "../Profile";
import ContextMenu from "./ContextMenu";
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
  const containerClass = clsx(`relative flex items-center justify-start gap-2 p-2 rounded-lg select-none `, interactive && "hover:bg-gray-500/10", compact && "p-0");
  const nameClass = clsx(`text-sm text-gray-500 max-w-[190px] truncate font-semibold dark:text-white`);
  const statusClass = clsx(`absolute -bottom-0.5 -right-1.5 w-3 h-3 box-content rounded-full border-[2px] border-solid border-white dark:border-gray-300`,
    online ? "bg-[#22c55e]" : "bg-[#a1a1aa]",
    compact && "w-3.5 h-3.5");
  if (!popover)
    return (
      <ContextMenu
        cid={cid}
        uid={uid}
        enable={enableContextMenu}
        visible={contextMenuVisible}
        hide={hideContextMenu}
      >
        <div
          className={containerClass}
          onDoubleClick={dm ? handleDoubleClick : undefined}
          onContextMenu={enableContextMenu ? handleContextMenuEvent : undefined}
        >
          <div className="cursor-pointer relative" style={{ width: `${avatarSize}px`, height: `${avatarSize}px` }}>
            <Avatar
              className="w-full h-full rounded-full object-cover"
              width={avatarSize}
              height={avatarSize}
              src={curr.avatar}
              name={curr.name}
              alt="avatar"
            />
            <div className={statusClass}></div>
          </div>
          {!compact && (
            <span className={nameClass} title={curr?.name}>
              {curr?.name}
            </span>
          )}
          {owner && <IconOwner />}
          {curr.is_bot && <IconBot className={clsx(compact && "absolute -top-1 -right-1", "!w-4 !h-4")} />}
        </div>
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
        <div
          className={containerClass}
          onDoubleClick={dm ? handleDoubleClick : undefined}
          onContextMenu={enableContextMenu ? handleContextMenuEvent : undefined}
        >
          <div className="cursor-pointer relative" style={{ width: `${avatarSize}px`, height: `${avatarSize}px` }}>
            <Avatar
              className="w-full h-full rounded-full object-cover"
              width={avatarSize}
              height={avatarSize}
              src={curr.avatar}
              name={curr.name}
              alt="avatar"
            />
            <div className={statusClass}></div>
          </div>
          {!compact && (
            <span className={nameClass} title={curr?.name}>
              {curr?.name}
            </span>
          )}
          {owner && <IconOwner />}
          {curr.is_bot && <IconBot className="!w-4 !h-4" />}
        </div>
      </Tippy>
    </ContextMenu>
  );
};

export default memo(User, (prev, next) => prev.uid == next.uid);
