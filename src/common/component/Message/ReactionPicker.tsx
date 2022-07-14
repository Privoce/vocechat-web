import styled from "styled-components";
import { useReactMessageMutation } from "../../../app/services/message";
import { Emojis } from "../../../app/config";
import Emoji from "../ReactionItem";
import { useAppSelector } from "../../../app/store";

const StyledPicker = styled.div`
  background: none;
  z-index: 999;
  .emojis {
    padding: 4px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    background: #fff;
    filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
    border-radius: 12px;
    &.reacting {
      opacity: 0.6;
    }
    .wrapper {
      display: flex;
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

export default function ReactionPicker({ mid, hidePicker }) {
  const [reactMessage, { isLoading }] = useReactMessageMutation();
  const { reactionData, currUid } = useAppSelector((store) => {
    return {
      reactionData: store.reactionMessage[mid] || {},
      currUid: store.authData.user?.uid
    };
  });
  const handleReact = (emoji: string) => {
    console.log("react", emoji);
    reactMessage({ mid, action: emoji });
    hidePicker();
  };
  return (
    <StyledPicker>
      <ul className={`emojis ${isLoading ? "reacting" : ""}`}>
        {Emojis.map((emoji) => {
          let reacted =
            reactionData[emoji] && reactionData[emoji].findIndex((id) => id == currUid) > -1;

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
