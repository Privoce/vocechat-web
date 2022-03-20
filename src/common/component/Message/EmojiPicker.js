// import Picker from "../EmojiPicker";
import { useRef } from "react";
import styled from "styled-components";
import { useOutsideClick } from "rooks";
import { useSelector } from "react-redux";
import { useReactMessageMutation } from "../../../app/services/message";
import { Emojis } from "../../../app/config";
import Emoji from "../Emoji";
const StyledPicker = styled.div`
  background-color: #fff;
  .emojis {
    padding: 4px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    background: #ffffff;
    filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
    border-radius: 12px;
    &.reacting {
      opacity: 0.6;
    }
    .wrapper {
      cursor: pointer;
      border-radius: 8px;
      padding: 4px;
      &:hover,
      &.reacted {
        background-color: #f5f6f7;
      }
      > .emoji {
        width: 16px;
        height: 16px;
      }
    }
  }
`;

export default function EmojiPicker({ mid, hidePicker }) {
  const wrapperRef = useRef(null);
  const [reactMessage, { isLoading }] = useReactMessageMutation();
  const { reactionData, currUid } = useSelector((store) => {
    return {
      reactionData: store.reactionMessage[mid] || {},
      currUid: store.authData.uid,
    };
  });
  useOutsideClick(wrapperRef, hidePicker);
  const handleReact = (emoji) => {
    console.log("react", emoji);
    reactMessage({ mid, action: emoji });
    hidePicker();
  };
  return (
    <StyledPicker ref={wrapperRef}>
      {/* <Picker
        onSelect={handleReact}
        className={`picker ${isLoading ? "reacting" : ""}`}
      /> */}
      <ul className={`emojis ${isLoading ? "reacting" : ""}`}>
        {Emojis.map((emoji) => {
          let reacted =
            reactionData[emoji] &&
            reactionData[emoji].findIndex((id) => id == currUid) > -1;

          return (
            <li
              className={`wrapper ${reacted ? "reacted" : ""}`}
              key={emoji}
              onClick={handleReact.bind(null, emoji)}
            >
              <Emoji native={emoji} />
            </li>
          );
        })}
      </ul>
    </StyledPicker>
  );
}
