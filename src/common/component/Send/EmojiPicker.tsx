import { useState, useRef } from "react";
import styled from "styled-components";
import { useOutsideClick } from "rooks";
import Tooltip from "../Tooltip";
import Picker from "../EmojiPicker";
import SmileIcon from "../../../assets/icons/emoji.smile.svg";

const Styled = styled.div`
  position: relative;
  width: fit-content;
  display: flex;
  align-items: center;
  > .emoji {
    cursor: pointer;
  }
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

export default function EmojiPicker({ selectEmoji }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const togglePickerVisible = () => {
    setVisible((prev) => !prev);
  };

  const handleSelect = (emoji) => {
    console.log("semojii", emoji);
    selectEmoji(emoji.native);
  };

  useOutsideClick(
    ref,
    (evt) => {
      const clickEle = evt.target;
      const ignore =
        (clickEle.nodeName == "svg" && clickEle.dataset.emoji == "toggler") ||
        (clickEle.nodeName == "path" && clickEle.parentElement.dataset.emoji == "toggler");
      // console.log("outside click", clickEle, clickEle.parentElement, ignore);
      if (ignore) return;
      // if(clickEle)
      setVisible(false);
    },
    visible
  );

  return (
    <Tooltip placement="top" tip="Emojis" disabled={visible}>
      <Styled>
        <div ref={ref} className={`picker ${visible ? "visible" : ""}`}>
          <Picker onSelect={handleSelect} />
        </div>
        <SmileIcon data-emoji="toggler" className="emoji" onClick={togglePickerVisible} />
      </Styled>
    </Tooltip>
  );
}
