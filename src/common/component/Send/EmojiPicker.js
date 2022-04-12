// import { useState } from "react";
import Tippy from "@tippyjs/react";
import styled from "styled-components";
import Tooltip from "../../component/Tooltip";
const StyledBtn = styled.button`
  outline: none;
  width: fit-content;
  background: none;
  display: flex;
  align-items: center;
  svg {
    width: 22px;
    height: 22px;
  }
`;
import Picker from "../EmojiPicker";
import SmileIcon from "../../../assets/icons/emoji.smile.svg";

export default function EmojiPicker({ selectEmoji }) {
  const handleSelect = (emoji) => {
    selectEmoji(emoji.native);
  };
  return (
    <Tooltip placement="top" tip="Emojis">
      <Tippy
        duration={0}
        delay={[0, 0]}
        offset={[-18, 25]}
        interactive
        placement="top-start"
        trigger="click"
        content={<Picker onSelect={handleSelect} />}
      >
        <StyledBtn>
          <SmileIcon />
        </StyledBtn>
      </Tippy>
    </Tooltip>
  );
}
