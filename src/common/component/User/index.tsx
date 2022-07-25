import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import IconOwner from "../../../assets/icons/owner.svg";
import Avatar from "../Avatar";
import Profile from "../Profile";
import ContextMenu from "./ContextMenu";
import StyledWrapper from "./styled";
import useContextMenu from "../../hook/useContextMenu";
import { useAppSelector } from "../../../app/store";

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
  const curr = useAppSelector((store) => store.users.byId[uid]);
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
          size={avatarSize}
          className={`${interactive ? "interactive" : ""} ${compact ? "compact" : ""}`}
          onDoubleClick={dm ? handleDoubleClick : undefined}
          onContextMenu={enableContextMenu ? handleContextMenuEvent : undefined}
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
};

export default User;
