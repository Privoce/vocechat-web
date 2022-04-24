import { useState, useRef } from "react";
import styled from "styled-components";
import { useOutsideClick } from "rooks";
import Tooltip from "../../component/Tooltip";
const StyledBtn = styled.button`
  position: relative;
  outline: none;
  width: fit-content;
  background: none;
  display: flex;
  align-items: center;
  > svg {
    width: 22px;
    height: 22px;
  }
  > .picker {
    visibility: hidden;
    position: absolute;
    top: -20px;
    left: -20px;
    transform: translateY(-100%);
    &.visible {
      visibility: visible;
    }
  }
`;
import Picker from "../EmojiPicker";
import SmileIcon from "../../../assets/icons/emoji.smile.svg";

export default function EmojiPicker({ selectEmoji }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  const openPicker = () => {
    setVisible(true);
  };
  const handleSelect = (emoji) => {
    selectEmoji(emoji.native);
  };
  useOutsideClick(
    ref,
    () => {
      setVisible(false);
    },
    visible
  );
  return (
    <Tooltip placement="top" tip="Emojis" disabled={visible}>
      <StyledBtn>
        <div ref={ref} className={`picker ${visible ? "visible" : ""}`}>
          <Picker onSelect={handleSelect} />
        </div>
        <SmileIcon onClick={visible ? null : openPicker} />
      </StyledBtn>
    </Tooltip>
  );
}
