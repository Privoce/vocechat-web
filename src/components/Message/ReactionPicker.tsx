import { FC } from "react";

import { Emojis } from "@/app/config";
import { useReactMessageMutation } from "@/app/services/message";
import { useAppSelector } from "@/app/store";
import Emoji from "../ReactionItem";

type Props = {
  mid: number;
  hidePicker: () => void;
};
const ReactionPicker: FC<Props> = ({ mid, hidePicker }) => {
  const [reactMessage, { isLoading }] = useReactMessageMutation();
  const { reactionData, currUid } = useAppSelector((store) => {
    return {
      reactionData: store.reactionMessage[mid] || {},
      currUid: store.authData.user?.uid
    };
  });
  const handleReact = (emoji: string) => {
    reactMessage({ mid, action: emoji });
    hidePicker();
    // scroll in to view
    const el = document.querySelector(`[data-msg-mid='${mid}']`);
    // console.log("eee", el);
    if (el) {
      el.scrollIntoViewIfNeeded(false);
    }
  };
  return (
    <div className="z-[999]">
      <ul
        className={`p-1 grid grid-cols-[repeat(4,_1fr)] gap-2 bg-white dark:bg-gray-900 drop-shadow-md rounded-xl ${
          isLoading ? "opacity-60" : ""
        }`}
      >
        {Emojis.map((emoji) => {
          let reacted =
            reactionData[emoji] && reactionData[emoji].findIndex((id) => id == currUid) > -1;
          return (
            <li
              className={`flex-center cursor-pointer rounded-lg p-4 md:hover:bg-gray-50 w-4 h-4 ${
                reacted ? "bg-gray-50" : ""
              }`}
              key={emoji}
              onClick={handleReact.bind(null, emoji)}
            >
              <Emoji native={emoji} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ReactionPicker;
