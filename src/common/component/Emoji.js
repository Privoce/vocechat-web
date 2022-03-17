import { getEmojiDataFromNative, Emoji } from "emoji-mart";
import data from "emoji-mart/data/all.json";

export default function EmojiItem({ native = "", set = "twitter", size = 16 }) {
  if (!native) return null;

  const emojiData = getEmojiDataFromNative(native, "apple", data);
  return (
    <Emoji emoji={emojiData} set={set} skin={emojiData.skin || 1} size={size} />
  );
}
