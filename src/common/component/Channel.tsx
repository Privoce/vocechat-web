import { FC } from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import { useAppSelector } from "../../app/store";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  user-select: none;
  &.compact {
    padding: 0;
  }
  &.interactive {
    &:hover,
    &.active {
      background: rgba(116, 127, 141, 0.1);
    }
  }
  .avatar {
    cursor: pointer;
    width: ${({ size }: { size: number }) => `${size}px`};
    height: ${({ size }: { size: number }) => `${size}px`};
    position: relative;
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
  .name {
    /* user-select: text; */
    display: flex;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #52525b;
    .txt {
      max-width: 140px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

interface Props {
  interactive?: boolean;
  id: number;
  compact?: boolean;
  avatarSize?: number;
}

const Channel: FC<Props> = ({ interactive = true, id, compact = false, avatarSize = 32 }) => {
  const { channel, totalMemberCount } = useAppSelector((store) => {
    return {
      channel: store.channels.byId[id],
      totalMemberCount: store.users.ids.length
    };
  });

  if (!channel) return null;
  const { name, members = [], is_public, avatar } = channel;
  return (
    <StyledWrapper
      size={avatarSize}
      className={`${interactive ? "interactive" : ""} ${compact ? "compact" : ""}`}
    >
      <div className="avatar">
        <Avatar type="channel" url={avatar} name={"#"} alt="avatar" />
      </div>
      {!compact && (
        <div className="name">
          <span className="txt">{name}</span> ({is_public ? totalMemberCount : members.length})
        </div>
      )}
    </StyledWrapper>
  );
};

export default Channel;
