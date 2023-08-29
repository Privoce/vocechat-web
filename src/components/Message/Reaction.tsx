import { FC } from "react";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";

import { useReactMessageMutation } from "@/app/services/message";
import { useAppSelector } from "@/app/store";
import IconAddEmoji from "@/assets/icons/add.emoji.svg";
import ReactionItem, { Emojis, ReactionMap } from "../ReactionItem";
import Tooltip from "../Tooltip";
import ReactionPicker from "./ReactionPicker";
import { shallowEqual } from "react-redux";

const ReactionDetails = ({
  uids = [],
  emoji,
  index
}: {
  uids: number[];
  emoji: keyof Emojis;
  index: number;
}) => {
  const usersData = useAppSelector((store) => store.users.byId, shallowEqual);
  const names = uids.map((id) => {
    return usersData[id]?.name ?? "Deleted User";
  });
  // const emojiData = getEmojiDataFromNative(emoji || "", "apple", AppleEmojiData);
  const prefixDesc =
    names.length > 3
      ? `${names.join(", ")} and ${names.length - 3} others reacted with`
      : `${names.join(", ")} reacted with`;
  return (
    <div
      className={`relative bg-white rounded-lg shadow flex items-start gap-2 p-2 ${
        index == 0 ? "first" : ""
      }`}
    >
      <div className="w-8 h-8">
        <ReactionItem native={emoji} />
      </div>
      <div className="flex flex-col w-[140px] text-xs text-gray-800">
        <span>{prefixDesc}</span>
        <span>{ReactionMap[emoji]}</span>
      </div>
    </div>
  );
};
type Props = {
  readOnly?: boolean;
  mid: number;
  reactions?: {
    [key in keyof Emojis]: number[];
  };
};
const Reaction: FC<Props> = ({ mid, reactions = null, readOnly = false }) => {
  const [reactWithEmoji] = useReactMessageMutation();
  const currUid = useAppSelector((store) => store.authData.user?.uid, shallowEqual);
  const handleReact = (emoji: string) => {
    reactWithEmoji({ mid, action: emoji });
  };
  if (!reactions || Object.entries(reactions).length == 0) return null;

  return (
    <span className="group relative my-1 flex items-center gap-1 w-fit">
      {Object.entries(reactions).map(([reaction, uids], idx) => {
        const reacted = uids.findIndex((id: number) => id == currUid) > -1;
        return uids.length > 0 ? (
          <span
            onClick={readOnly ? undefined : handleReact.bind(null, reaction)}
            className={`cursor-pointer rounded-md relative flex items-center gap-1 p-1 md:hover:bg-cyan-100 ${
              reacted ? "shadow-[inset_0_0_0_1px_#06aed4] bg-cyan-200" : ""
            }`}
            key={reaction}
          >
            <Tippy
              disabled={readOnly}
              offset={[0, 20]}
              // visible={true}
              interactive
              placement="top"
              content={<ReactionDetails uids={uids} emoji={reaction as keyof Emojis} index={idx} />}
            >
              <i className="emoji w-4 h-4">
                <ReactionItem native={reaction as keyof Emojis} />
              </i>
            </Tippy>

            {uids.length > 1 ? (
              <i className="text-primary-600 text-xs not-italic">{`${uids.length}`} </i>
            ) : null}
          </span>
        ) : null;
      })}
      {!readOnly && (
        <Tooltip placement="top" tip="Add Reaction">
          <Tippy
            interactive
            placement="right-start"
            trigger="click"
            content={<ReactionPicker mid={mid} hidePicker={hideAll} />}
          >
            <button className="invisible group-hover:visible w-6 h-6 bg-cyan-100 md:hover:bg-cyan-200 rounded-md flex-center">
              <IconAddEmoji className={"w-4 h-4"} />
            </button>
          </Tippy>
        </Tooltip>
      )}
    </span>
  );
};
export default Reaction;
