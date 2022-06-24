import { FC, ReactElement } from "react";
import EmojiThumbUp from "../../assets/icons/emoji.thumb.up.svg";
import EmojiThumbDown from "../../assets/icons/emoji.thumb.down.svg";
import EmojiSmile from "../../assets/icons/emoji.smile.svg";
import EmojiCelebrate from "../../assets/icons/emoji.celebrate.svg";
import EmojiUnhappy from "../../assets/icons/emoji.unhappy.svg";
import EmojiHeart from "../../assets/icons/emoji.heart.svg";
import EmojiRocket from "../../assets/icons/emoji.rocket.svg";
import EmojiLook from "../../assets/icons/emoji.look.svg";

interface Emojis {
  "👍": ReactElement;
  "👎": ReactElement;
  "😄": ReactElement;
  "👀": ReactElement;
  "🚀": ReactElement;
  "❤️": ReactElement;
  "🙁": ReactElement;
  "🎉": ReactElement;
}

const emojis: Emojis = {
  "👍": <EmojiThumbUp className="emoji" />,
  "👎": <EmojiThumbDown className="emoji" />,
  "😄": <EmojiSmile className="emoji" />,
  "👀": <EmojiLook className="emoji" />,
  "🚀": <EmojiRocket className="emoji" />,
  "❤️": <EmojiHeart className="emoji" />,
  "🙁": <EmojiUnhappy className="emoji" />,
  "🎉": <EmojiCelebrate className="emoji" />
};

interface Props {
  native?: keyof Emojis;
}

const ReactionItem: FC<Props> = ({ native }) => {
  if (!native) return null;
  return emojis[native] ?? null;
};

export default ReactionItem;
