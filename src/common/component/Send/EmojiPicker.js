import { useState } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

export default function EmojiPicker({ selectEmoji }) {
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const toggleEmojiPicker = () => {
    setEmojiPickerVisible((prev) => !prev);
  };
  const handleSelect = (emoji) => {
    selectEmoji(emoji.native);
    setEmojiPickerVisible(false);
  };
  return (
    <>
      <button className="toggle" onClick={toggleEmojiPicker}>
        😄
      </button>
      {emojiPickerVisible && (
        <div className="picker">
          <Picker
            onSelect={handleSelect}
            showPreview={false}
            showSkinTones={false}
          />
        </div>
      )}
    </>
  );
}
