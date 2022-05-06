import { useState, useEffect } from "react";
// import { NimblePicker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
// import data from "emoji-mart/data/";
import styled from "styled-components";
const StyledWrapper = styled.div`
  filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
  border-radius: 12px;
  /* height: 358px;
  overflow: hidden; */
  .emoji-mart {
    border: none;
    border-radius: 12px;
  }
  .emoji-mart-emoji {
    cursor: pointer;
    span {
      cursor: inherit;
    }
  }
`;
export default function EmojiPicker({ onSelect, ...rest }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const inter = setTimeout(() => {
      setVisible(true);
    }, 500);
    return () => {
      clearTimeout(inter);
    };
  }, []);

  return (
    <StyledWrapper>
      {visible ? (
        <Picker
          perLine={10}
          emojiSize={24}
          emojiTooltip={true}
          // set="twitter"
          // data={data}
          // set="twitter"
          // showPreview={false}
          showSkinTones={false}
          onSelect={onSelect}
          {...rest}
        />
      ) : null}
    </StyledWrapper>
  );
}
