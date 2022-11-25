import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useOutsideClick } from "rooks";
import Tooltip from "../Tooltip";
import { Picker } from 'emoji-mart';
import SmileIcon from "../../../assets/icons/emoji.smile.svg";

const Styled = styled.div`
  position: relative;
  width: fit-content;
  display: flex;
  align-items: center;
  > .emoji {
    cursor: pointer;
    user-select: none;
  }
  > svg {
    width: 22px;
    height: 22px;
  }
  > .picker {
    display: none;
    position: absolute;
    top: -20px;
    left: -20px;
    transform: translateY(-100%);
    &.visible {
      display: block;
    }
  }
`;

export default function EmojiPicker({ selectEmoji }: { selectEmoji: (e: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const togglePickerVisible = () => {
    setVisible((prev) => !prev);
  };
  useEffect(() => {
    if (ref && ref.current) {
      ref.current.innerHTML = "";
      new Picker({
        data: async () => {
          const response = await fetch(
            'https://cdn.jsdelivr.net/npm/@emoji-mart/data',
          );

          return response.json();
        },
        parent: ref.current,
        onEmojiSelect: (item) => {
          console.log("eee333", item);

          selectEmoji(item.native);
        },
        // onClickOutside: () => {
        //   setVisible(false);
        // }
      });
    }
  }, [selectEmoji]);

  useOutsideClick(
    ref,
    (evt) => {
      const clickEle = evt.target;
      const ignore =
        (clickEle.nodeName == "svg" && clickEle.dataset.emoji == "toggler") ||
        (clickEle.nodeName == "path" && clickEle.parentElement.dataset.emoji == "toggler");
      if (ignore) return;
      setVisible(false);
    },
    visible
  );

  return (
    <Tooltip placement="top" tip="Emojis" disabled={visible}>
      <Styled>
        <div ref={ref} className={`picker ${visible ? "visible" : ""}`}>
          {/* emoji picker */}
        </div>
        <SmileIcon data-emoji="toggler" className="emoji" onClick={togglePickerVisible} />
      </Styled>
    </Tooltip>
  );
}
