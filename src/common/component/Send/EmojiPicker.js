// import { useState } from "react";
import Tippy from "@tippyjs/react";
import styled from "styled-components";
const StyledBtn = styled.button`
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
    <Tippy
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
  );
}
