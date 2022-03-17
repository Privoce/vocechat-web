import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Emoji from "../Emoji";
import EmojiPicker from "./EmojiPicker";
import { useReactMessageMutation } from "../../../app/services/message";
// import { Emojis } from "../../../app/config";
import addEmojiIcon from "../../../assets/icons/add.emoji.svg?url";
const StyledWrapper = styled.span`
  z-index: 99;
  position: relative;
  margin-top: 8px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  /* align-items: center; */
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
      border: 1px solid #06aed4;
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
  .picker {
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(105%);
  }
  &:hover > .add {
    visibility: visible;
  }
`;
export default function Reaction({ mid, reactions = null }) {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [reactWithEmoji] = useReactMessageMutation();
  const { currUid } = useSelector((store) => {
    return {
      currUid: store.authData.uid,
    };
  });
  const handleReact = (emoji) => {
    reactWithEmoji({ mid, action: emoji });
  };
  const togglePickerVisible = (wtf) => {
    console.log("clicked", wtf);
    setPickerVisible((prev) => !prev);
  };
  console.log("curr reactions", reactions);
  if (!reactions || Object.entries(reactions).length == 0) return null;
  return (
    <StyledWrapper className="reactions">
      {Object.entries(reactions).map(([reaction, uids]) => {
        const reacted = uids.findIndex((id) => id == currUid) > -1;
        return uids.length > 0 ? (
          <span
            onClick={handleReact.bind(null, reaction)}
            className={`reaction ${reacted ? "reacted" : ""}`}
            // data-count={count > 1 ? count : ""}
            key={reaction}
          >
            <i className="emoji">
              <Emoji native={reaction} />
            </i>

            {uids.length > 1 ? (
              <em className="count">{`${uids.length}`} </em>
            ) : null}
          </span>
        ) : null;
      })}
      <button onClick={togglePickerVisible} className="add"></button>
      {pickerVisible && (
        <div className="picker">
          <EmojiPicker mid={mid} hidePicker={togglePickerVisible} />
        </div>
      )}
    </StyledWrapper>
  );
}
