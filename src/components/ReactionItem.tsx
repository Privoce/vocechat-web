import { FC, ReactElement } from "react";

import EmojiCelebrate from "@/assets/icons/emoji.celebrate.svg";
import EmojiHeart from "@/assets/icons/emoji.heart.svg";
import EmojiLook from "@/assets/icons/emoji.look.svg";
import EmojiRocket from "@/assets/icons/emoji.rocket.svg";
import EmojiSmile from "@/assets/icons/emoji.smile.svg";
import EmojiThumbDown from "@/assets/icons/emoji.thumb.down.svg";
import EmojiThumbUp from "@/assets/icons/emoji.thumb.up.svg";
import EmojiUnhappy from "@/assets/icons/emoji.unhappy.svg";

export interface Emojis {
  "👍": ReactElement;
  "👎": ReactElement;
  "😄": ReactElement;
  "👀": ReactElement;
  "🚀": ReactElement;
  "❤️": ReactElement;
  "🙁": ReactElement;
  "🎉": ReactElement;
}
export const ReactionMap = {
  "🎉": ":tada:",
  "👍": ":+1:",
  "🙁": ":slightly_frown_face:",
  "❤️": ":heart:",
  "👎": ":thumb_down:",
  "😄": ":smile:",
  "👀": ":eyes:",
  "🚀": ":rocket:"
};
const emojis: Emojis = {
  "👍": <EmojiThumbUp className="emoji w-full h-full min-w-[16px] min-h-[16px]" />,
  "👎": <EmojiThumbDown className="emoji w-full h-full min-w-[16px] min-h-[16px]" />,
  "😄": <EmojiSmile className="emoji w-full h-full min-w-[16px] min-h-[16px]" />,
  "👀": <EmojiLook className="emoji w-full h-full min-w-[16px] min-h-[16px]" />,
  "🚀": <EmojiRocket className="emoji w-full h-full min-w-[16px] min-h-[16px]" />,
  "❤️": <EmojiHeart className="emoji w-full h-full min-w-[16px] min-h-[16px]" />,
  "🙁": <EmojiUnhappy className="emoji w-full h-full min-w-[16px] min-h-[16px]" />,
  "🎉": <EmojiCelebrate className="emoji w-full h-full min-w-[16px] min-h-[16px]" />
};

interface Props {
  native: keyof Emojis;
}

const ReactionItem: FC<Props> = ({ native }) => {
  // if (!native) return null;
  return emojis[native] ?? null;
};

export default ReactionItem;
