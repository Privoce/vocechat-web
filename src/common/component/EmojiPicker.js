import { useRef, useEffect } from "react";
// import { NimblePicker } from "emoji-mart";
// import "emoji-mart/css/emoji-mart.css";
import data from "../../assets/emojis.native.json";
import { Picker } from "emoji-mart";
import styled from "styled-components";
const StyledWrapper = styled.div`
  filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
  border-radius: 12px;
`;
// 😀  😂  😇  😍  😝  🤔  😳  😨  😱  😡
// 👏 👌  ✊  👍  👎  🤝  🙏  💪   ❤️  💔
// 💣  💤 🐶  🐷  🌷 🥀  🍉. 🌶️    ✅  ❌
export default function EmojiPicker({ onSelect, ...rest }) {
  const ref = useRef();

  useEffect(() => {
    const picker = new Picker({
      theme: "light",
      perLine: 10,
      emojiSize: 24,
      emojiTooltip: true,
      showSkinTones: false,
      // recent: ["grining"],
      // categories: [
      //   // "frequent",
      //   "activity",
      //   "flags",
      //   "foods",
      //   "nature",
      //   "objects",
      //   "people",
      //   "places",
      //   "symbols",
      // ],
      onSelect,
      ...rest,
      data,
      ref,
    });
    console.log("picker", picker);
    return () => {
      picker.remove();
    };
  }, []);
  return (
    <StyledWrapper>
      <div ref={ref} />
    </StyledWrapper>
  );
}
