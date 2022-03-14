// import { Picker } from "emoji-mart";
// import "emoji-mart/css/emoji-mart.css";
import { useRef } from "react";
import styled from "styled-components";
import { useOutsideClick } from "rooks";
import { useSelector } from "react-redux";
import { useReactMessageMutation } from "../../../app/services/message";
const StyledPicker = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  position: absolute;
  left: -10px;
  top: 0;
  transform: translateX(-100%);
  background-color: #fff;
  padding: 5px;
  .emojis {
    display: flex;
    gap: 4px;
    &.reacting {
      opacity: 0.6;
    }
    .emoji {
      cursor: pointer;
      border-radius: 4px;
      padding: 4px;
      font-size: 30px;
      &:hover,
      &.reacted {
        background-color: #f3f4f6;
      }
    }
  }
`;
const emojis = {
  ["U+1F44D"]: "👍",
  ["U+1F44C"]: "👌",
  ["U+2764"]: "❤️",
};
export default function EmojiPicker({ mid, hidePicker }) {
  const wrapperRef = useRef(null);
  const [reactMessage, { isLoading }] = useReactMessageMutation();
  const { reactionData, currUid } = useSelector((store) => {
    return {
      reactionData: store.reactionMessage[mid],
      currUid: store.authData.uid,
    };
  });
  useOutsideClick(wrapperRef, hidePicker);
  const handleReact = (action) => {
    console.log("react", action);
    reactMessage({ mid, action });
  };
  return (
    <StyledPicker ref={wrapperRef}>
      <ul className={`emojis ${isLoading ? "reacting" : ""}`}>
        {Object.entries(emojis).map(([key, emoji]) => {
          let reacted =
            reactionData &&
            reactionData[key] &&
            reactionData[key].includes(currUid);

          return (
            <li
              className={`emoji ${reacted ? "reacted" : ""}`}
              key={key}
              onClick={handleReact.bind(null, key)}
            >
              {emoji}
            </li>
          );
        })}
      </ul>
    </StyledPicker>
  );
}
export { emojis };
