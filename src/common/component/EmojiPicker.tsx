import { useState, useEffect, FC } from "react";
import { EmojiData } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import styled from "styled-components";

interface Props {
  onSelect: (emoji: EmojiData) => void;
}

const StyledWrapper = styled.div`
  filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
  border-radius: 12px;
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

const EmojiPicker: FC<Props> = ({ onSelect, ...rest }) => {
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
          showSkinTones={false}
          onSelect={onSelect}
          {...rest}
        />
      ) : null}
    </StyledWrapper>
  );
};

export default EmojiPicker;
