import { FC } from "react";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";
import ReactionItem, { Emojis, ReactionMap } from "../ReactionItem";
import ReactionPicker from "./ReactionPicker";
import Tooltip from "../Tooltip";
import { useReactMessageMutation } from "../../../app/services/message";
import addEmojiIcon from "../../../assets/icons/add.emoji.svg?url";
import { useAppSelector } from "../../../app/store";

const StyledWrapper = styled.span`
  position: relative;
  margin-top: 8px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  .reaction {
    cursor: pointer;
    background-color: #ecfdff;
    border-radius: 6px;
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px;
    > .emoji {
      > * {
        display: flex;
      }
    }
    &:hover {
      background-color: #cff9fe;
    }
    &.reacted {
      box-shadow: inset 0 0 0 1px #06aed4;
      background-color: #a5f0fc;
    }

    > .count {
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: #06aed4;
    }
  }
  > .add {
    visibility: hidden;
    width: 24px;
    height: 24px;
    background-color: #ecfdff;
    border-radius: 6px;
    border: none;
    background-image: url(${addEmojiIcon});
    background-size: 16px;
    background-repeat: no-repeat;
    background-position: center;
    &:hover {
      background-color: #cff9fe;
    }
  }
  &:hover > .add {
    visibility: visible;
  }
`;
const StyledDetails = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: var(--br);
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px;
  &:after {
    content: "";
    display: block;
    width: 12px;
    height: 12px;
    background-color: #fff;
    border-radius: 1px;
    position: absolute;
    bottom: -6px;
    left: calc(50% - 6px);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  }
  &.first:after {
    left: calc(50% - 16px);
  }
  .emoji {
    width: 32px;
    height: 32px;
  }
  .desc {
    display: flex;
    flex-direction: column;
    width: 140px;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #1d2939;
  }
`;

const ReactionDetails = ({
  uids = [],
  emoji,
  index
}: {
  uids: number[];
  emoji: keyof Emojis;
  index: number;
}) => {
  const usersData = useAppSelector((store) => store.users.byId);
  const names = uids.map((id) => {
    return usersData[id]?.name;
  });
  // const emojiData = getEmojiDataFromNative(emoji || "", "apple", AppleEmojiData);
  const prefixDesc =
    names.length > 3
      ? `${names.join(", ")} and ${names.length - 3} others reacted with`
      : `${names.join(", ")} reacted with`;
  return (
    <StyledDetails className={index == 0 ? "first" : ""}>
      <div className="emoji">
        <ReactionItem native={emoji} />
      </div>
      <div className="desc">
        <span>{prefixDesc}</span>
        <span>{ReactionMap[emoji]}</span>
      </div>
    </StyledDetails>
  );
};
type Props = {
  readOnly?: boolean;
  mid: number;
  reactions?: {
    [key in keyof Emojis]: number[];
  };
};
const Reaction: FC<Props> = ({ mid, reactions = null, readOnly = false }) => {
  const [reactWithEmoji] = useReactMessageMutation();
  const { currUid } = useAppSelector((store) => {
    return {
      currUid: store.authData.user?.uid
    };
  });
  const handleReact = (emoji: string) => {
    reactWithEmoji({ mid, action: emoji });
  };
  if (!reactions || Object.entries(reactions).length == 0) return null;
  return (
    <StyledWrapper className="reactions">
      {Object.entries(reactions).map(([reaction, uids], idx) => {
        const reacted = uids.findIndex((id: number) => id == currUid) > -1;
        return uids.length > 0 ? (
          <span
            onClick={readOnly ? undefined : handleReact.bind(null, reaction)}
            className={`reaction ${reacted ? "reacted" : ""}`}
            // data-count={count > 1 ? count : ""}
            key={reaction}
          >
            <Tippy
              disabled={readOnly}
              offset={[0, 20]}
              // visible={true}
              interactive
              placement="top"
              content={<ReactionDetails uids={uids} emoji={reaction as keyof Emojis} index={idx} />}
            >
              <i className="emoji">
                <ReactionItem native={reaction as keyof Emojis} />
              </i>
            </Tippy>

            {uids.length > 1 ? <em className="count">{`${uids.length}`} </em> : null}
          </span>
        ) : null;
      })}
      {!readOnly && (
        <Tooltip placement="top" tip="Add Reaction">
          <Tippy
            interactive
            placement="right-start"
            trigger="click"
            content={<ReactionPicker mid={mid} hidePicker={hideAll} />}
          >
            <button className="add"></button>
          </Tippy>
        </Tooltip>
      )}
    </StyledWrapper>
  );
};
export default Reaction;
