import { useState } from "react";
import Tippy from "@tippyjs/react";
import styled from "styled-components";
import { useKey } from "rooks";
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
  const [visible, setVisible] = useState(false);
  useKey(
    "Escape",
    (evt) => {
      evt.preventDefault();
      toggleVisible();
    },
    {
      // eventTypes: ["keydown"],
      // target: editableRef,
      when: visible,
    }
  );
  const toggleVisible = () => {
    console.log("toggle picker");
    setVisible((prev) => !prev);
  };
  const handleSelect = (emoji) => {
    selectEmoji(emoji.native);
  };
  return (
    <Tippy
      onClickOutside={toggleVisible}
      visible={visible}
      offset={[-18, 25]}
      interactive
      placement="top-start"
      // trigger="click"
      content={<Picker onSelect={handleSelect} />}
    >
      <StyledBtn onClick={toggleVisible}>
        <SmileIcon />
      </StyledBtn>
    </Tippy>
  );
}
