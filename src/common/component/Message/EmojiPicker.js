// import { Picker } from "emoji-mart";
// import "emoji-mart/css/emoji-mart.css";
import { useRef } from "react";
import styled from "styled-components";
import { useOutsideClick } from "rooks";
import { useLikeMessageMutation } from "../../../app/services/message";
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
  thumb_up: "👍",
  ok: "👌",
  like: "❤️",
};
export default function EmojiPicker({ mid, reactions = [], hidePicker }) {
  const wrapperRef = useRef(null);
  const [reactMessage, { isLoading }] = useLikeMessageMutation();
  useOutsideClick(wrapperRef, hidePicker);
  const handleReact = (action) => {
    console.log("react", action);
    reactMessage({ mid, action });
  };
  return (
    <StyledPicker ref={wrapperRef}>
      <ul className={`emojis ${isLoading ? "reacting" : ""}`}>
        {Object.entries(emojis).map(([key, emoji]) => {
          return (
            <li
              className={`emoji ${reactions.includes(key) ? "reacted" : ""}`}
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
